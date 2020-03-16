let express = require('express');
let router = express.Router();
let {check, validationResult} = require('express-validator');
let User = require('../models/users');

let sid = null;

// middleware function to check for logged-in users
let sessionChecker = (req, res, next) => {
  console.log(JSON.stringify(req.session));
  console.log(JSON.stringify(req.cookies));
  if (req.session.user === sid && req.cookies.user_sid) {
    res.redirect('/');
  } else {
    next();
  }
};

/* GET home page. */
router.get('/', function (req, res) {
  console.log(JSON.stringify(req.session));
  console.log(JSON.stringify(req.cookies));
  if (req.session.user && req.cookies.user_sid) {
    res.render('index', {title: 'Poon', username: "Cu Hung ahihi", notification: 'Beta server'});
  } else {
    res.redirect('/sign-in');
  }
});

// GET login page
router.get('/sign-in', sessionChecker, function (req, res) {
  res.render('login',
    {
      title: 'Poon',
      username: "Cu Hung ahihi",
      notify: 'Beta server',
      errors: req.session.errors,
      login: req.session.login
    });
  req.session.errors = null;
});

router.post('/sign-in', [
    check(['username', 'pass'], 'Username or password is invalid').isLength({min: 4, max: 30})
  ],
  function (req, res) {
    let errs = validationResult(req);

    console.log(req.body.username + req.body.pass);

    if (errs.errors.length > 0) {
      req.session.errors = errs.errors;
      res.redirect('/sign-in');
    } else {
      let username = req.body.username;
      let pass = req.body.pass;

      let user = User.findOneUser(username);
      if (!user) {
        res.redirect('/sign-in');
      } else if (!user.validPassword(pass)) {
        res.redirect('/sign-in');
      } else {
        sid = user.dataValues();
        req.session.user = sid;
        res.redirect('/');
      }
    }
  });

// route for user logout
router.get('/sign-out', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
  }
  res.redirect('/sign-in');
});

router.get('/sign-up', sessionChecker, function (req, res) {
  res.render('sign_up', {
    title: 'Poon sign up',
    notify: 'Beta server',
    errors: req.session.errors,
    login: req.session.login
  });
  req.session.errors = null;
});

router.post('/sign-up', [
    check(['username', 'pass', 'confirmPass'], 'Username or password is invalid').isLength({min: 4, max: 30}),
    check('email', 'Email invalid').isEmail(),
    check('pass', 'Password does not matched').custom((value, {req}) => {
      return value === req.body.confirmPass;
    })
  ], function (req, res) {
    let errs = validationResult(req);
    if (errs.errors.length > 0) {
      req.session.errors = errs.errors;
      res.redirect('/sign-up');
    } else {
      let username = req.body.username;
      let email = req.body.email;
      let pass = req.body.pass;

      let user = User.findOneUser(username);
      if (!user) {
        User.createOneUser(username, email, pass, true);
        res.redirect('/sign-in')
      } else {
        req.session.errors = {user_exist: true};
        res.redirect('/sign-up');
      }
    }
  }
);

module.exports = router;
