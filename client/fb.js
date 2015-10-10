if(Meteor.isClient){
    // Meteor.call('getUserFriends', function(err, data){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log(data);
    //     }
    // });

    if(Session.get('facebook') == null) {
        Meteor.call('getUserFacebookPic', function(err, data){
            if(err){
                console.log(err);
            }
            else{
                Session.set('facebook', data);
            }
        });
    }

    if(Session.get('userFriends') == null) {
        Meteor.call('getUserFriends', function(err, data) {
            if(err) {
                console.log(err);
            } else {
                Session.set('userFriends', data);
            }
        });
    }

    Template.facebook.helpers({
        user: function() {
            return Session.get('facebook');
        }
    });

    Template.lobby.helpers({
        userFriends: function() {
            return Session.get('userFriends');
        }
    });
}
