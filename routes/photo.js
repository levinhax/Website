var express = require('express');
var router = express.Router();

var photoHandle = require('../controllers/photoHandle');

// GET photo page
router.get('/photo', function(req, res, next) {
    photoHandle.showAll(req, res, next);
});

router.get('/photo/archive', function(req, res, next) {
    photoHandle.selectOrderByDate(req, res, next);
});

module.exports = router;