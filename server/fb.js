
Meteor.methods({
    getUserFriends: function(){
        if(Meteor.userId && Meteor.user() && Meteor.user().services){
            let fbId = Meteor.users.findOne(Meteor.user().profile.facebookDocId).services.facebook.id;
            let token = Meteor.users.findOne(Meteor.user().profile.facebookDocId).services.facebook.accessToken;
            let FBGraphSync = Meteor.wrapAsync(FBGraph.get);
            let result = FBGraphSync(`/${fbId}/friends?access_token=${token}`);
            return result;
        }
        else{
            throw new Meteor.Error("not-logged-in", "User not logged in");
        }
    },

    getUserFacebookPic: function(){
        if(Meteor.userId && Meteor.user() && Meteor.user().services && Meteor.user().services.facebook){
            let fbId = Meteor.user().services.facebook.id;
            let fbName = Meteor.user().services.facebook.name;
            let token = Meteor.user().services.facebook.accessToken;
            let FBGraphSync = Meteor.wrapAsync(FBGraph.get);
            let result = FBGraphSync(`/${fbId}/picture?access_token=${token}`);
            return {name: fbName, picture: result.location};
        }
        else{
            return null;
        }
    },
    getUserGoogle: function() {
      if(Meteor.userId && Meteor.user() && Meteor.user().services && Meteor.user().services.google){
            console.log(Meteor.user());
            return {email: Meteor.user().services.google.email};
        }
        else{
            return null;
        }
    }
});
