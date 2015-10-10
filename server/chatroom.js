
Meteor.publish("chat", function(data){
    let roomId = data.roomId;
    return Messages.find({roomId: roomId});
});

if(Meteor.isServer){
}