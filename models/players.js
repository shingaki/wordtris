module.exports = function(sequelize, DataTypes) {
    var Players = sequelize.define("Players", {
        playerName: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING
    });

    Players.associate = function (models) {
        Players.hasMany(models.PlayerScores, {
            onDelete: "cascade"
        });
    };

    // Players.hasMany(PlayerScores);
    // PlayerScores.belongsTo(Players);

    Players.associate = function (models) {
        Players.hasMany(models.PlayerWords, {
            onDelete: "cascade"
        });
    };

    // Players.hasMany(PlayerWords);
    // PlayerWords.belongsTo(Players);

    return Players;
};