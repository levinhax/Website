var express = require('express');
var router = express.Router();

var blogHandle = require('../controllers/blogHandle');
var userHandle = require('../controllers/userHandle');

// blog home page
router.get('/', function(req, res, next) {
    // res.render('blog');
    blogHandle.select(req, res, next);
});

// blog archives
router.get('/archives', function(req, res, next) {
    blogHandle.selectOrderByDate(req, res, next);
});

// blog tags
router.get('/tags', function(req, res, next) {
    blogHandle.selectByTag(req, res, next);
});

router.get('/tags/:tagName', function(req, res, next) {
    blogHandle.selectByTagOrderByDate(req, res, next);
})

// 登录注册
router.get('/login', function(req, res, next) {
    res.render('blogs/blog_login');
});

// POST login 
router.post('/login', function(req, res, next) {
    userHandle.blogLogin(req, res, next);
});


// 文章详情
router.get('/details/:blogId', function(req, res, next) {
    blogHandle.selectById(req, res, next);
});



module.exports = router;