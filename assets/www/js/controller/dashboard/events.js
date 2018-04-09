HRMS_Module.controller('events', function($scope, $timeout, $mdSidenav, $ionicPopup, $state, $http, AmsConstants, AmsValues, $window, $mdDialog, $ionicViewSwitcher, StoreResponse, ConnectivityService, StoreResponse, $ionicPlatform, $ionicHistory, $interval, $ionicPopover, $rootScope) {

    $scope.birthdayOverlay = false;
    $scope.SAnniversaryOverlay = false;
    $scope.eventName = localStorage.getItem("eventTitle");
    $scope.titleForEvents = $scope.eventName;

    if ($scope.eventName == "Birthdays") {
        $scope.Event_img = 'img/icons/cake.svg';
        $scope.birthdayOverlay = true;
        $scope.SAnniversaryOverlay = false;
        $scope.events_birthdays = JSON.parse(localStorage.getItem("events_birthdays"));
    } else {
        $scope.Event_img = 'img/icons/anniversary.svg';
        $scope.birthdayOverlay = false;
        $scope.SAnniversaryOverlay = true;
        $scope.events_anniersary = JSON.parse(localStorage.getItem("events_anniversaries"));
    }

    $scope.nth = function(n) {
        return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th"
    };
    var d = new Date();
    var day = (d.getDate() < 10 ? '0' : '') + d.getDate();
    var month = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
    $scope.TodayE = month + "/" + day;
    console.log(month);
    var data_hire = [];
    $scope.LoadGraphHire = function() {
        var currentTime = new Date();
        $scope.current_year = currentTime.getFullYear();
        $scope.loader = true;
        var countArray = [];
        countArray.length = 0;
        var countMonthHiring = [];
        countMonthHiring.length = 0;
        var monthNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var monthLabel = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        data_hire.length = 0;
        setTimeout(function() {
            var hiringDetails = AmsConstants.url_dashboard + 'getHiringStats?org=' + AmsValues.HRMS_orgId + '&year=' + $scope.current_year;
            var res_Hiring = ConnectivityService.AjaxRequest(hiringDetails);
            //console.log(resHiring.hiringStats);
            if(res_Hiring.hiringStats == undefined){
            $scope.loader = false;
            $('.norecords').html('<center><h4>No records found</h4></center>');
            window.plugins.toast.showLongBottom('No records found.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
            return false;
            }
            else{
            $('.norecords').html("");
            var resHiring = res_Hiring.hiringStats;

            var j = 0;
            for (var i = 0; i < resHiring.length; j++) { //debugger;
                if (resHiring[i].month == (j + 1)) {
                    data_hire[j] = resHiring[i].count;
                    i++;
                } else {
                    data_hire[j] = 0;
                }

            }
            if (monthLabel.length == data_hire.length) {
                console.log("equal data");
            } else {
                console.log("not equal data");
                data_hire.push(0);
            }
            console.log(data_hire);
            var ctx = document.getElementById("myChart").getContext("2d");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: monthLabel,
                    datasets: [{
                        label: '',
                        data: data_hire,
                        backgroundColor: [
                            'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)'
                        ],
                        borderColor: [
                            'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)', 'rgba(21,93,148,1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            display: true,
                            gridLines: {
                                display: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Month'
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            display: true,
                            gridLines: {
                                display: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'No. of employees'
                            }
                        }]
                    }

                }
            });
            }
            //$window.screen.orientation.lock('landscape');
            //$('.preloader-background').css('display','block');
            $scope.loader = false;
        }, 200);
    };

});
