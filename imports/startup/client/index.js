// Client
import { Meteor } from 'meteor/meteor';
import createApp from '/imports/ui/createApp';

// Both
import '/imports/startup/both';

Meteor.startup(() => {
  createApp({
    ssr: false,
  });
});
