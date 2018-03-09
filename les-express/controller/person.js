var Person = require("../model/person");

// endpoint /api/people
exports.getPeople = function (req, res) {
    Person.find(function (err, data) {
        if (err)
            return res.send(err);

        res.json(data);
    });
};

// endpoint /api/person
exports.getPerson = function (req, res) {
    Person.find({_id : req.params.uid}).then(function (person) {
        if (person.length > 0)
            res.send(JSON.stringify(person));
        else
            res.send("Không tìm thấy");
    }).catch(function (err) {
        res.send(err);
    });
};

// endpoint /api/insert
exports.insertPerson = function (req, res) {
    var person = new Person();
    person.fullName = req.body.fullName || null;
    person.age      = req.body.age;

    person.save(function (err) {
        if (err)
            return res.send(err);

        res.json({ message: 'Person added', data: person });
    });
};


// endpoint /api/delete
exports.deletePerson = function (req, res) {
    Person.remove({_id : req.params.uid}).then( function () {
        res.send("Deleted");
    }).catch(function (err) {
        res.send(err);
    });
};


