### IDE Webstorm
Active: http://jetbrains.license.laucyun.com or http://45.77.127.87:81;


#### Module 

Khi tạo ra module thì dùng ```module.exports```
Khi gọi một module thì dùng ```require```

Tạo file ```module hello.js```

```javascript
	
var sayHello = function () {
	console.log('hello module');
}

module.exports = sayHello;
```

Sử dụng module trong file khác

```javascript

var helloModule = require('./hello.js');

helloModule(); // nhu nay la goi dc roi

```


### Require


### call & apply









### OOP


Trong js đối tượng được tạo trực tiếp,

Object là một tập hợp các cặp Name/Value

Khai báo object trong javascript sử dụng kiểu json

vi du
```java
var person = {
	firstName: "Hang",
	lastName: "Linh",
	sayHello: function () {
		console.log("Hello, " + this.firstName);
	}
}

```

Truy cập đến thuộc tính trực tiếp từ đối tượng: ```person.firstName hoặc person["firstName"]```


Scope
































