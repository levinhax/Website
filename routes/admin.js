var express = require('express');
var router = express.Router();



var userHandle = require('../controllers/userHandle');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        var userName = req.session.islogin.userName;
        res.locals.islogin = req.session.islogin;
        res.render('backstage/admin_index', {
            userName: userName
        });
    } else {
        res.redirect('/user/login');
    }
});


// GET admin center page
router.get('/usercenter', function(req, res, next) {
    // 先判断用户是否已经登录
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        var user = req.session.islogin;
        res.locals.islogin = req.session.islogin;
        res.render('backstage/admin_usercenter', {
            userId: user.userId,
            userName: user.userName,
            userAvatar: user.userAvatar,
            userPass: user.userPass,
            userDate: user.userDate,
            userEmail: user.userEmail,
            userPlace: user.userPlace,
            userRole: user.userRole
        });

    } else {
        res.redirect('/user/login');
    }
});
// 更改头像
router.post('/usercenter/uploadAvatar', function(req, res, next) {
    userHandle.updateAvatar(req, res, next);
});

// GET admin explain page
router.get('/explain', function(req, res, next) {
    // 先判断用户是否已经登录
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        var userName = req.session.islogin.userName;
        res.locals.islogin = req.session.islogin;
        res.render('backstage/admin_explain', {
            userName: userName
        });
    } else {
        res.redirect('/user/login');
    }
});

module.exports = router;