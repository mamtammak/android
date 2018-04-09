/* Add Constant and Values here */
//'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
var ValueConstants = angular.module('starter.valueconstants', []);
ValueConstants.constant('AmsConstants', {
                                /* url : 'http://192.168.1.20:1337/pFactory/',
                                 url_notify_web : 'http://192.168.1.20:1337/',
                                 url_onBoard : 'http://192.168.1.20:1339/',
                                 url_hrms : 'http://192.168.1.20:1337/users/',
                                 url_hrms_task : 'http://192.168.1.20:1339/tasks/',
                                 url_hrms_lms : 'http://192.168.1.20:1339/lms/',
                                 url_hrms_timesheets : 'http://192.168.1.20:1339/timesheets/',
                                 url_hrms_training : 'http://192.168.1.20:1339/trainings/',
                                 url_hrms_training2 : 'http://192.168.1.20:1337/trainings/',
                                 url_hrms_attendance : 'http://192.168.1.20:1339/attendances/',
                                 url_organization : 'http://192.168.1.20:1339/organizations/',
                                 url_dashboard : 'http://192.168.1.20:1339/dashboard/',
                                 url_uploadProfilePic : 'http://192.168.1.20:1339/fileupload/uploadEmpProfilePics',
                                 url_pushnotify : 'http://192.168.1.20:1339/pushnotification/inserttokenid',
                                 url_payroll : 'http://192.168.1.20:1339/payroll_structures/',*/


                                  url: 'https://www.procfactory.com/pFactory/',
                                  url_notify_web : 'https://www.procfactory.com/',
                                  url_hrms : 'https://www.procfactory.com/users/',
                                  url_onBoard : 'https://hrms.procfactory.com/',
                                  url_hrms_task : 'https://hrms.procfactory.com/tasks/',
                                  url_hrms_lms : 'https://hrms.procfactory.com/lms/',
                                  url_hrms_timesheets : 'https://hrms.procfactory.com/timesheets/',
                                  url_hrms_training : 'https://hrms.procfactory.com/trainings/',
                                  url_hrms_training2 : 'https://www.procfactory.com/trainings/',
                                  url_hrms_attendance : 'https://hrms.procfactory.com/attendances/',
                                  url_organization : 'https://hrms.procfactory.com/organizations/',
                                  url_dashboard : 'https://hrms.procfactory.com/dashboard/',
                                  url_uploadProfilePic : 'https://hrms.procfactory.com/fileupload/uploadEmpProfilePics',
                                  url_pushnotify : 'https://hrms.procfactory.com/pushnotification/inserttokenid',
                                  url_payroll : 'https://hrms.procfactory.com/payroll_structures/',

                                  httpTimeout: 5000,
                        //var config = {
                                 headers : '{Content-Type : application/json ,Accept : application/json}'

                                 });


ValueConstants.value('AmsValues', {

                        HRMS_Token : "",
                        HRMS_Exp_DT : "",
                        HRMS_email : "",
                        HRMS_name : "",
                        HRMS_orgName : "",
                        HRMS_orgId : "",
                        HRMS_OrgID_ST : "", // login time
                        HRMS_imft : "",
                        HRMS_role : "",
                        HRMS_iat : "",
                        HRMS__id : "", //user id
                        HRMS_Branch_id : "",
                        HRMS_Country:"",
                        HRMS__a: "", //app id
                        HRMS_workingdays: "",
                        HRMS_ProfilePic_thumbnail:"",
                        HRMS_ProfilePic_original:"",
                        HRMS_orgLogo:"",
                        HRMS_expiryDt:""
                        }
                        );
ValueConstants.value('EmpProfilePic', {

                     thumbnail : "",
                     original : ""
                     });

ValueConstants.value('DetailValues', {

                        name : "",
                        account_balance:"",
                        job_title : "",
                        email : "",
                        joining_date : "",
                        reporting_to : "",
                        hr_manager : "",
                        workingDays : "",
                        workingHours : "",
                        department : "",
                        branch_name : "",
                        employee_code : "",
                        employee_status : "",
                        bio : "",
                        workingHoursShift : "",
                        employee_type : ""

                        });



ValueConstants.value('PersonelValues', {

                        address : "",
                        city : "",
                        country : "",
                        postal_code : "",
                        dob : "",
                        gender : "",
                        landline : "",
                        marital_status : "",
                        state : "",
                        mobile : ""

                        });

ValueConstants.value('EmergencyValues', {

                        contact : "",
                        first_name : "",
                        last_name : "",
                        relationship : "",
                        mobile:""

                        });

ValueConstants.value('BankValues', {

                        ifsc : "",
                        account_number : "",
                        account_type : "",
                        name : ""

                        });

ValueConstants.value('LeaveSetting', {

                       Hr_engagement  : "",
                       backdated_leave : "",
                       compoff_factor_holiday:"",
                       compoff_factor_weekend:"",
                       sandwich_rule:"",
                       leaves_config:""

                        });

