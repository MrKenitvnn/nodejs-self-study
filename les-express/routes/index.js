var express = require('express');
var bodyParser = require('body-parser');
var router  = express.Router();
var app     = express();

var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({extended: false});

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
var mongoose = require("mongoose");
var personController = require("../controller/person");

mongoose.connect("mongodb://kensource:kensource@ds157528.mlab.com:57528/nodedb");

router.route('/api/all').get(personController.getPeople);

router.route('/api/insert').post(personController.insertPerson);

router.route('/api/delete/:uid').get(personController.deletePerson);

router.route('/api/person/:uid').get(personController.getPerson);

module.exports = router;
