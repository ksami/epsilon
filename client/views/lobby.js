if(Meteor.isClient){
    Template.lobby.events({

    });

    Template.lobby.helpers({
        triggerNotif:function(){
            dataPack = [{"userEmail":"weijian19391@gmail.com", "timing":[1,2],"venue":["CBD", "NUS"]}];
            // console.log(dataPack);
            var type = "info";
            var subject = "ksami.ihide@gmail.com";
            var message = "hahaha";
            Meteor.call('sendNotification', 'serverMessage:' + type, subject, message, {
                userCloseable: true,
                timeout: 0
            });
            serverMessages.listen('serverMessage:info', function (subject, message, options) {
                currentEmail = Meteor.users.findOne(Meteor.userId()).services.google.email;
                if(subject == currentEmail) {
                    console.log(subject);
                    Notifications.info(subject, message, options);
                }
            });
        }
    });
}