if(Meteor.isClient){
    Meteor.call('getUserFriends', function(err, data){
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
        }
    });
    Meteor.call('getUserFacebookId', function(err, data){
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
        }
    });
}
