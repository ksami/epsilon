Template.google.events({
  'click #google-login': function(event) {
    Meteor.loginWithGoogle({requestPermissions: ['https://www.googleapis.com/auth/calendar'], forceApprovalPrompt: true}, function(err){
      if (err) {
        throw new Meteor.Error("Google login failed");
      } else {
        Router.go('/main');
      }
    });
  },
});