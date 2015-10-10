
Template.home.onCreated(function() {
	
});

Template.home.helpers({

	getCal: function(){
		userId = Meteor.userId();
		// console.log(userId);
		// var result = GoogleApi.get('calendar/v3/', {user: Meteor.users.findOne(userId)});
		// console.log(result);
		jsonBody = {
  		"timeMin": moment().format(),
  		"timeMax": moment().add(7, 'days'),
  		"groupExpansionMax": 1,
  		"calendarExpansionMax": 1,
  		"items": [
    		{
      		"id": "weijian19391@gmail.com"
    		}
  		]
		};
		GoogleApi.post('calendar/v3/freeBusy', {user: Meteor.users.findOne(userId),  data: jsonBody}).then(function(result) {
							console.log(result);
							console.log(moment().format());
							console.log("inside callback");
						}).fail(function(err) {
					console.log(err);
				});

	}
});
