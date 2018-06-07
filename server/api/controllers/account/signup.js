module.exports = {
  friendlyName: 'Signup',

  description: 'Sign up for a new user account.',

  inputs: {
    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true,
      description:
        'The email address for the new account, e.g. test@email.com.',
      extendedDescription: 'Must be a valid email address.'
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'password123',
      description: 'The unencrypted password to use for the new account.'
    },

    name: {
      required: true,
      type: 'string',
      example: 'Lebron4Ever',
      description: `The user's name.`
    }
  },

  exits: {
    invalid: {
      responseType: 'badRequest',
      description:
        'The provided name, password and/or email address are invalid.'
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.'
    }
  },

  fn: async function(inputs, exits) {
    const newEmailAddress = inputs.emailAddress.toLowerCase()

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)

    const attributes = {
      name: inputs.name,
      emailAddress: newEmailAddress,
      password: await sails.helpers.passwords.hashPassword(inputs.password)
    }

    const newUserRecord = await User.create(attributes)
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({ name: 'UsageError' }, 'invalid')
      .fetch()

    // Store the user's new id in their session.
    this.req.session.userId = newUserRecord.id

    this.res.json(newUserRecord)

    // Since everything went ok, send our 200 response.
    return exits.success()
  }
}
