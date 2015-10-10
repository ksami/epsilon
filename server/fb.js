Meteor.publish(null, function(){
    return Meteor.users.find(this.userId);
});

Meteor.methods({
    getUserData: function(){
        if(Meteor.userId && Meteor.user() && Meteor.user().services && Meteor.user().services.facebook){
            let fbId = Meteor.user().services.facebook.id;
            let token = Meteor.user().services.facebook.accessToken;
            FBGraph.get(`/${fbId}/friends?access_token=${token}`, function(err, res) {
                console.log(res);
            });
        }
        else{
            throw new Meteor.Error("not-logged-in", "User not logged in");
        }
    }
});
