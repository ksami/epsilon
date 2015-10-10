if(Meteor.isClient){
  Template.main.events({
    "click .collection-item": function(event){
      //DEBUG:
      Session.set("current-room", "debug");
      Router.go('/chatroom');
    }
  });
}