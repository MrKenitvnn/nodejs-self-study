// var Emitter = require ("./emitter"); // file  tự viết
var Emitter 	= require("events"); // sử dụng thư viện có sẵn
var eventConfig = require("./config").events;


var emitter = new Emitter();

emitter.on(eventConfig.BAD_SCORE, function () {
	console.log("Điểm kém nơi nhận thứ 1");
});

emitter.on(eventConfig.BAD_SCORE, function () {
	console.log("Nơi nhận điểm kém thứ 2");
});

// có bảng điểm
var scores = [10,4];

for (var s of scores) {
	if (s < 5) {
		console.log('phát thông báo', s);
		emitter.emit(eventConfig.BAD_SCORE); // phát sự kiện bad ra
	}
}

