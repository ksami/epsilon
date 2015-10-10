// Set up login services
Meteor.startup(function() {
  // Add Facebook configuration entry

  ServiceConfiguration.configurations.update(
    { service: "facebook" },
    { $set: {
        appId: Meteor.settings.FB_APPID,
        secret: Meteor.settings.FB_SECRET
      }
    },
    { upsert: true }
  );

  // Add Google configuration entry
  ServiceConfiguration.configurations.update(
    { service: "google" },
    { $set: {
        clientId: Meteor.settings.GOOGLE_APPID,
        client_email: Meteor.settings.GOOGLE_EMAIl,
        secret: Meteor.settings.GOOGLE_SECRET,
        requestPermissions: ['https://www.googleapis.com/auth/calendar']
      }
    },
    { upsert: true }
  );

});



// Meteor.publish(null, function() {
//   return Meteor.users.find(this.userId, { fields: {
//     'services.google.accessToken': 1,
//     'services.google.expiresAt': 1
//   }});
// });

Meteor.publish(null, function() {
  return Meteor.users.find(this.userId, {
  });
});
  
Meteor.users.allow({
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      if(userId == this.userId)
      return true; 
    },
    'update':function(userId, doc) {
      return true;
    }
  });