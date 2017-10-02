var express = require('express');
var router = express.Router();

var projectHandle = require('../controllers/projectHandle');

// GET project list page
router.get('/project', function(req, res, next) {
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        var userName = req.session.islogin.userName;
        res.locals.islogin = req.session.islogin;

        projectHandle.selectAll(req, res, next);
    } else {
        res.redirect('/user/login');
    }
});


// GET project add page
router.get('/project/add', function(req, res, next) {
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        var userName = req.session.islogin.userName;
        res.locals.islogin = req.session.islogin;
        res.render('backstage/admin_addProject', {
            userName: userName
        });
    } else {
        res.redirect('/user/login');
    }
});

// POST project add page
router.post('/project/add', function(req, res, next) {
    projectHandle.add(req, res, next);
});

// DELETE project 
router.get('/delProject', function(req, res, next) {
    projectHandle.delete(req, res, next);
});

module.exports = router;