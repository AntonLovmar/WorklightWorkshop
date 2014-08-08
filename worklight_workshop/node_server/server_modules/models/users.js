module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define('Users', {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    }, {
        classMethods: {}
    });

    return Users;
};
