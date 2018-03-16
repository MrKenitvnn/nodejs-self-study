var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/all', function(req, res, next) {
    res.send([{id:1, text:"item 1"}, {id:2, text:"item 2"}, {id:3, text:"item 3"}]);
});

router.delete('/api/delete/:id', function (req, res) {
    res.status(400).send("Delete id : " + req.params.id);
});

module.exports = router;
