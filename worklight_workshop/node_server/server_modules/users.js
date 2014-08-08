var db = require('./models');

exports.add = function(req, res) {
    var name = req.param('username');
    var password = req.param('password');
    if (!(name && password)) {
        res.send({
            error: 'Required params are: "username" and "password"'
        });
        res.status(400).end();
        return;
    }
    db.Users.create({
        name: name,
        password: password
    }).success(onUserAdded).fail(onAddFailed);

    function onUserAdded(resultSet) {
        res.status(201).end();
    }

    function onAddFailed(error) {
        res.send(400, error).end();
    }
};
