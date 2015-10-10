if(Meteor.isClient){

  Meteor.call('getUserGoogle', function(err, data){
        if(err){
          console.log(err);
        }
        else{
          Session.set('google', data);
        }
    });

    Template.google.helpers({
        user: function() {
            return Session.get('google');
        }
    });
}