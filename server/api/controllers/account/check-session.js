module.exports = {
  friendlyName: 'Check Session',

  description: 'Check the user session.',

  exits: {
    success: {
      description: 'The requesting user agent has been successfully logged in.'
    },

    notLoggedIn: {
      description: 'Requesting user is not logged in, which is also fine',
      responseType: 'unauthorized'
    }
  },

  fn: async function(inputs, exits) {
    if (this.req.session.userId) {
      const userRecord = await User.findOne({ id: this.req.session.userId })

      this.res.json(userRecord)
      return exits.success()
    } else {
      // return exits.notLoggedIn()
      return exits.notLoggedIn()
    }
  }
}
