var express 		= require('express');
var path 			= require('path');
var cookieParser 	= require('cookie-parser');
var logger 		 	= require('morgan');
const exphbs 		= require('express-handlebars');
const methodOverride = require('method-override');
const redis 	 	= require('redis');
const bodyParser 	= require('body-parser');

// create redis client
let client = redis.createClient();
client.on('connect', function() {
	console.log('connected to redis');
});

var app = express();
const PORT = 3000;

// view engine
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// method override
app.use(methodOverride('_method'));


app.get('/', function (req, res, next) {
    res.render('searchusers');
});


// search process
app.post('/user/search', function (req, res, next) {
	let id = req.body.id;

	client.hgetall(id, function(err, obj) {
		if (!obj) {
			res.render('searchusers', {
				error: 'User does not exists'
			});
		} else {
			obj.id = id;
			res.render('details', {
				user: obj
			});
		}
	});

});

// add user page
app.get('/user/add', function (req, res, next) {
    res.render('adduser');
});

// Process add user page
app.post('/user/add', function (req, res, next) {
	let id = req.body.id;
	let firstName = req.body.firstName;
	let lastName = req.body.lastName;

	client.hmset(id, [
		'first_name', firstName,
		'last_name', lastName
	], function (err, reply) {
		console.log(reply);
		if (err) {
			console.log(err);
		}
		res.redirect('/');
	});
});

// delete user
app.delete('/user/delete/:id', function(req, res, next){
	client.del(req.params.id, function (err) {
		if (err) {
			console.log(err);
		}
		res.redirect('/');
	});
})


app.listen(PORT, function () {
    console.log('server run on port ' + PORT);
});


