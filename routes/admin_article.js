var express = require('express');
var router = express.Router();

// var marked = require('marked');
// var fs = require('fs');

var articleHandle = require('../controllers/articleHandle');

// GET admin article add page
// router.get('/article/add', function(req, res, next) {
//     fs.readFile('markdown/articles/hello-world.md', function(err, data) {
//         var html = marked(data.toString());
//         res.render('article', {
//             mdContent: html
//         });
//     });
// });

// GET article list page
router.get('/article', function(req, res, next) {
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        var userName = req.session.islogin.userName;
        res.locals.islogin = req.session.islogin;

        articleHandle.selectAll(req, res, next);
    } else {
        res.redirect('/user/login');
    }
});


// GET article add page
router.get('/article/add', function(req, res, next) {
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        var userName = req.session.islogin.userName;
        res.locals.islogin = req.session.islogin;
        res.render('backstage/admin_addArticle', {
            userName: userName
        });
    } else {
        res.redirect('/user/login');
    }
});

// POST article add page
router.post('/article/add', function(req, res, next) {
    articleHandle.add(req, res, next);
});

// DELETE article 
router.get('/delArticle', function(req, res, next) {
    articleHandle.delete(req, res, next);
});

module.exports = router;