if(Meteor.isClient){

  Tracker.autorun(function () {
    Meteor.subscribe("chat", {roomId: Meteor.user().profile.currentRoom});
    Meteor.subscribe("rooms");
  });

  Template.chatroom.helpers({
    msgs: function(){
      return Messages.find({roomId: Meteor.user().profile.currentRoom});
    },
    isOwner: function(ownerID) {
      return ownerID == Meteor.userId();
    },
    room: function(){
      return Rooms.find({_id: Meteor.user().profile.currentRoom});
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