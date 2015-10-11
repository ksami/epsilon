Meteor.methods({
    addVote: function(data){
        console.log(data);

        if(Meteor.userId && Meteor.user() && Meteor.user().profile){
            let finaltimeprop = "final.time."+data.time;
            let objt = {};
            objt[finaltimeprop] = 1;
            let finalvenueprop = "final.venue."+data.venue;
            let objv = {};
            objv[finalvenueprop] = 1;

            console.log(objt);
            let res = Rooms.update({_id: Meteor.user().profile.currentRoom},{$inc: objt});
            console.log(res);
            // console.log(objv);
            Rooms.update({_id: Meteor.user().profile.currentRoom},{$inc: objv});
        }
        else{
            throw new Meteor.Error("not-logged-in", "User not logged in");
        }
    }
});