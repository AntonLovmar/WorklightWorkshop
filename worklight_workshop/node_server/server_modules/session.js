var db = require('./models');

exports.login = function(req, res) {
    var name = req.param('username');
    var password = req.param('password');
    if (!(name && password)) {
        res.send({
            error: 'Required params are: "username" and "password"'
        });
        res.status(400).end();
        return;
    }
    db.Users.find({
        where: {
            name: name,
            password: password
        }
    }).success(onSearchSuccess).fail(onSearchFail);

    function onSearchSuccess(resultSet) {
        if (!resultSet) {
            onSearchFail();
            return;
        }
        var foundName = resultSet.dataValues.name;
        var foundPassword = resultSet.dataValues.password;
        if (foundName === name && foundPassword === password) {
            req.session.user = name;
            res.send({
                msg: 'Successfully logged in'
            });
            res.status(200).end();
        }
    }

    function onSearchFail() {
        res.send({
            error: 'Incorrect credentials'
        });
        res.status(401).end();
        return;
    }

};

exports.logout = function(req, res) {
    req.session.destroy();
    res.status(200).end();
};

exports.restrict = function(req, res, next) {
    if (req.session.user === undefined) {
        res.send(401).end();
    } else {
        next();
    }
};
