module.exports = function(sequelize, DataTypes) {
    var PlayerScores = sequelize.define("PlayerScores", {
        playerID: DataTypes.INTEGER,
        playerScore: DataTypes.INTEGER,

    });

    return PlayerScores;
};