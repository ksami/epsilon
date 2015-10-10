
Template.home.onCreated(function() {
	
});

Template.home.helpers({

	getCal: function(){
		userId = Meteor.userId();
		// console.log(userId);
		 // var result = GoogleApi.get('calendar/v3/', {user: Meteor.users.findOne(userId)});
		 // console.log(result);
		GoogleApi.get('calendar/v3/users/me/calendarList', {user: Meteor.users.findOne(userId)}).then(function(result) {
							console.log(result);
							console.log("inside callback");
						}).fail(function(err) {
					console.log(err);
				});
		// authencode = Meteor.users.findOne(userId).services.google.accessToken;
		// var url = "https://www.googleapis.com/youtube/v3/search";
		// console.log(authencode);
		//   var options = {
		//     'headers' : {
		//       'Content-Type': 'application/json',
		//       'Authorization': 'Bearer ' +  authencode,
		//       'X-JavaScript-User-Agent': "Google APIs Explorer"
		//     },
		//     'params' : {
		//        part : 'snippet',
		//        q : 'cats',
		//        maxResults : 25
		//     }
		//   };

		//   var searchResult = HTTP.get(url, options).then(function(results) {
		//   	console.log(result);
	//       console.log("inside callback");
	//     }).fail(function(err) {
	//     	console.log(err);
		//   });

	}
});
