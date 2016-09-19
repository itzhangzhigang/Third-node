var express = require('express');

var path = require('path');

var logger = require('morgan');

var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var session    = require('express-session');
//handlebars模板引擎的支持
var hbs  = require('express3-handlebars');

var index = require('./routes/index');
//通过这个中间件向模板引擎传值
var flash = require('connect-flash');


var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(flash());

app.engine('.hbs', hbs({
    extname: '.hbs',
    defaultLayout:'main',
    // helpers: {
    //     foo: function () { return 'FOO!'; },
    //     bar: function () { return 'BAR!'; }
    // }

}));

app.set('view engine', '.hbs');

app.use(session({
    secret: 'itcast-third',
    name: 'itcast-third',
    cookie: {maxAge: 800000000000},
    resave: false,//每次请求都重新设置session cookie
    saveUninitialized: true//每次请求都设置个session cookie
}));

app.use(function(req, res, next){
    res.locals.user = req.session.user;

    var error = req.flash('error');
    res.locals.error = error.length ? error : null;

    var success = req.flash('success');
    res.locals.success = success.length ? success : null;
    next();
});

app.use('/', index);

//app.use('/users', users);
app.listen(3000);

module.exports = app;
