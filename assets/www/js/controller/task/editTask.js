

Module_task.controller('editTask_controller', function($scope,AmsConstants,AmsValues,MenuList,StoreResponse,$timeout, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicHistory) {


$scope.close = function(){
//$ionicViewSwitcher.nextTransition('none');
//$state.go("task");
$ionicHistory.goBack();
};
var responseTask = JSON.parse( localStorage.getItem("updateTask") );
var assignto = [];assignto.length = 0;
console.log(responseTask);
$scope.project = {
    dueDate: new Date(responseTask.due_date),
    title : responseTask.title,
    description : responseTask.description,
    Assignedto : responseTask.assigned_to.name

  };
$scope.init = function(){
angular.forEach(responseTask.assigned_to,function(value,key){
assignto.push(value.name);
});
$scope.project.Assignedto = assignto;
};

//var emp = '[{"_id":"58b7e3e7edbefd04c89a98cb","name":"Pavitra Rastogi","first_name":"Pavitra","last_name":"Rastogi","job_title":"Consultant","email":"pavitra.rastogi@adnatesolutions.com","joining_date":"2017-03-02T09:20:39.000Z","reporting_to":"trupti.kaskar@adnatesolutions.com","employee_status":"Employed","employee_type":"NA","skill_set":[],"mailVerified":"Y","organization":{"id":"adnate","name":"Adnate"}},{"_id":"58b7f2ba0abd43120ce505af","name":"Sumedha Rapkal","first_name":"Sumedha","last_name":"Rapkal","job_title":"Associate Consultant","email":"sumedha.rapkal@adnatesolutions.com","joining_date":"2017-03-02T10:23:54.000Z","reporting_to":"trupti.kaskar@adnatesolutions.com","employee_status":"Employed","employee_type":"NA","skill_set":[],"mailVerified":"N","organization":"Adnate"},{"_id":"58b7f4c70abd43120ce505b0","name":"Trupti Kaskar","first_name":"Trupti","last_name":"Kaskar","job_title":"HR","email":"trupti.kaskar@adnatesolutions.com","joining_date":"2017-03-02T10:32:39.000Z","reporting_to":"trupti.kaskar@adnatesolutions.com","employee_status":"Employed","skill_set":[],"mailVerified":"N","organization":"Adnate"},{"_id":"58b7f5ac862101164c5960cb","name":"Dipti Kulkarni","first_name":"Dipti","last_name":"Kulkarni","job_title":"Associate Consultant","email":"dipti.kulkarni@adnatesolutions.com","joining_date":"2017-03-02T10:36:28.000Z","reporting_to":"trupti.kaskar@adnatesolutions.com","employee_status":"Employed","employee_type":"NA","skill_set":["HTML","HTML","HTML","HTML","HTML","HTML","HTML","HTML","HTML","HTML","HTML"],"mailVerified":"N","organization":"Adnate"},{"_id":"58b811aaaa745f06c00fb2b1","name":"Pradnya Natu","first_name":"Pradnya","last_name":"Natu","job_title":"Consultant","email":"pradnya.natu@adnatesolutions.com","joining_date":"2017-03-13T18:30:00.000Z","reporting_to":"trupti.kaskar@adnatesolutions.com","employee_type":"Full Time","employee_status":"Employed","skill_set":["HTML","HTML","HTML","HTML","HTML","HTML","HTML"],"mailVerified":"N","organization":"Adnate"},{"_id":"58b81599ab23911658cd0f20","name":"Sonika Awasarmol","first_name":"Sonika","last_name":"Awasarmol","job_title":"Consultant","email":"sonika.awasarmol@adnatesolutions.com","joining_date":"2017-03-28T18:30:00.000Z","reporting_to":"trupti.kaskar@adnatesolutions.com","employee_type":"Full Time","employee_status":"Employed","skill_set":[],"mailVerified":"N","organization":"Adnate"},{"_id":"58bd2923470e4f08bcc532ce","name":"Gayatri Prabhudesai","first_name":"Gayatri","last_name":"Prabhudesai","job_title":"Consultant","email":"gayatri.prabhudesai@adnatesolutions.com","joining_date":"2017-03-06T18:30:00.000Z","reporting_to":"trupti.kaskar@adnatesolutions.com","employee_type":"Full Time","employee_status":"Employed","skill_set":["HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","HTML","CSS","JAVASCRIPT","ANGULAR","HTML","CSS","JAVASCRIPT","ANGULAR","HTML","CSS","JAVASCRIPT","ANGULAR","HTML","CSS","JAVASCRIPT","ANGULAR","HTML","CSS","JAVASCRIPT","ANGULAR"],"mailVerified":"Y","organization":{"id":"adnate","name":"Adnate"}},{"_id":"58d0d2cccb80660b20d611fd","name":"Mamta makegaonkar","first_name":"Mamta","last_name":"makegaonkar","job_title":"Consultant","email":"mamta.makegaonkar@adnatesolutions.com","joining_date":"2017-03-14T18:30:00.000Z","reporting_to":"trupti.kaskar@adnatesolutions.com","employee_type":"Full Time","employee_status":"Employed","skill_set":[],"mailVerified":"Y","organization":{"id":"adnate","name":"Adnate"}},{"_id":"58d25851ae938f063cb1d3d9","name":"Sohan Khoche","first_name":"Sohan","last_name":"Khoche","job_title":"Consultant","email":"sohan.khoche@adnatesolutions.com","joining_date":"2017-03-21T18:30:00.000Z","reporting_to":"trupti.kaskar@adnatesolutions.com","employee_type":"Full Time","employee_status":"Employed","skill_set":[],"mailVerified":"Y","organization":{"id":"adnate","name":"Adnate"}},{"_id":"58e608d3b25ec312c8573cee","name":"Shrikrishna Paliwal","first_name":"Shrikrishna","last_name":"Paliwal","job_title":"Associate","email":"shri.paliwal@adnatesolutions.com","joining_date":"2017-03-25T00:00:00.000Z","reporting_to":"trupti.kaskar@adnatesolutions.com","employee_type":"Full Time","employee_status":"Employed","skill_set":[],"mailVerified":"N","organization":{"id":"adnate","name":"Adnate"}}]';
//$scope.emp_details = JSON.parse(emp);


$scope.saveTask = function(project){

$scope.url = AmsConstants.url_hrms_task+"updateTaskStatus";
//var title = $window.document.getElementById("title").value;
var description = $window.document.getElementById("description").value;
$scope.project.dateString = moment($scope.project.dueDate).format("YYYY-MM-DD");
//$scope.project.assignTO = $scope.project.Assignedto;

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var output = d.getFullYear() + '-'+ ((''+month).length<2 ? '0' : '') + month +'-'+ ((''+day).length<2 ? '0' : '') + day ;

var envelope = {"_id":responseTask._id,"description":description,"duedate":$scope.project.dateString};

 console.log(envelope);
$scope.loader = true;
 setTimeout(function(){

 ConnectivityService.PostData_post($scope.url,envelope)
     .then(function(response) {
     console.log(response);
     //console.log(JSON.stringify( response+"kkkkkkkkkkvvvvv") );
     $scope.loader = false;
     window.plugins.toast.showLongBottom('Task updated successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
     $rootScope.$emit("CallParentMethod", function(){
            //alert("done");
     });
     $ionicViewSwitcher.nextTransition('none');
     $ionicHistory.clearCache().then(function(){ $state.go('task') })

     },
     function(data) {
                    $scope.loader = false;
                    console.log("error");
                    window.plugins.toast.showLongBottom('Adding task failed.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
                    $ionicViewSwitcher.nextTransition('none');
                    //$state.reload();
                    $state.go("task");
     });
 },200);


};
});




