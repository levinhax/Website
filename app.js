var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var ejs = require('ejs');
var markdown = require('markdown').markdown;

var index = require('./routes/index');
var blog = require('./routes/blog');
var project = require('./routes/project');
var photo = require('./routes/photo');
var users = require('./routes/users');
var admin = require('./routes/admin');
var adminArticle = require('./routes/admin_article');
var adminProject = require('./routes/admin_project');
var adminPhoto = require('./routes/admin_photo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'pug');
app.engine('html', ejs.__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser("website"));
app.use(session({
    secret: 'website',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/blog', blog);
app.use('/', project);
app.use('/', photo);
app.use('/user', users);
app.use('/admin', admin);
app.use('/admin', adminArticle);
app.use('/admin', adminProject);
app.use('/admin', adminPhoto);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;