import { Meteor } from 'meteor/meteor';

/**
 * Async meteor call
 * @param {string} method
 * @param {...Object} [args]
 * @return {Promise<*>}
 */
export default function call(method, ...args) {
  return new Promise((resolve, reject) => {
    Meteor.call(method, ...args, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}
