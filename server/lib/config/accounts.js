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

  // Add GitHub configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "github" },
    { $set: {
        clientId: "XXXXXXXXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */

  // Add Google configuration entry
  ServiceConfiguration.configurations.update(
    { service: "google" },
    { $set: {
        clientId: Meteor.settings.GOOGLE_APPID,
        client_email: Meteor.settings.GOOGLE_EMAIl,
        secret: Meteor.settings.GOOGLE_SECRET
      }
    },
    { upsert: true }
  );

  // Add Linkedin configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "linkedin" },
    { $set: {
        clientId: "XXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */
});
