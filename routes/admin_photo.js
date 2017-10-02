var express = require('express');
var router = express.Router();

var photoHandle = require('../controllers/photoHandle');


// GET photo list page
router.get('/photo', function(req, res, next) {
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        var userName = req.session.islogin.userName;
        res.locals.islogin = req.session.islogin;

        photoHandle.selectAll(req, res, next);
    } else {
        res.redirect('/user/login');
    }
});


// GET photo add page
router.get('/photo/add', function(req, res, next) {
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        var userName = req.session.islogin.userName;
        res.locals.islogin = req.session.islogin;
        res.render('backstage/admin_addPhoto', {
            userName: userName
        });
    } else {
        res.redirect('/user/login');
    }
});

// POST photo add page
router.post('/photo/add', function(req, res, next) {
    photoHandle.add(req, res, next);
});

// DELETE article 
router.get('/delPhoto', function(req, res, next) {
    photoHandle.delete(req, res, next);
});

module.exports = router;