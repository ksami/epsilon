Meteor.publish(null, function(){
    return Meteor.users.find(this.userId);
});

Meteor.methods({
    getUserFriends: function(callback){
        if(Meteor.userId && Meteor.user() && Meteor.user().services && Meteor.user().services.facebook){
            let fbId = Meteor.user().services.facebook.id;
            let token = Meteor.user().services.facebook.accessToken;
            let FBGraphSync = Meteor.wrapAsync(FBGraph.get);
            let result = FBGraphSync(`/${fbId}/friends?access_token=${token}`);
            return result;
        }
        else{
            throw new Meteor.Error("not-logged-in", "User not logged in");
        }
    },

    getUserFacebookId: function(){
        if(Meteor.userId && Meteor.user() && Meteor.user().services && Meteor.user().services.facebook){
            return Meteor.user().services.facebook.id;
        }
        else{
            return null;
        }
    }
});
