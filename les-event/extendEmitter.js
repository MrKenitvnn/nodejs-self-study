var EventEmitter    = require ("events");
var Util            = require ("util");
var ConfigUtil      = require("./config").events;


function Dialog() {
    this.message = "Hello";
}

Util.inherits(Dialog, EventEmitter);

Dialog.prototype.sayHello = function (data) {
    console.log(this.message, data);
    this.emit(ConfigUtil.HELLO, "Dữ liệu truyền vào event emitter");
}

var dialog = new Dialog();

dialog.on(ConfigUtil.HELLO, function (data) {
    console.log("Có thông báo mới", data);
});

dialog.sayHello("Gọi hàm và truyền dữ liệu");

