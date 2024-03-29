Template.google.events({
  'click #google-login': function(event) {
  	fbDoc_user = Meteor.userId();
  	fb_name = Meteor.user().services.facebook.name;
    Meteor.loginWithGoogle({requestPermissions: ['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/userinfo.email'], forceApprovalPrompt: true}, function(err){
      if (err) {
        throw new Meteor.Error("Google login failed");
      } else {
      	google_services = Meteor.users.findOne(Meteor.userId()).services;
      	Meteor.users.update({_id:Meteor.userId()},{$set: {'profile.facebookDocId': fbDoc_user}});
        Meteor.users.update({_id:Meteor.userId()},{$set: {'profile.facebookName': fb_name}});
        // Meteor.users.update({_id:fbDoc_user},{$set: {'profile.facebookDocId': fbDoc_user}});
        // Meteor.users.update({_id:fbDoc_user},{$set: {'profile.facebookName': fb_name}});
        Router.go('/main');
      }
    });
  },

});

