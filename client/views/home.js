
Template.home.onCreated(function() {
	
});

Template.home.helpers({

	getCal: function(){
		userId = Meteor.userId();
		var tz = jstz.determine();
		Meteor.call('getUserFriends', function(error, result){
			// console.log(result);
			for (var i = 0; i < result.data.length; i++) {
				// console.log(result.data[i]);
				currentFriend = Meteor.users.findOne({"profile.facebookName":result.data[i].name});
				console.log(currentFriend);
				jsonBody = {
		  		"timeMin": moment().format(),
		  		"timeMax": moment().add(7, 'days'),
		  		"groupExpansionMax": 1,
		  		"calendarExpansionMax": 1,
		  		"timeZone" : tz.name(),
		  		"items": [
		    		{
		      		"id": currentFriend.services.google.id,
		    		}
		  		]
				};
				// console.log(Meteor.users.findOne(userId));
				GoogleApi.post('calendar/v3/freeBusy', {user: currentFriend,  data: jsonBody}).then(function(result) {
					// console.log(currentFriend.profile.facebookName);
					console.log(result);
					// console.log(moment(result.calendars["weijian19391@gmail.com"].busy[0].end).format());
					// console.log(moment().format());
					console.log("inside callback");
				}).fail(function(err) {
					console.log(err);
				});
			}
		});
	}
});
