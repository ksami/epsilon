if(Meteor.isClient){
  //DEBUG:
  Session.set("current-room", "debug");

  Tracker.autorun(function () {
    Meteor.subscribe("chat", {roomId: Session.get("current-room")});
    // Meteor.subscribe("privateMessages");
  });

  Template.chatroom.helpers({
    msgs: function(){
      return Messages.find({roomId: Session.get("current-room")});
    }
  });

  Template.chatroom.events({
    "submit .new-msg": function(event){
      event.preventDefault();

      let msg = event.target.msg.value;
      console.log(msg);
    }
  });
}