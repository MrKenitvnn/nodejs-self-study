var express = require('express');
var router  = express.Router();
var _       = require("lodash");
var bodyParser  = require('body-parser');
var jwt         = require('jsonwebtoken');
var passport    = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'secretKey';
var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    var user = users[_.findIndex(users, {id: jwt_payload.id})];
    console.log(`strategy find user ${JSON.stringify(user)}`);
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


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/login", function(req, res) {
    if(req.body.name && req.body.password){
        var name = req.body.name;
        var password = req.body.password;
    }
    // usually this would be a database call:
    var user = users[_.findIndex(users, {name: name})];
    if( ! user ){
        res.status(401).json({message:"no such user found"});
        return;
    }

    if(user.password === req.body.password) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        var payload = {id: user.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message: "ok", token: token});
    } else {
        res.status(401).json({message:"passwords did not match"});
    }
});


router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
    res.json({message: "Success! You can not see this without a token"});
});

router.get("/secretDebug",
    function(req, res, next){
        console.log(req.get('Authorization'));
        next();
    }, function(req, res){
        res.json("debugging");
    });


module.exports = router;
