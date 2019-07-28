module.exports = function(sequelize, DataTypes) {
    var Players = sequelize.define("Players", {
        playerName: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING
    });

    Players.hasMany(PlayerScores);
    PlayerScores.belongsTo(Players);

    Players.hasMany(PlayerWords);
    PlayerWords.belongsTo(Players);

    return Players;
};