/**
 * Team.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    members: {
      collection: 'user',
      via: 'team'
    },

    tickets: {
      collection: 'ticket',
      via: 'team'
    }

  },

};

