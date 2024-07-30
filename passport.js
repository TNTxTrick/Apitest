// passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const fs = require('fs-extra');
const path = require('path');

// Load user data
const usersPath = path.join(__dirname, 'public', 'users.json');
let users = JSON.parse(fs.readFileSync(usersPath, { encoding: 'utf-8' }));

passport.use(new LocalStrategy(
  function(username, password, done) {
    const user = users.find(user => user.username === username);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    bcrypt.compare(password, user.password, function(err, res) {
      if (err) return done(err);
      if (res) return done(null, user);
      else return done(null, false, { message: 'Incorrect password.' });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  const user = users.find(user => user.username === username);
  done(null, user);
});
