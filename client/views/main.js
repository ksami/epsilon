if(Meteor.isClient){
  Template.main.events({
    "click .collection-item": function(event){
      //DEBUG:
      Session.set("current-room", "debug");
      Router.go('/chatroom');
    }
  });

  Template.main.helpers({
  	listenNotif:function(){
            serverMessages.listen('serverMessage:info', function (subject, message, options) {
              currentFbId = Meteor.users.findOne(Meteor.users.findOne(Meteor.userId()).profile.facebookDocId).services.facebook.id;
              if(subject == currentFbId || true) {
                  console.log(subject);
                  Notifications.info(subject, message, options);
              }
      			});
          },
		getCal: function(){
			userId = Meteor.userId();
			var tz = jstz.determine();
			Meteor.call('getUserFriends', function(error, result){
				// console.log(result);
				for (var i = 0; i < result.data.length; i++) {
					// console.log(result.data[i]);
					currentFriend = Meteor.users.findOne({"profile.facebookName":result.data[i].name});
					console.log(currentFriend);
					currentFriendEmail = currentFriend.services.google.email;
					jsonBody = {
			  		"timeMin": moment().format(),
			  		"timeMax": moment().add(7, 'days'),
			  		"groupExpansionMax": 1,
			  		"calendarExpansionMax": 1,
			  		"timeZone" : tz.name(),
			  		"items": [
			    		{
			      		"id": currentFriendEmail,
			    		}
			  		]
					};
					GoogleApi.post('calendar/v3/freeBusy', {user: currentFriend,  data: jsonBody}).then(function(result) {
						console.log(result);
						freeTime = [];
						currenTime = moment().format();
						for (var i = 0; i < result.calendars[currentFriendEmail].busy.length; i++) {
							// console.log(result.calendars[currentFriendEmail].busy[i]);
							if (currenTime != result.calendars[currentFriendEmail].busy[i].start)
								freeTime.push({"startTime" : currenTime, "endTime" : result.calendars[currentFriendEmail].busy[i].start});
							currenTime = result.calendars[currentFriendEmail].busy[i].end;
						}
						console.log(freeTime);
						Session.set(currentFriendEmail+'freeTime', freeTime);
					}).fail(function(err) {
						console.log(err);
					});
				}
			});
		},
	});
}