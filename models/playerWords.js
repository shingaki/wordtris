module.exports = function(sequelize, DataTypes) {
    var PlayerWords = sequelize.define("PlayerWords", {
        playerID: DataTypes.INTEGER,
        playerWord: DataTypes.STRING
    });

    return PlayerWords;
};