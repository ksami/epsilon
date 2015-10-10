Template.google.events({
  'click #google-login': function(event) {
    Meteor.loginWithGoogle({}, function(err){
      if (err) {
        throw new Meteor.Error("Google login failed");
      } else {
        Router.go('/');
      }
    });
  },
});