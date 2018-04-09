var gcm = require('node-gcm');
var apn = require('apn');

//API Server Key
var sender = new gcm.Sender('AIzaSyAWAU7GH08IvuSEJch_KXymIyeMnCFi8bA');

var message = new gcm.Message();

var optionsIOS = {
    token: {
      key:'AuthKey_7542V8WBAG.p8',
      keyId: "7542V8WBAG",
      teamId: "UJAV5W4RDM"
    },
    production: false
  };

  var apnProvider = new apn.Provider(optionsIOS);



module.exports.sendIOSNotification = function (userToken, Msg) {
    console.log("SENDING IOS NOTIFICATION")
    var note = new apn.Notification();
    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 1;
    note.sound = "ping.aiff";
    note.alert = Msg;
    note.payload = {'content-available':true,'messageFrom': 'GPSTracker'};
    note.topic = "ioGPSTrack.ionic.starter";
    apnProvider.send(note, userToken).then( (result) => {
        // see documentation for an explanation of result
         console.log("IOS NOTIFICAITON RESPONSE", result);
      });
}

// Value the payload data to send...




module.exports.sendNotification = function (userToken, Msg) {
    var registrationIds = [];
    message.addData('message', Msg);
   /*  message.addData('message',"\u270C Peace, Love \u2764 and PhoneGap \u2706!"); */
    message.addData('title','GPS Tracker' );
    //message.addData('msgcnt', '1'); // Shows up in the notification in the status bar
    message.addData('notificationid', Math.random()*10);
    message.addNotification({
        title: 'Attention!',
        body: Msg,
        icon: 'ic_launcher',
        id: Math.random() * 10,
      });
    //message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
    //message.collapseKey = 'demo';
    //message.delayWhileIdle = true; //Default is false
    message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.

    // At least one reg id required

    registrationIds.push(userToken);


 /*    registrationIds.push('APA91bwu-47V0L7xB55zoVd47zOJahUgBFFuxDiUBjLAUdpuWwEcLd3FvbcNTPKTSnDZwjN384qTyfWW2KAJJW7ArZ-QVPExnxWK91Pc-uTzFdFaJ3URK470WmTl5R1zL0Vloru1B-AfHO6QFFg47O4Cnv6yBOWEFcvZlHDBY8YaDc4UeKUe7ao'); */

    /**
     * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
     */
    console.log(message, userToken)
    sender.send(message, registrationIds, 4, function (error, result) {
        if (error) {
            console.error(error)
            return;
        }
        console.log("push notification result : ", result);
    });

}


// Pritesh code

var options = {
  token: {
    key:'.\\app_api\\apns\\AuthKey_L5D54XYP39.p8',
    keyId: "L5D54XYP39",
    teamId: "UJAV5W4RDM"
  },
  production: false
};

var apnProvider = new apn.Provider(options);

module.exports.sendPushNotification = function(title, body,email,misleneous){
          //var deviceToken = "95331ac000289edf40f66fd63a325b7622fe3ec9bf430022d4602c029c808cbb";

          var note = new apn.Notification();





          pushnoti.find({"emailid":email}).exec(function(err, result){



            if(result.length >0)
            {
              if(result[0].imeino=="IOS")
              {
                note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
                note.badge = 3;
                note.sound = "ping.aiff";
                note.alert = body;
                note.payload = {'messageFrom': title};
                note.topic = "com.adnateitsolutions.com";

                console.log("==============");

                apnProvider.send(note, result[0].token, function (result) {
                  // see documentation for an explanation of result
                  // console.log(result);
                });

              }
              else if(result[0].imeino=="AND"){

                var sender = new gcm.Sender(serverKey);
                var registrationIds = [];

                // Value the payload data to send...
                message.addData('message',body);
                message.addData('title',title );
                message.addData('msgcnt','3'); // Shows up in the notification in the status bar
                message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
                message.priority='high';
                registrationIds.push(result[0].token);


                sender.send(message, registrationIds, 4, function (result) {
                  console.log(result);
                });
              }

            }else
            {
              //res.status(200);
            }

          });

          // }else
          // {


          // }
        }

        //code for attendance notification Checkin

        module.exports.usersforAttendanceCheckInSync = function(org, workingHours,action){

          if(action=="In")
          {
            Users.find({"organization.id" : org, "workingHours" : workingHours._id}, function(err, users){
              if(err){
                console.error(err);
                return;
              }
              if(users.length > 0){
                for(var i = 0; i<users.length; i++){
                  module.exports.attendancenotificationChecin(org, workingHours, users[i]._id,users[i].email);
                }
              }
              else{
                console.log('No users found for shift :: ', workingHours._id);
              }

            });
          }else{

            console.log("usersforAttendanceCheckInSync"+org);
            console.log("usersforAttendanceCheckInSync");
            Users.find({"organization.id" : org, "workingHours" : workingHours._id}, function(err, users){
              if(err){
                console.error(err);
                return;
              }
              if(users.length > 0){
                for(var i = 0; i<users.length; i++){
                  module.exports.attendancenotificationChecin(org, workingHours, users[i]._id,users[i].email,"oUT")
                }
              }
              else{
                console.log('No users found for shift :: ', workingHours._id);
              }

            });





          }
        }