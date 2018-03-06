
### Querystring & Post parameters

```javascript

// Querystring
url: http://website.com/api/post?yourparam=value
param = req.query.yourparam;

//application/x-www-form-urlencoded
var BodyParser = require('body-parser');
var urlencodedParser = BodyParser.urlencoded({extended: false});

api.post("/login", urlencodedParser, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    
    console.log(`User data: ${username}`);
});

//application/json
var jsonParser = BodyParser.json();
api.post("/loginjson", jsonParser, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    
    console.log(`User data: ${username}`);
});


```


### Mysql


### Mongodb & Mongoose




