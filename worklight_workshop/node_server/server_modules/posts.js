var db = require('./models');

exports.get = function(req, res) {
    db.Posts.findAll().success(onPostsFound).fail(onSearchFailed);

    function onPostsFound(resultSet) {
        var posts = [];
        for (var i = 0; i < resultSet.length; i++) {
            var data = resultSet[i].dataValues;
            posts.push({
                title: data.title,
                author: data.author,
                content: data.content,
                created: data.createdAt
            });
        }
        res.send({
            posts: posts
        });
        res.status(200).end();
    }

    function onSearchFailed(error) {
        res.status(404).end();
    }
};

exports.add = function(req, res) {
    var title = req.param('title');
    var name = req.session.user || 'unknown';
    var content = req.param('content');
    if (!(title && name && content)) {
        res.send({
            error: 'Required params are: "title" and "content"'
        });
        res.status(400).end();
        return;
    }

    db.Posts.create({
        title: title,
        author: name,
        content: content
    }).success(onPostAdded).fail(onAddFailed);

    function onPostAdded(resultSet) {
        res.status(201).end();
    }

    function onAddFailed(error) {
        res.send(error);
        res.status(404).end();
    }
};
