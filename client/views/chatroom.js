if(Meteor.isClient){

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

      let msg = event.target.msg.value.trim();
      if(msg !== ""){
        Meteor.call("addMessage", msg, Session.get("current-room"));
      }

      event.target.msg.value = "";
    }
  });
}