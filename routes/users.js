var express = require('express');
var router = express.Router();

var userHandle = require('../controllers/userHandle');

/* GET register page */
router.get('/register', function(req, res, next) {
    res.render('backstage/register.html');
});

// POST register page
router.post('/checkName', function(req, res, next) {
    userHandle.selectByName(req, res, next);
});
router.post('/checkEmail', function(req, res, next) {
    userHandle.selectByEmail(req, res, next);
});
router.post('/register', function(req, res, next) {
    userHandle.register(req, res, next);
});

// GET login page
router.get('/login', function(req, res, next) {
    res.render('backstage/login');
});

// POST login 
router.post('/login', function(req, res, next) {
    userHandle.login(req, res, next);
});

module.exports = router;