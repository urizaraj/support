/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'test@email.com'
    },

    password: {
      type: 'string',
      required: true,
      description:
        "Securely hashed representation of the user's login password.",
      protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },

    name: {
      type: 'string',
      required: true,
      description: "The user's name",
      maxLength: 120,
      example: 'Lebron4Ever'
    }
  }
}
