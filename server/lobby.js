Meteor.methods({
    createRoom: function(roomName, times, venues, friends){
        if(Meteor.userId && Meteor.user() && Meteor.user().profile){
            let roomId = Rooms.insert({
                createdAt: new Date(),
                owner: Meteor.userId(),
                name: roomName,
                times: times,
                venues: venues,
                friends: friends
            });
            return roomId;
        }
    } 
});