if(Meteor.isClient){
  Template.main.events({
    "click .collection-item": function(event){
      Router.go('/chatroom');
    },

    "click li.notification": function(event) {
      var roomId = $(event.target).parent().find('.message').html();
      var timeSlots = [
        '12AM - 1AM',
        '1AM - 2AM',
        '2AM - 3AM',
        '3AM - 4AM',
        '4AM - 5AM',
        '5AM - 6AM',
        '6AM - 7AM',
        '7AM - 8AM',
        '8AM - 9AM',
        '9AM - 10AM',
        '10AM - 11AM',
        '11AM - 12PM',
        '12PM - 1PM',
        '1PM - 2PM',
        '2PM - 3PM',
        '3PM - 4PM',
        '4PM - 5PM',
        '5PM - 6PM',
        '6PM - 7PM',
        '7PM - 8PM',
        '8PM - 9PM',
        '9PM - 10PM',
        '10PM - 11PM',
        '11PM - 12AM'
      ];

      var data = Rooms.findOne({_id: roomId});

      var times = data.times;
      var venues = data.venues;

      var timeSelectInput = $('select.time-select');
      var venueSelectInput = $('select.venue-select');

      for(var i=0; i<times.length; i++) {
        var timeSlot = parseInt(times[i]);
        var html = $("<option value='" + timeSlot + "'>" + timeSlots[timeSlot] + "</option>");
        timeSelectInput.append(html);
      }

      for(var i=0; i<venues.length; i++) {
        var html = $("<option value='" + venues[i] + "'>" + venues[i] + "</option>");
        venueSelectInput.append(html);
      }

      $('#voteModal select').material_select();

      $('#voteModal').openModal();

    },
  });

  Template.main.onRendered(function(){
    //submit vote
    $(".vote-form-submit").click(function() {
      let time = "";
      let venue = "";

      let timeSelect = $('#time-input');
      for(let i=0; i<timeSelect[0].options.length; i++) {
        if(typeof timeSelect[0].options[i].value !== 'undefined' && timeSelect[0].options[i].value !== "") {
          time = timeSelect[0].options[i].value;
        }
      }

      let venueSelect = $('#venue-input');
      for(let i=0; i<venueSelect[0].options.length; i++) {
        if(typeof venueSelect[0].options[i].value !== 'undefined' && venueSelect[0].options[i].value !== "") {
          venue = venueSelect[0].options[i].value;
        }
      }

      //process user's vote
      Meteor.call('addVote', {time: time, venue: venue}, function(err, data){
        if(err){
          console.log(err);
        }
        Router.go("/chatroom");
      });

    });

  });

  Template.main.helpers({
    chatrooms: function(){
      return Rooms.find({}).fetch();
    },
  	listenNotif:function(){
            serverMessages.listen('serverMessage:info', function (subject, message, options) {
              currentFbId = Meteor.users.findOne(Meteor.users.findOne(Meteor.userId()).profile.facebookDocId).services.facebook.id;
              if(subject == currentFbId) {
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