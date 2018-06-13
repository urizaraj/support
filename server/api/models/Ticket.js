/**
 * Ticket.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true
    },

    category: {
      type: 'string',
      required: true
    },

    status: {
      type: 'string',
      defaultsTo: 'open',
      isNotEmptyString: true,
      isIn: ['open', 'onHold', 'closed']
    },

    priority: {
      type: 'number',
      defaultsTo: 3
    },

    content: {
      type: 'string'
    },

    posts: {
      collection: 'post',
      via: 'ticket'
    },

    user: {
      model: 'user',
      required: true
    },

    team: {
      model: 'team',
      required: true
    }
  }
};

