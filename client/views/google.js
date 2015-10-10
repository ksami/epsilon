Template.google.events({
  'click #google-login': function(event) {
  	fb_user = Meteor.userId();
    Meteor.loginWithGoogle({requestPermissions: ['https://www.googleapis.com/auth/calendar'], forceApprovalPrompt: true}, function(err){
      if (err) {
        throw new Meteor.Error("Google login failed");
      } else {
      	google_services = Meteor.users.findOne(Meteor.userId()).services;
      	Meteor.users.update({_id:Meteor.userId()},{$set: {'profile.facebookId': fb_user}});
        Router.go('/');
      }
    });
  },

});

