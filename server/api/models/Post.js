/**
 * Post.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    content: {
      type: 'string',
      required: true
    },

    category: {
      type: 'string',
      isIn: ['post', 'resolution'],
      defaultsTo: 'post'
    },

    ticket: {
      model: 'ticket',
      required: true
    },

    user: {
      model: 'user',
      required: true
    }
  }
}
