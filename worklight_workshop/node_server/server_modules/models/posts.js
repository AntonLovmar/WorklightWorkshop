module.exports = function(sequelize, DataTypes) {
    var Posts = sequelize.define('Posts', {
        content: DataTypes.STRING,
        author: DataTypes.STRING,
        title: DataTypes.STRING
    }, {
        classMethods: {}
    });

    return Posts;
};
