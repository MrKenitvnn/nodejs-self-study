var mongoose    = require('mongoose');

var PersonSchema = new mongoose.Schema({
    fullName: String,
    age: String
});


module.exports = mongoose.model('Person', PersonSchema);