Meteor.methods({
	addMessage: function(msg, roomId){
		if(Meteor.userId && Meteor.user() && Meteor.user().profile){
			Messages.insert({
				text: msg,
				createdAt: new Date(),
				owner: Meteor.userId(),
				facebookId: Meteor.users.findOne(Meteor.user().profile.facebookDocId).services.facebook.id,
				username: Meteor.user().profile.name,
				roomId: roomId
			});
		}
		else{
			throw new Meteor.Error("not-logged-in", "User not logged in");
		}
	},
	sendNotification: function(){
		serverMessages.notify.apply(serverMessages,arguments);
	}
});

Meteor.publish("chat", function(data){
	let roomId = data.roomId;
	return Messages.find({roomId: roomId});
});
