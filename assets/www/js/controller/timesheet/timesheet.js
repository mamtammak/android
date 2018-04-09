Module_timesheet.controller('timesheet_controller', function($scope,$mdBottomSheet, $timeout, $mdBottomSheet, $compile, AmsValues, AmsConstants, MenuList, StoreResponse, $mdSidenav, $ionicPopup, $state, $http, $window, $mdDialog, $ionicViewSwitcher, ConnectivityService, $rootScope) {

    $scope.isOpen = false;
    $scope.selectedMode = 'md-scale';
    $scope.selectedDirection = 'up';
    $scope.showCalendar = true;
    $scope.showEvents = false;
    $scope.showTimesheetHeader = true;
    $scope.showEventHeader = false;
    $scope.showHeader = false;
    $scope.eventList = false;


    var myCalendar;
    //$scope.hrmsLogo = 'img/HRMS_LOGO_old.png';
    $scope.OrganizationName = AmsValues.HRMS_orgName;
    if (AmsValues.HRMS_orgLogo != "") {
        $scope.OrganisationLogo = AmsConstants.url_notify_web + AmsValues.HRMS_orgLogo;
    } else {
        $scope.OrganisationLogo = "img/brand_logo.png";
    }
    if(AmsValues.HRMS_role == "ADM"){
      $scope.showFilterBar = true;
    }
    else{$scope.showFilterBar = false;}

    var JSON_Arr_Event = [];
    var addMultiple_event;
    var JSON_Arr_Mult_Event = [];
    var colorArrayEvent;
    var JSON_Arr_attd = [];
    var attendance = [];
    var arrayMonth = [];
    var result;
    //$scope.addevent = false;
    var TITLE, StoreDateForAddEvent = "";

    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    $scope.menuItem = MenuList.get();

    $scope.loggedInUserName = AmsValues.HRMS_name;
    $scope.toggleLeft = function(menuId) {
        $mdSidenav(menuId).toggle();
    };
    $scope.goToMenuItem = function(menuitem) {
        var page = StoreResponse.goToMenuItemPage(menuitem);
        $mdSidenav('leftTS').close()
            .then(function() {

                $ionicViewSwitcher.nextTransition('none');
                $state.go(page);

            });



    };

    $scope.initTS = function() {

        refreshTimeSheet();
    };
    $rootScope.$on("CallParentMethod", function() {
        refreshTimeSheet();
    });

    function refreshTimeSheet() {
        $scope.shareTS = true;
        $scope.addEventToDt = false;
        var d = new Date();
        var month = d.getMonth() + 1;

        var monthToString = monthNames[d.getMonth()];
        var year = d.getFullYear();
        var email = AmsValues.HRMS_email;
        var uid = AmsValues.HRMS__id;
        initializeTimesheet(year, monthToString,email,uid);
    };
    //var theDate = Date.now();console.log(theDate);


    function initializeTimesheet(year, monthToString, email, uid) {
        $scope.showCalendar = true;
        $scope.showEvents = false;
        $scope.showTimesheetHeader = true;
        $scope.showEventHeader = false;
        JSON_Arr_Event.length = 0;
        JSON_Arr_attd.length = 0;
        attendance.length = 0;
        result = "";
        $scope.url = AmsConstants.url_hrms_timesheets + "getTimeSheetByEmailID?email=" + email + '&year=' + year + '&month=' + monthToString + '&org=' + AmsValues.HRMS_orgId;
        $scope.url_check_present = AmsConstants.url_hrms_attendance + "getAttendanceRecordsByUser?org=" + AmsValues.HRMS_orgId + "&uid=" + uid;
        console.log($scope.url_check_present);


        var d = new Date();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();

        $scope.loader = true;
        setTimeout(function() {
            ConnectivityService.PostData($scope.url)
                .then(function(response) {
                        //$scope.showHeader = true;
                        //$('#date').html('<span id="highLightFont">'+getTheDate(theDate)+'</span>');
                        //$scope.Monthdate = getTheDate(theDate);
                        var response_timesheetV = response;
                        $window.localStorage.setItem("response_timesheetV", JSON.stringify(response_timesheetV));
                        $('.active-dates').html("");
                        if (response == "No Timesheets Found.") {
                            console.log("No Timesheets Found.");

                        }
                        //else{
                        //console.log(response_timesheetV.timesheet);//http://devsrv03-pun:1339/attendances/getAttendanceRecordsByUser?org=adnate&uid=58e4d4f76c5cb6db5d90ff88
                        $scope.loader = true;
                        setTimeout(function() {
                            ConnectivityService.PostData($scope.url_check_present)
                                .then(function(response) {
                                        var response_attd = response;
                                        $window.localStorage.setItem("response_attd", JSON.stringify(response_attd));
                                        angular.forEach(response_attd, function(value, key) {
                                            if (value.action == "In") {
                                                $scope.addeventBTN = true;
                                                if (value.timestamp) {
                                                    var timestamp = value.timestamp.split('T')[0];
                                                    attendance.push(timestamp);
                                                }

                                            } else {}
                                        });


                                        angular.forEach(response_timesheetV.timesheet, function(value, key) {

                                            var yearV = value.for_month.year;
                                            var monthV = value.for_month.month;

                                            var getMonthV = StoreResponse.getMonthFromString(monthV);
                                            var getMonth = getMonthV < 10 ? '0' + getMonthV : '' + getMonthV;

                                            var dailyTask = value.daily_tasks;

                                            angular.forEach(dailyTask, function(value_dt, key) {
                                                var taskArray = value_dt.tasks;
                                                //console.log(taskArray);


                                                angular.forEach(taskArray, function(valuet, key) {
                                                    var dateV = value_dt.date < 10 ? '0' + value_dt.date : '' + value_dt.date;
                                                    var temp = {
                                                        date: yearV + '-' + getMonth + '-' + dateV, //2017-05-08
                                                        title: valuet,
                                                        // hours : valuet.hours,
                                                        //taskID : value_dt._id
                                                    };

                                                    //name : valuet.label +'_HOURS_'+valuet.hours+'_ID_'+value_dt._id+'_name_NAME',



                                                    JSON_Arr_Event.push(temp);


                                                });

                                            });


                                        });



                                        angular.forEach(attendance, function(value, key) {
                                            //console.log(value +"-----"+ key);
                                            var attnd = {
                                                date: value, //2017-05-08
                                                title: "IN",
                                                //hours : "",
                                                // taskID :""
                                            };

                                            JSON_Arr_attd.push(attnd);
                                        });

                                        $window.localStorage.setItem("attendance", JSON.stringify(JSON_Arr_attd));
                                        $window.localStorage.setItem("timeStampJson", JSON.stringify(JSON_Arr_Event));

                                        result = JSON_Arr_Event.concat(JSON_Arr_attd);
                                       // console.log(result);
                                        //$('#full-clndr').html("");
                                        setTimeout(function() {
                                        //myCalendar.render();
                                            calendarEvent(result, email, uid);
                                            $scope.loader = false;
                                        }, 0);
                                    },
                                    function(data) {
                                        console.log(data);
                                        $scope.loader = false;
                                    });
                        }, 200);



                        $scope.loader = false;
                    },
                    function(data, status) {
                        console.log(status);
                        $scope.loader = false;
                        var status = navigator.onLine;
                        if (status) {
                            console.log("internet is there..");
                        } else {
                            $scope.norecords = true;
                            $('.active-dates').html('<center><p>Please check your internet connection.</p><p>Pull to refresh.</p></center>');

                        }


                    });
        }, 200);


    };

    $scope.close = function() {
        $scope.shareTS = true;
        $scope.addEventToDt = false;
        $scope.showCalendar = true;
        $scope.showEvents = false;
        $scope.showTimesheetHeader = true;
        $scope.showEventHeader = false;
    };

    function calendarEvent(eventsR, email, uid) {

         myCalendar = $('#full-clndr').clndr({
            template: $('#full-clndr-template').html(),
            events: eventsR,
            clickEvents: {
                click: function(target) {
                //console.log(target);
                    if(target.events.length == 0){
                    console.log("No events recorded.");
                    return false;
                    }
                    else{
                    $state.go('timesheetEvents',{data1:JSON.stringify(target.events)});
                    }


                },
                onMonthChange: function(month) {
                    //console.log(month);
                    var monthToString = month.format('MMMM');
                    var year = month.format('YYYY');
                    //$scope.shareTS = true;
                   // $scope.addEventToDt = false;
                    $scope.showCalendar = true;
                    $scope.showEvents = false;
                    $scope.showTimesheetHeader = true;
                    $scope.showEventHeader = false;
                    var JSON_Arr_Event1 = [] ,JSON_Arr_attd1 = [] ,attendance1 = [];
                    JSON_Arr_Event1.length = 0;
                    JSON_Arr_attd1.length = 0;
                    attendance1.length = 0;
                    var result1 = "";
                    $scope.url = AmsConstants.url_hrms_timesheets + "getTimeSheetByEmailID?email=" + email + '&year=' + year + '&month=' + monthToString + '&org=' + AmsValues.HRMS_orgId;
                    $scope.url_check_present = AmsConstants.url_hrms_attendance + "getAttendanceRecordsByUser?org=" + AmsValues.HRMS_orgId + "&uid=" + uid;
                    //console.log($scope.url_check_present);


                    var d = new Date();
                    var month = d.getMonth() + 1;
                    var year = d.getFullYear();

                    $scope.loader = true;
                    setTimeout(function() {
                        ConnectivityService.PostData($scope.url)
                            .then(function(response) {
                                    //$scope.showHeader = true;
                                    //$('#date').html('<span id="highLightFont">'+getTheDate(theDate)+'</span>');
                                    //$scope.Monthdate = getTheDate(theDate);
                                    var response_timesheetV = response;
                                    $window.localStorage.setItem("response_timesheetV", JSON.stringify(response_timesheetV));
                                    $('.active-dates').html("");
                                    if (response == "No Timesheets Found.") {
                                        console.log("No Timesheets Found.");

                                    }
                                    //else{
                                    //console.log(response_timesheetV.timesheet);//http://devsrv03-pun:1339/attendances/getAttendanceRecordsByUser?org=adnate&uid=58e4d4f76c5cb6db5d90ff88
                                    $scope.loader = true;
                                    setTimeout(function() {
                                        ConnectivityService.PostData($scope.url_check_present)
                                            .then(function(response) {
                                                    var response_attd = response;
                                                    $window.localStorage.setItem("response_attd", JSON.stringify(response_attd));
                                                    angular.forEach(response_attd, function(value, key) {
                                                        if (value.action == "In") {
                                                            $scope.addeventBTN = true;
                                                            if (value.timestamp) {
                                                                var timestamp = value.timestamp.split('T')[0];
                                                                attendance1.push(timestamp);
                                                            }

                                                        } else {}
                                                    });


                                                    angular.forEach(response_timesheetV.timesheet, function(value, key) {

                                                        var yearV = value.for_month.year;
                                                        var monthV = value.for_month.month;

                                                        var getMonthV = StoreResponse.getMonthFromString(monthV);
                                                        var getMonth = getMonthV < 10 ? '0' + getMonthV : '' + getMonthV;

                                                        var dailyTask = value.daily_tasks;

                                                        angular.forEach(dailyTask, function(value_dt, key) {
                                                            var taskArray = value_dt.tasks;
                                                            //console.log(taskArray);


                                                            angular.forEach(taskArray, function(valuet, key) {
                                                                var dateV = value_dt.date < 10 ? '0' + value_dt.date : '' + value_dt.date;
                                                                var temp = {
                                                                    date: yearV + '-' + getMonth + '-' + dateV, //2017-05-08
                                                                    title: valuet,
                                                                    // hours : valuet.hours,
                                                                    //taskID : value_dt._id
                                                                };

                                                                //name : valuet.label +'_HOURS_'+valuet.hours+'_ID_'+value_dt._id+'_name_NAME',



                                                                JSON_Arr_Event1.push(temp);


                                                            });

                                                        });


                                                    });



                                                    angular.forEach(attendance1, function(value, key) {
                                                        //console.log(value +"-----"+ key);
                                                        var attnd = {
                                                            date: value, //2017-05-08
                                                            title: "IN",
                                                            //hours : "",
                                                            // taskID :""
                                                        };

                                                        JSON_Arr_attd1.push(attnd);
                                                    });

                                                    $window.localStorage.setItem("attendance", JSON.stringify(JSON_Arr_attd1));
                                                    $window.localStorage.setItem("timeStampJson", JSON.stringify(JSON_Arr_Event1));

                                                    result1 = JSON_Arr_Event1.concat(JSON_Arr_attd1);
                                                    //console.log(result1);
                                                    //$('#full-clndr').html("");
                                                    setTimeout(function() {
                                                       // calendarEvent(result,email,uid);
                                                       myCalendar.addEvents(result1);
                                                        $scope.loader = false;
                                                    }, 0);
                                                },
                                                function(data) {
                                                    console.log(data);
                                                    $scope.loader = false;
                                                });
                                    }, 200);



                                    $scope.loader = false;
                                },
                                function(data, status) {
                                    console.log(status);
                                    $scope.loader = false;
                                    var status = navigator.onLine;
                                    if (status) {
                                        console.log("internet is there..");
                                    } else {
                                        $scope.norecords = true;
                                        $('.active-dates').html('<center><p>Please check your internet connection.</p><p>Pull to refresh.</p></center>');

                                    }


                                });
                    }, 200);
                } //end on month change
            },
            doneRendering: function() {
                console.log('this would be a fine place to attach custom event handlers.');
            }
        });
    }


    $scope.ShareTimeSheet = function() {
        $mdBottomSheet.show({
            templateUrl: 'templates/timesheet/shareTimesheet.html',
            controller: 'shareTimesheet_controller'
        }).then(function(clickedItem) {
            //$scope.alert = clickedItem['name'] + ' clicked!';
            // alert("good");
        }).catch(function(error) {
            // User clicked outside or hit escape
        });
    };





    function getDaysInMonth(month, year) {
        //alert(month + year);
        // Since no month has fewer than 28 days
        var date = new Date(year, month, 1);
        var days = [];
        // console.log('month', month, 'date.getMonth()', date.getMonth())
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }



    function listview(month) {

        var monthvalue;

        //var monthString = 'May';
        var dat = new Date('1 ' + month + ' 1999');
        monthvalue = (dat.getMonth() + 1);
        return monthvalue;
    }




    function getTheDate(getDate) {
        var days = ["Sunday", "Monday", "Tuesday",
            "Wednesday", "Thursday", "Friday", "Saturday"
        ];
        var months = ["January", "February", "March",
            "April", "May", "June", "July", "August",
            "September", "October", "November", "December"
        ];
        var theCDate = new Date(getDate);
        return months[theCDate.getMonth()] + '-' + theCDate.getFullYear();
    }



$rootScope.$on("CallParentTimesheet", function() {
        //refreshTimeSheet();
        getTimesheet();
    });

    $rootScope.$on("CallParentTimesheetAddEvent", function(event, data) {
      //refreshTimeSheet();
      console.log(data.para1);
    });

    function getTimesheet(){
    $scope.shareTS = true;
            $scope.addEventToDt = false;
            var d = new Date();
            var month = d.getMonth() + 1;

            var monthToString = monthNames[d.getMonth()];
            var year = d.getFullYear();
            var email = AmsValues.HRMS_email;
            var uid = AmsValues.HRMS__id;
            $scope.showCalendar = true;
                        $scope.showEvents = false;
                        $scope.showTimesheetHeader = true;
                        $scope.showEventHeader = false;
                        var JSON_Arr_Event1 = [] ,JSON_Arr_attd1 = [] ,attendance1 = [];
                        JSON_Arr_Event1.length = 0;
                        JSON_Arr_attd1.length = 0;
                        attendance1.length = 0;
                        var result1 = "";
                        $scope.url = AmsConstants.url_hrms_timesheets + "getTimeSheetByEmailID?email=" + email + '&year=' + year + '&month=' + monthToString + '&org=' + AmsValues.HRMS_orgId;
                        $scope.url_check_present = AmsConstants.url_hrms_attendance + "getAttendanceRecordsByUser?org=" + AmsValues.HRMS_orgId + "&uid=" + uid;
                        console.log($scope.url_check_present);


                        var d = new Date();
                        var month = d.getMonth() + 1;
                        var year = d.getFullYear();

                        $scope.loader = true;
                        setTimeout(function() {
                            ConnectivityService.PostData($scope.url)
                                .then(function(response) {
                                        //$scope.showHeader = true;
                                        //$('#date').html('<span id="highLightFont">'+getTheDate(theDate)+'</span>');
                                        //$scope.Monthdate = getTheDate(theDate);
                                        var response_timesheetV = response;
                                        $window.localStorage.setItem("response_timesheetV", JSON.stringify(response_timesheetV));
                                        $('.active-dates').html("");
                                        if (response == "No Timesheets Found.") {
                                            console.log("No Timesheets Found.");

                                        }
                                        //else{
                                        //console.log(response_timesheetV.timesheet);//http://devsrv03-pun:1339/attendances/getAttendanceRecordsByUser?org=adnate&uid=58e4d4f76c5cb6db5d90ff88
                                        $scope.loader = true;
                                        setTimeout(function() {
                                            ConnectivityService.PostData($scope.url_check_present)
                                                .then(function(response) {
                                                        var response_attd = response;
                                                        $window.localStorage.setItem("response_attd", JSON.stringify(response_attd));
                                                        angular.forEach(response_attd, function(value, key) {
                                                            if (value.action == "In") {
                                                                $scope.addeventBTN = true;
                                                                if (value.timestamp) {
                                                                    var timestamp = value.timestamp.split('T')[0];
                                                                    attendance1.push(timestamp);
                                                                }

                                                            } else {}
                                                        });


                                                        angular.forEach(response_timesheetV.timesheet, function(value, key) {

                                                            var yearV = value.for_month.year;
                                                            var monthV = value.for_month.month;

                                                            var getMonthV = StoreResponse.getMonthFromString(monthV);
                                                            var getMonth = getMonthV < 10 ? '0' + getMonthV : '' + getMonthV;

                                                            var dailyTask = value.daily_tasks;

                                                            angular.forEach(dailyTask, function(value_dt, key) {
                                                                var taskArray = value_dt.tasks;
                                                                //console.log(taskArray);


                                                                angular.forEach(taskArray, function(valuet, key) {
                                                                    var dateV = value_dt.date < 10 ? '0' + value_dt.date : '' + value_dt.date;
                                                                    var temp = {
                                                                        date: yearV + '-' + getMonth + '-' + dateV, //2017-05-08
                                                                        title: valuet,
                                                                        // hours : valuet.hours,
                                                                        //taskID : value_dt._id
                                                                    };

                                                                    //name : valuet.label +'_HOURS_'+valuet.hours+'_ID_'+value_dt._id+'_name_NAME',



                                                                    JSON_Arr_Event1.push(temp);


                                                                });

                                                            });


                                                        });



                                                        angular.forEach(attendance1, function(value, key) {
                                                            //console.log(value +"-----"+ key);
                                                            var attnd = {
                                                                date: value, //2017-05-08
                                                                title: "IN",
                                                                //hours : "",
                                                                // taskID :""
                                                            };

                                                            JSON_Arr_attd1.push(attnd);
                                                        });

                                                        $window.localStorage.setItem("attendance", JSON.stringify(JSON_Arr_attd1));
                                                        $window.localStorage.setItem("timeStampJson", JSON.stringify(JSON_Arr_Event1));

                                                        result1 = JSON_Arr_Event1.concat(JSON_Arr_attd1);
                                                        //console.log(result1);
                                                        //$('#full-clndr').html("");
                                                        setTimeout(function() {
                                                           // calendarEvent(result,email,uid);
                                                           myCalendar.addEvents(result1);
                                                            $scope.loader = false;
                                                        }, 0);
                                                    },
                                                    function(data) {
                                                        console.log(data);
                                                        $scope.loader = false;
                                                    });
                                        }, 200);



                                        $scope.loader = false;
                                    },
                                    function(data, status) {
                                        console.log(status);
                                        $scope.loader = false;
                                        var status = navigator.onLine;
                                        if (status) {
                                            console.log("internet is there..");
                                        } else {
                                            $scope.norecords = true;
                                            $('.active-dates').html('<center><p>Please check your internet connection.</p><p>Pull to refresh.</p></center>');

                                        }


                                    });
                        }, 200);
    }


    $scope.showSearch = function() {

        $mdBottomSheet.show({
                    templateUrl: 'templates/timesheet/bottomFilter.html',
                    controller: 'timesheetEmpFilter'
                }).then(function(clickedItem) {
                    //$scope.alert = clickedItem['name'] + ' clicked!';
                    // alert("good");
                }).catch(function(error) {
                    // User clicked outside or hit escape
                });

    };

    $scope.closeFilterBySearch = function() {
        $('.dimRate').css('display', 'none');
    }

    $scope.NoAction = function(e) {
            e.preventDefault();
    };


    $scope.doRefresh = function() {

        console.log('Refreshing!');
        $timeout(function() {
            //simulate async response
            $scope.loader = false;
            $state.go($state.current, {}, {reload: true});
            refreshTimeSheet();
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        }, 100);

    };




});
