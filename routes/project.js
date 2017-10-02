var express = require('express');
var router = express.Router();

var projectHandle = require('../controllers/projectHandle');

// GET project page
router.get('/project', function(req, res, next) {
    projectHandle.showAll(req, res, next);
});

module.exports = router;