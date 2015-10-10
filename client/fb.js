if(Meteor.isClient){
    Meteor.call('getUserData', function(err, data){
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
        }
    });
}
