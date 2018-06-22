import bluebird from 'bluebird'
import bodyParser from 'body-parser'
import compression from 'compression' // compresses requests
import mongo from 'connect-mongo'
import dotenv from 'dotenv'
import express from 'express'
import flash from 'express-flash'
import session from 'express-session'
import expressValidator from 'express-validator'
import lusca from 'lusca'
import mongoose from 'mongoose'
import passport from 'passport'
import path from 'path'
import * as passportConfig from './config/passport'
import * as apiController from './controllers/api'
import * as contactController from './controllers/contact'
import * as homeController from './controllers/home'
import * as userController from './controllers/user'
import * as ticketController from './controllers/ticket'
import * as teamController from './controllers/team'
import * as postController from './controllers/post'
import { MONGODB_URI, SESSION_SECRET } from './util/secrets'

const MongoStore = mongo(session)

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' })

// Create Express server
const app = express()

// Connect to MongoDB
const mongoUrl = MONGODB_URI

mongoose.Promise = bluebird

mongoose
  .connect(
    mongoUrl,
    { useMongoClient: true }
  )
  .catch(err =>
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
  )

//#region Express configuration
app.set('port', process.env.PORT || 1337)
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      url: mongoUrl,
      autoReconnect: true
    })
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (
    !req.user &&
    req.path !== '/login' &&
    req.path !== '/signup' &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)
  ) {
    req.session.returnTo = req.path
  } else if (req.user && req.path == '/account') {
    req.session.returnTo = req.path
  }
  next()
})

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
//#endregion

/**
 * Primary app routes.
 */
app.post('/login', userController.postLogin)
app.get('/logout', userController.logout)
app.get('/forgot', userController.getForgot)
app.post('/forgot', userController.postForgot)
app.get('/reset/:token', userController.getReset)
app.post('/reset/:token', userController.postReset)
app.get('/signup', userController.getSignup)
app.post('/signup', userController.postSignup)
app.get('/contact', contactController.getContact)
app.post('/contact', contactController.postContact)
app.get('/account', passportConfig.isAuthenticated, userController.getAccount)
app.post(
  '/account/profile',
  passportConfig.isAuthenticated,
  userController.postUpdateProfile
)
app.post(
  '/account/password',
  passportConfig.isAuthenticated,
  userController.postUpdatePassword
)
app.post(
  '/account/delete',
  passportConfig.isAuthenticated,
  userController.postDeleteAccount
)
app.get(
  '/account/unlink/:provider',
  passportConfig.isAuthenticated,
  userController.getOauthUnlink
)

app.get('/ticket', ticketController.getTickets)
app.get('/ticket/:id', ticketController.getTicket)
app.post('/ticket', ticketController.postTicket)

app.get('/team', teamController.getTeams)
app.post('/team', teamController.createTeam)

app.post('/post', postController.createPost)

// /**
//  * API examples routes.
//  */
// app.get('/api', apiController.getApi)
// app.get(
//   '/api/facebook',
//   passportConfig.isAuthenticated,
//   passportConfig.isAuthorized,
//   apiController.getFacebook
// )

/**
 * OAuth authentication routes. (Sign in)
 */
// app.get(
// '/auth/facebook',
//   passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
// )
// app.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect(req.session.returnTo || '/')
//   }
// )

export default app
