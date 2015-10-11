if(Meteor.isClient){

  Tracker.autorun(function () {
    if(Meteor.user() && Meteor.user().profile && Meteor.user().profile.currentRoom){
      Meteor.subscribe("chat", {roomId: Meteor.user().profile.currentRoom});
    }
    Meteor.subscribe("roomers");
  });

  Template.chatroom.helpers({
    msgs: function(){
      return Messages.find({roomId: Meteor.user().profile.currentRoom});
    },
    isOwner: function(ownerID) {
      return ownerID == Meteor.userId();
    },
    room: function(){
      console.log(Rooms.find({_id: Meteor.user().profile.currentRoom}).fetch());
      return Rooms.findOne({_id: Meteor.user().profile.currentRoom});
    }
  });

  Template.chatroom.events({
    "submit .new-msg": function(event){
      event.preventDefault();

      let msg = event.target.msg.value.trim();
      if(msg !== ""){
        Meteor.call("addMessage", msg, Meteor.user().profile.currentRoom);
      }

      event.target.msg.value = "";
    }
  });
}