Meteor.methods({
    addMessage: function(msg, roomId){
        if(Meteor.userId && Meteor.user() && Meteor.user().profile){
            console.log("helasdl");
            Messages.insert({
                text: msg,
                createdAt: new Date(),
                owner: Meteor.userId(),
                username: Meteor.user().profile.name,
                roomId: roomId
            });
        }
        else{
            throw new Meteor.Error("not-logged-in", "User not logged in");
        }
    }
});

Meteor.publish("chat", function(data){
    let roomId = data.roomId;
    return Messages.find({roomId: roomId});
});
