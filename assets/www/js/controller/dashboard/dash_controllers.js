HRMS_Module.controller('menu_dashboard', function($scope, $cordovaFile, LeaveSetting,MenuList, $timeout, $ionicHistory, DetailValues,$mdSidenav, $ionicPopup, $state, $http, AmsConstants, AmsValues, $window, $mdDialog, $ionicViewSwitcher, StoreResponse, ConnectivityService, StoreResponse, $ionicPlatform, $rootScope, $interval,$location,$sce) {

    $scope.no_birthdays = false;
    $scope.no_aniversary = false;
    $scope.taskAssignTo = true;
    $scope.Action = "Assigned to";
    $scope.taskCreatedBy = false;
    $scope.ShowADM_HR = false;
    $scope.notifyBadge = [];
    var updateNotifArray = [];
    $scope.myface = '//:0';
    var currentTime = new Date();
    $scope.current_year = currentTime.getFullYear();

    $scope.birthdayIcon = 'img/birthday.png';
    $scope.ServiceAnniversaryIcon = 'img/anniersary.png';
    $scope.ToDoListIcon = 'img/to_do_list.png';
    $scope.today = new Date();
    var anniversaries = [];
    var birthdays = [];
    $scope.data = {
        cb1: true,
        cb4: true,
    };


    $scope.toggleLeft = function(menuId) {
        $mdSidenav(menuId).toggle();
    };
    var page;
    $scope.goToMenuItem = function(menuitem) {
        page = StoreResponse.goToMenuItemPage(menuitem);
        $mdSidenav('leftD').close()
            .then(function() {
                $ionicViewSwitcher.nextTransition('none');
                $state.go(page);
            });

    };
    $scope.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
    $scope.supervisor = [];
    $scope.supervisor.length;
    var UserStats = [];
    UserStats.length = 0;
    var date = new Date();
    $scope.init = function() {
        $(".assigned").css("color", "#3f51b5");
        $(".created").css("color", "#000");
        $scope.menuItem = MenuList.get();

        if(localStorage.getItem('Expiry_Date') != undefined){
            var tmpEXP = localStorage.getItem('Expiry_Date');
            var today = moment(new Date()).format("YYYY-MM-DD");
            var expiryDate = moment(tmpEXP).format("YYYY-MM-DD");
            if(today == expiryDate){
                var alertPopup = $ionicPopup.alert({
                title: '',
                template: "Your Plan is expired , please renew the same."
                });
                alertPopup.then(function(res) {
                localStorage.clear();
                  $state.go('login');
                });
                return;
           }
           else{

           refreshDashboard();
           }
        }
        else{
        refreshDashboard();
        }

    };




    var today = new Date();
    var Today_mm = today.getMonth();
    var Today_yy = today.getFullYear();
    var Today_dd = today.getDate();

    $scope.onChange = function(cbState) {
            $scope.url = AmsConstants.url_hrms_attendance +'checkInOut/'+AmsValues.HRMS__id+'/'+AmsValues.HRMS_orgId ;
            $window.localStorage.setItem("checkState", cbState);

        var envelope = {
                        "chnl":"Mobile"
                    };
                    $scope.loader = true;
                    setTimeout(function() {
                        ConnectivityService.PostData_post($scope.url, envelope)
                          .then(function(response) {
                            if(response.actionExpected == 'In'){
                            $scope.message = "Out";
                            }
                            else{
                            $scope.message = "In";
                            }
                            $scope.loader = false;
                          },
                          function(data) {
                             console.log(data);
                             $scope.loader = false;
                          });
                    }, 200);

        };


    $scope.showGraph = function() {
        setTimeout(function() {
            $mdDialog.show({
                    controller: "events",
                    templateUrl: 'templates/graph.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {}, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
        }, 0);

    };

    var dayWH = [];
    var totalWH = [];
    $scope.getWorkingHours = function() {
        dayWH.length = 0;
        totalWH.length = 0;
        var urlWH = AmsConstants.url_hrms_attendance + "employeeAttendance";
        var envelopeWH = {
            "email": AmsValues.HRMS_email,
            "month": Today_mm + 1,
            "year": Today_yy,
            "userid":AmsValues.HRMS__id
        };
        $scope.loader = true;
        setTimeout(function() {
            ConnectivityService.PostData_post(urlWH, envelopeWH)
                .then(function(response) {
                        //console.log(response);
                        if (response.length == 0) {
                            console.log("no data");
                            $scope.loader = false;
                        } else {
                            angular.forEach(response, function(value, key) {
                                var T_WHR = (value.totalhour).split(':').join('.');
                                dayWH.push(value.day);
                                totalWH.push(parseFloat(T_WHR));
                            });

                            showWorkingHrGraph();
                        }
                        $scope.loader = false;

                    },
                    function(data) {
                        console.log(data);
                        $scope.loader = false;
                    });
        }, 200);
    };

    function showWorkingHrGraph() {
        var set_label = today.toString().split(' ')[1] + " " + Today_yy;
        var ctx = document.getElementById('myChartWorkingHour').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dayWH,
                datasets: [{
                    label: set_label,
                    data: totalWH,
                    borderColor: "rgba(21,93,148,1)",
                    pointRadius: 6
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
                        display: true,
                        gridLines: {
                            display: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Hours'
                        }
                    }]
                }
            }

        });


    }
    $scope.cancelPopOver = function() {
        $('.preloader-background').css('display', 'none');
        $window.screen.orientation.lock('portrait');
    };



    var onSuccess = function(position) {
        $scope.CurLat = position.coords.latitude;
        $scope.CurLong = position.coords.longitude;

        if (JSON.parse(localStorage.getItem("BranchesLatLong"))) {
            $.each(JSON.parse(localStorage.getItem("BranchesLatLong")), function(key, value) {

                if (value.geofencing != undefined) {
                    $scope.SetLat = value.geofencing.lattitude;
                    $scope.SetLong = value.geofencing.longitude;
                    $scope.SetRadius = value.geofencing.radius;
                    var p1 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //current position
                    var p2 = new google.maps.LatLng(value.geofencing.lattitude, value.geofencing.longitude); //set position
                    var dist = (calcDistance(p1, p2)); //console.log(dist);
                    if (dist < $scope.SetRadius) {
                        $scope.showInOfficePremise = true;
                        return false;
                    } else {
                        $scope.showInOfficePremise = false;
                    }
                }
            });
        } else {
            console.log("waiting");
        }
    };

    function onError(error) {
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }

    $scope.refreshFunction = function() {
        refreshDashboard();
    };
    $scope.doRefresh = function() {

        console.log('Refreshing!');
        $timeout(function() {
            //simulate async response
            $scope.loader = false;
            refreshDashboard();

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        }, 100);

    };

    function calcDistance(p1, p2) {
        return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
    }

    function refreshDashboard() {
    //alert("ng-init");
        var responseTOKEN = JSON.parse(localStorage.getItem("response_token"));

        var pFactory_token = (responseTOKEN.token).split(".");
        //console.log(pFactory_token);
        AmsValues.HRMS_Token = pFactory_token[1];
        var decode_token = window.atob(pFactory_token[1]);
        var parse_decode_token = JSON.parse(decode_token);
        console.log(decode_token);
        console.log(parse_decode_token);
        AmsValues.HRMS_email = parse_decode_token.email;
        $scope.UserEmail = parse_decode_token.email;
        AmsValues.HRMS_name = parse_decode_token.name;
        AmsValues.HRMS_orgName = parse_decode_token._orgName;
        AmsValues.HRMS_orgId = parse_decode_token._orgId;
        $scope.UserOrgs = parse_decode_token._orgId;
        AmsValues.HRMS_imft = parse_decode_token._imft;
        AmsValues.HRMS_role = parse_decode_token._r;
        AmsValues.HRMS_Exp_DT = parse_decode_token.exp;
        AmsValues.HRMS_iat = parse_decode_token.iat;
        AmsValues.HRMS__id = parse_decode_token._id;
        AmsValues.HRMS__a = parse_decode_token._a._id;
        AmsValues.HRMS_expiryDt = parse_decode_token._expireAt;
        localStorage.setItem('Expiry_Date',parse_decode_token._expireAt);
        AmsValues.HRMS_Branch_id = parse_decode_token._b;
        if (parse_decode_token._orgLogo != undefined) {
            AmsValues.HRMS_orgLogo = parse_decode_token._orgLogo.split('\\')[3];
        } else {
            AmsValues.HRMS_orgLogo = "";
        }


        if (parse_decode_token._r == "HR" || parse_decode_token._r == "ADM") {
            $scope.ShowADM_HR = true;
        } else {
            $scope.ShowADM_HR = false;
        }
        $scope.OrganizationName = AmsValues.HRMS_orgName;
        if (parse_decode_token._orgLogo != undefined) {
            $scope.OrganisationLogo = AmsConstants.url_notify_web + AmsValues.HRMS_orgLogo;
        } else {
            $scope.OrganisationLogo = "img/brand_logo.png";
        }

        localStorage.setItem('USER_ID', parse_decode_token._id);
        $scope.loggedInUserName = AmsValues.HRMS_name;
        //console.log($scope.loggedInUserName);
        var url_supervisors = AmsConstants.url_hrms + 'getSupervisors?org=' + AmsValues.HRMS_orgId;
        var url_emp_profile = AmsConstants.url_hrms + "getProfile/" + AmsValues.HRMS_email;
        var empdetails = AmsConstants.url_dashboard + 'getOrganizationStats?org=' + AmsValues.HRMS_orgId;
        $scope.eventDetails = AmsConstants.url_dashboard + 'getEventsStats?org=' + AmsValues.HRMS_orgId;
        $scope.urlOrgDetails = AmsConstants.url_organization + 'getOrganizationDetails?_id=' + AmsValues.HRMS_orgId;
        var taskDetails = AmsConstants.url_dashboard + 'getTasksStats?org=' + AmsValues.HRMS_orgId + '&_id=' + AmsValues.HRMS__id;
        var courseDetails = AmsConstants.url_dashboard + 'getCourseStats?o=' + AmsValues.HRMS_orgId + '&i=' + AmsValues.HRMS__id;
        var LeaveDetails = AmsConstants.url_dashboard + 'getLeavesStats?_id=' + AmsValues.HRMS__id;
        //var checkTimeOutPolicy = AmsConstants.url_hrms_attendance + 'getAttPolicy?user=' + AmsValues.HRMS__id;
        var url_Check_INOUT_BTN = AmsConstants.url_hrms_attendance + 'nextActionInOut?id='+AmsValues.HRMS__id+'&chnl=Mobile';
        var courseD = [];
        courseD.length = 0;
        $scope.loader = true;
        setTimeout(function() {
            //$scope.$apply(function(){

            var envelope_attendance = {
                "userid": AmsValues.HRMS__id,
                "email": AmsValues.HRMS_email
            };

            ConnectivityService.PostData(url_Check_INOUT_BTN)
               .then(function(response) {
               if(response.allowedFromThisChannel == true){
              // $scope.showInOfficePremise = true;
               $scope.disablemodel = false;
               $scope.TODAY_attendance = response;
               $scope.data.cb6 = response.isCheckIn;
               $scope.message = response.actionExpected;
               }
               else{
              // $scope.showInOfficePremise = false;
               $scope.disablemodel = true;
               //$scope.data.cb6 = response.isCheckIn;
               $scope.data.cb6 = false;
               $scope.message = response.actionExpected;
               }

               $scope.loader = false;
            },
            function(data) {
              $scope.loader = false;
            });



        var response_OrgDetails = ConnectivityService.AjaxRequest($scope.urlOrgDetails);
                                    if (response_OrgDetails != null && response_OrgDetails != "undefined") {
                                        //console.log(response_OrgDetails);
                                        $scope.branches = response_OrgDetails[0].branches;
                                        localStorage.setItem("BranchesLatLong", JSON.stringify($scope.branches));
                                        LeaveSetting.Hr_engagement = response_OrgDetails[0].leaves_setting.Hr_engagement;
                                        LeaveSetting.backdated_leave = response_OrgDetails[0].leaves_setting.backdated_leave;
                                        LeaveSetting.compoff_factor_holiday = response_OrgDetails[0].compoff_factor_holiday;
                                        LeaveSetting.compoff_factor_weekend = response_OrgDetails[0].compoff_factor_weekend;
                                        LeaveSetting.sandwich_rule = response_OrgDetails[0].leaves_setting.sandwich_rule;
                                        LeaveSetting.leaves_config = response_OrgDetails[0].leaves_config;

                                    }

        //})
        $scope.getPicURL = AmsConstants.url_hrms +"getProfile/"+AmsValues.HRMS_email;
                                    var response_getProfile = ConnectivityService.AjaxRequest($scope.getPicURL);
                                    if(response_getProfile != null && response_getProfile != "undefined"){
                                      $scope.emp_p = response_getProfile;console.log($scope.emp_p);
                                      angular.forEach($scope.emp_p, function(value, key){
                                      if(value.account_balance != undefined){
                                      DetailValues.account_balance = value.account_balance;
                                      }
                                      else{
                                      DetailValues.account_balance = "";
                                      }

                                      if(value.branch.country != undefined){
                                      AmsValues.HRMS_Country = value.branch.country
                                      }
                                      else{AmsValues.HRMS_Country = "";}

                                      if(value.profile_pic == undefined || value.profile_pic == ""){
                                            $scope.myface =  'img/ic_face_Profile.png';
                                      }
                                      else{
                                            AmsValues.HRMS_ProfilePic_thumbnail = value.profile_pic.original;
                                            AmsValues.HRMS_ProfilePic_original = value.profile_pic.original;
                                            $scope.myface =  AmsConstants.url_onBoard+value.profile_pic.original;
                                      }
                                      })
                                      }
        }, 100);
        setTimeout(function(){
                          	//$scope.$apply(function(){
                                var pushnotify = AmsConstants.url_pushnotify;
                                            var tokenValue = localStorage.getItem("PushToken");
                                            var req = {
                                                "token": tokenValue,
                                                "email": AmsValues.HRMS_email,
                                                "org": AmsValues.HRMS_orgId,
                                                "device": "AND"
                                            };

                                              ConnectivityService.PostData_post(pushnotify, req)
                                                    .then(function(response) {
                                                            //console.log(response);

                                                        },
                                                        function(data) {
                                                            $scope.loader = false;

                                                        });

                                            var socket = io.connect('https://www.procfactory.com/notif');
                                            socket.on('connect',function(){
                                              //alert("connect..");
                                            socket.on(AmsValues.HRMS_orgId + '/' + AmsValues.HRMS__a + '/' + AmsValues.HRMS__id, function(data) {
                                                 // alert("data");
                                                  //console.log(data);
                                            });


                                            });
                                            $interval(function() {
                                            navigator.geolocation.getCurrentPosition(onSuccess, onError, {
                                                                    enableHighAccuracy: true
                                            });

                                            $scope.notifyBadge.length = 0;
                                            var url_notifyWeb = AmsConstants.url_notify_web + "notifs/notifications/" + AmsValues.HRMS_orgId + "/" + AmsValues.HRMS__a + "/" + AmsValues.HRMS__id;
                                            //$scope.loader = true;
                                            var notify_valueR = ConnectivityService.AjaxRequest(url_notifyWeb);
                                            if (notify_valueR != undefined && notify_valueR != null) {
                                               $scope.notify_value = notify_valueR;
                                                $.each($scope.notify_value,function(k,v){
                                                    if(v.seen == false){$scope.notifyBadge.push(v.seen);}
                                                    });
                                                    $scope.countNotify = $scope.notifyBadge.length;
                                                    //alert($scope.countNotify);
                                            }
                                            }, 5000);

                                            var response_empdetails = ConnectivityService.AjaxRequest(empdetails);
                                            //console.log(response_empdetails);

                                            if (response_empdetails != null && response_empdetails != "undefined") {
                                                var EmployeeDetails = response_empdetails;
                                                angular.forEach(EmployeeDetails, function(valueE, keyE) {

                                                    $scope.totalEmp = valueE.total_employees;
                                                    $scope.newJoinee = valueE.new_joinees;

                                                });
                                            }
                                            var response_taskDetails = ConnectivityService.AjaxRequest(taskDetails);
                                            if (response_taskDetails != null && response_taskDetails != "undefined") {
                                                var TaskDetails = response_taskDetails;
                                                angular.forEach(TaskDetails, function(valueT, keyT) {

                                                    angular.forEach(valueT.tasksAssigned, function(valueTA, keyTA) {
                                                        $scope.pendingTA = valueTA.pending;
                                                        $scope.overdueTA = valueTA.overdue;
                                                        $scope.ongoingTaskTA = valueTA.ongoing;

                                                    });
                                                    angular.forEach(valueT.tasksCreated, function(valueCB, keyCB) {
                                                        $scope.pendingCB = valueCB.pending;
                                                        $scope.overdueCB = valueCB.overdue;
                                                        $scope.ongoingTaskCB = valueCB.ongoing;

                                                    });



                                                });
                                            }
                                            var response_courseDetails = ConnectivityService.AjaxRequest(courseDetails);
                                            //console.log(response_courseDetails);
                                            if (response_courseDetails != null && response_courseDetails != "undefined") {
                                                $scope.completedCourse = response_courseDetails.completed;
                                                $scope.ongoingCourse = response_courseDetails.ongoing;
                                            }

                                            var response_LeaveDetails = ConnectivityService.AjaxRequest(LeaveDetails);
                                            if (response_LeaveDetails != null && response_LeaveDetails != "undefined") {
                                                //console.log(response_LeaveDetails);
                                                $scope.Comp_Off = response_LeaveDetails.Compoff;
                                                $scope.Remaining = response_LeaveDetails.Remaining;
                                                $scope.Unpaid = response_LeaveDetails.Unpaid;
                                            }


                                          $scope.initEvents();
                                          $scope.getWorkingHours();
                                          $scope.loader = false;

                            //})
                          }, 1000);


    };

    $scope.initEvents = function() {
    var today_bday = [];var today_ann = [];
    today_bday.length = 0;today_ann.length = 0;
    var d = new Date();
    var day = (d.getDate() < 10 ? '0' : '') + d.getDate();
    var month = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
    $scope.TodayE = month + "/" + day;
        $scope.loader = true;
        setTimeout(function() {
        var EventsDetails = ConnectivityService.AjaxRequest($scope.eventDetails);
        //console.log("console.log(EventsDetails);");
        //console.log(EventsDetails);
            if (EventsDetails != null && EventsDetails != "undefined") {
                if(EventsDetails.birthdays.length == 0){
                            $scope.countHBD = EventsDetails.birthdays.length;
                            }
                            else{
                            angular.forEach(EventsDetails.birthdays,function(value,key){
                            var dob = value.personal_info.dob.split('T')[0];//alert(dob);
                            var tmp_dob = dob.split('-')[1] +"/"+dob.split('-')[2];
                            if( tmp_dob.toString() == $scope.TodayE.toString()){
                            today_bday.push($scope.TodayE.toString());
                            }
                            });//alert(today_bday.length);
                            $scope.countHBD = today_bday.length;
                            }

                            if(EventsDetails.anniversaries.length == 0){
                            $scope.countASV = EventsDetails.anniversaries.length;
                            }
                            else{
                            angular.forEach(EventsDetails.anniversaries,function(value,key){
                            var anv = value.joining_date.split('T')[0];//alert(anv);
                            var tmp_anv = anv.split('-')[1] +"/"+anv.split('-')[2];
                            if( tmp_anv.toString() == $scope.TodayE.toString()){
                            today_ann.push($scope.TodayE.toString());
                            }
                            });//alert(today_ann.length);
                            $scope.countASV = today_ann.length;
                            }

            }

        }, 200);
    };
    $scope.getBirthdaysEvent = function() {
        $scope.loader = true;
        setTimeout(function() {
            ConnectivityService.PostData($scope.eventDetails)
                .then(function(response) {
                        var EventsDetails = response;
                        console.log(response);
                        $('.birthdayOverlay').css('display', 'block');
                        if (EventsDetails.birthdays.length == 0 || EventsDetails.birthdays.length == undefined || EventsDetails.birthdays.length == null) {
                            $scope.loader = false;
                            window.plugins.toast.showLongBottom('No records found.', function(a) {
                                console.log('toast success: ' + a)
                            }, function(b) {
                                console.log('toast error: ' + b)
                            });
                            return false;
                        } else {
                            //$scope.events_birthdays = EventsDetails.birthdays;
                            localStorage.setItem("eventTitle", "Birthdays");
                            localStorage.setItem("events_birthdays", JSON.stringify(EventsDetails.birthdays));
                            setTimeout(function() {
                                $mdDialog.show({
                                        controller: "events",
                                        templateUrl: 'templates/eventsPopUp.html',
                                        parent: angular.element(document.body),
                                        //scope: $scope,
                                        clickOutsideToClose: true,
                                        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                                    })
                                    .then(function(answer) {


                                    }, function() {
                                        //$scope.status = 'You cancelled the dialog.';
                                    });
                            }, 0);
                        }
                        $scope.loader = false;
                        $scope.norecords = false;
                        $('#norecords').html("");
                    },
                    function(data) {
                        //$('.birthdayOverlay').css('display','none');
                        //console.log(data);
                        $scope.loader = false;
                    });
        }, 200);
    };

    $scope.getSAnniversaryEvent = function() {
        $scope.loader = true;
        setTimeout(function() {
            ConnectivityService.PostData($scope.eventDetails)
                .then(function(response) {
                        var EventsDetails = response;
                        console.log(response);
                        $('.SAnniversaryOverlay').css('display', 'block');
                        if (EventsDetails.anniversaries.length == 0 || EventsDetails.anniversaries.length == undefined || EventsDetails.anniversaries.length == null) {
                            $scope.loader = false;
                            window.plugins.toast.showLongBottom('No records found.', function(a) {
                                console.log('toast success: ' + a)
                            }, function(b) {
                                console.log('toast error: ' + b)
                            });
                            return false;
                        } else {
                            //$scope.events_anniersary = EventsDetails.anniversaries;
                            localStorage.setItem("eventTitle", "Service Anniversary");
                            localStorage.setItem("events_anniversaries", JSON.stringify(EventsDetails.anniversaries));
                            setTimeout(function() {
                                $mdDialog.show({
                                        controller: "events",
                                        templateUrl: 'templates/eventsPopUp.html',
                                        parent: angular.element(document.body),
                                        clickOutsideToClose: true,
                                        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                                    })
                                    .then(function(answer) {}, function() {
                                        //$scope.status = 'You cancelled the dialog.';
                                    });
                            }, 0);
                        }
                        $scope.loader = false;
                        $scope.norecords = false;
                        $('#norecords').html("");
                    },
                    function(data) {
                        $('.SAnniversaryOverlay').css('display', 'none');
                        $scope.loader = false;
                    });
        }, 200);
    };
  /*alert($rootScope.RegisteredId);
   setTimeout(function(){
    $scope.$watch('RegisteredId', function(newValues, oldValues, scope) {

      if(newValues != "" && newValues != undefined){
        console.log(newValues);
        var pushnotify = AmsConstants.url_pushnotify;
        var tokenValue = localStorage.getItem("PushToken");
        var req = {
           "token": $rootScope.RegisteredId,
           "email": AmsValues.HRMS_email,
           "org": AmsValues.HRMS_orgId,
           "device": "AND"
        };
        ConnectivityService.PostData_post(pushnotify, req)
         .then(function(response) {
             //console.log(response);
         },
         function(data) {
          $scope.loader = false;
         });
      }
    });
    },100);*/
    $scope.closeEvents = function() {
        $('.birthdayOverlay').css('display', 'none');
        $('.SAnniversaryOverlay').css('display', 'none');
    };
    $scope.showAT = function() {
        $(".assigned").css("color", "#3f51b5");
        $(".created").css("color", "#000");
        $scope.Action = "Assigned to";
        $scope.taskAssignTo = true;
        $scope.taskCreatedBy = false;
    };
    $scope.showCB = function() {
        $(".created").css("color", "#3f51b5");
        $(".assigned").css("color", "#000");
        $scope.Action = "Created by";
        $scope.taskAssignTo = false;
        $scope.taskCreatedBy = true;
    };

    $scope.EditMyProfile = function() {
        $ionicViewSwitcher.nextTransition('none');
       // $ionicHistory.clearCache().then(function(){ $state.go('myProfileEdit') })
        $state.go("myProfileEdit");
    };
    $scope.ToDoList = function() {
            $ionicViewSwitcher.nextTransition('none');
            $state.go("to_do_list");
        };


    $scope.notify = function() {
    //console.log($scope.notify_value);
       /*
        $ionicViewSwitcher.nextTransition('none');
        $state.go("notify");*/
      try{
      updateNotifArray.length = 0;$scope.notifyBadge.length = 0;
      var url_notifyWeb = AmsConstants.url_notify_web + "notifs/notifications/" + AmsValues.HRMS_orgId + "/" + AmsValues.HRMS__a + "/" + AmsValues.HRMS__id;
      $.each($scope.notify_value,function(k,v){
           if(v.seen == false){
           updateNotifArray.push(v._id);
           }
        });
        if(updateNotifArray.length != 0){
        var socket = io.connect('https://www.procfactory.com/notif');

        socket.on('connect', function () {

        console.log("connect to server");
        socket.emit('updateNotif', updateNotifArray);
        });

        }
        setTimeout(function(){
        $ionicViewSwitcher.nextTransition('none');
        $state.go("notify");
        },2);
        }
        catch(err){
        console.log(err.message);
        }

    };

    $scope.ApplyLeave = function() {
        $ionicViewSwitcher.nextTransition('none');
        $state.go("applyLeave");
    };

    $scope.OpenCourses = function() {
        $ionicViewSwitcher.nextTransition('none');
        $state.go("training");
    };

    $scope.OpenTask = function() {
        $ionicViewSwitcher.nextTransition('none');
        $state.go("task");
    };

    $scope.downlist = function(){
    $('.textBody').scrollTop($('.textBody').scrollTop()+45);
    }
    $scope.uplist = function(){
    $('.textBody').scrollTop($('.textBody').scrollTop()-45);
    }





});



