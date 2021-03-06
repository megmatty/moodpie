const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {basicStrategy, jwtStrategy} = require('./strategies');

const router = express.Router();

const jsonParser = bodyParser.json();

const EntryController = require('./entries');
const UsersController = require('./users');
const AuthController = require('./auth');
const VariablesController = require('./variables');

//Register User
router.post('/register', jsonParser, UsersController.register);

//Login User
router.post('/login', passport.authenticate('basic', {session: false}), AuthController.login);

//Refresh Token
router.post('/refresh', passport.authenticate('jwt', {session: false}), AuthController.refresh);

//Add Entry
router.post('/add', [passport.authenticate('jwt', {session: false}), jsonParser],UsersController.addEntry);

// Dashboard
 router.get('/dashboard', [passport.authenticate('jwt', {session: false}), jsonParser],EntryController.findAllEntries);

//Profile
  router.get('/profile', [passport.authenticate('jwt', {session: false}), jsonParser],EntryController.findUserEntries);

//Get Moods
	router.get('/moods', VariablesController.getMoods);

//Get Activities
	router.get('/activities', VariablesController.getActivities);




module.exports = {router, basicStrategy, jwtStrategy};