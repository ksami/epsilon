if(Meteor.isClient){
  Template.main.events({
    "click .collection-item": function(event){
      //DEBUG:
      Session.set("current-room", "debug");
      Router.go('/chatroom');
    }
  });

  Template.main.helpers({

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
				}).fail(function(err) {
					console.log(err);
				});
			}
		});
	}
});

}