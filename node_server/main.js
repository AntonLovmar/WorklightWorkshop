var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var connect = require('connect');
var session = require('express-session'),
    RedisStore = require('connect-redis')(session);


app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: true,
    store: new RedisStore(),
    secret: 'wefqwpoefmp34ot23153t134t134t3g3dmve'
}));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public_html'));

var db = require('./server_modules/models');
var posts = require('./server_modules/posts');
var users = require('./server_modules/users');
var session = require('./server_modules/session');


app.get('/posts', session.restrict, posts.get);
app.put('/posts', session.restrict, posts.add);

app.put('/users', users.add);

app.post('/session', session.login);
app.delete('/session', session.logout);

db.sequelize.sync();
var httpServer = http.createServer(app);

httpServer.listen(8080);
