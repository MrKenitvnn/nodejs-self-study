


### Sử dụng module có sẵn của nodejs

```javascript

var util = require("util");


var name = "Ken";
var message = util.format("Hello %s", name);

console.log(message);
util.log (message);

```