var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(`cookie: ${JSON.stringify(req.cookies)}`);
  res.render('index', { data: 'Đây là dữ liệu gửi từ route' });
});

router.get('/user/:name', function (req, res) {
   res.cookie("username", req.params.name);
   res.send(`hi ${req.params.name}`);
});


/********************************************************************************
 * mysql
 */
var mysql       = require('mysql');
var pool        = mysql.createPool({
    connectionLimit : 2, // default = 10
    host            : 'localhost',
    user            : 'root',
    password        : 'kensource',
    database        : 'fbtool'
});

router.get('/mysql', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM tblcomment LIMIT 20 OFFSET 100", function (err, rows) {
            connection.release();
            if (err) throw err;

            console.log(rows.length);
            res.send(JSON.stringify(rows));
        });
    });
});

pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});

pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1')
});

pool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});


/********************************************************************************
 * mongodb
 */
var mongooes    = require('mongoose');
mongooes.connect("mongodb://kensource:kensource@ds157528.mlab.com:57528/nodedb");
var Schema      = mongooes.Schema;

var personSchema = new Schema({
    fullName: String,
    age: String
});
var Person  = mongooes.model("Person", personSchema, 'test2');
// test2 là tên Collection

router.get('/mongo/insert', function (req, res) {

    // create object
    var person = Person ({
        fullName: "Nguyen Y",
        age: 20
    });

    person.save(function (err, ) {
        if (err) throw  err;
        console.log("Document inserted");
        res.send(JSON.stringify(person));
    });
});

router.get('/mongo/all', function (req, res) {
    Person.find({}, function (err, data) {
        res.send(data);
    });
});


module.exports = router;
