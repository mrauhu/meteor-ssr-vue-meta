import { Meteor } from 'meteor/meteor';

const vueMetaVersion = require('/package.json').dependencies['vue-meta'];

Meteor.methods({
  getVueMetaVersion() {
    return vueMetaVersion;
  }
})
