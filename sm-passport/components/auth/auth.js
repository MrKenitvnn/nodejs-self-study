var express     = require('express');
var bodyParser  = require('body-parser');
var jwt         = require('jsonwebtoken');
var passport    = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'secretKey';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    var user = users[_.findIndex(users, {id: jwt_payload.id})];
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
passport.use(strategy);
var app = express();
app.use(passport.initialize());

var users = [
    {
        id: 1,
        name: 'kensource',
        password: '123123'
    },
    {
        id: 2,
        name: 'test',
        password: 'test'
    }
];

exports.login = function () {

};