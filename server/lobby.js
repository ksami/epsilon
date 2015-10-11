Meteor.methods({
    createRoom: function(data){
        if(Meteor.userId && Meteor.user() && Meteor.user().profile){
            console.log(data);
            let roomId = Rooms.insert({
                createdAt: new Date(),
                owner: Meteor.userId(),
                name: data.name,
                times: data.times,
                venues: data.venues,
                friends: data.friends
            });
            return roomId;
        }
    }

});

Meteor.publish("rooms", function(){
    return Rooms.find({});
});