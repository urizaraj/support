module.exports = {
  friendlyName: 'Logout',

  description: 'Log out of this app.',

  extendedDescription: `This action deletes the \`req.session.userId\` key from the session of the requesting user agent.
Actual garbage collection of session data depends on this app's session store, and
potentially also on the [TTL configuration](https://sailsjs.com/docs/reference/configuration/sails-config-session)
you provided for it.

Note that this action does not check to see whether or not the requesting user was
actually logged in.  (If they weren't, then this action is just a no-op.)`,

  exits: {
    success: {
      description: 'The requesting user agent has been successfully logged out.'
    }
  },

  fn: async function(inputs, exits) {
    // Clear the `userId` property from this session.
    delete this.req.session.userId

    return exits.success()
  }
}
