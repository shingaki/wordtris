module.exports = function(sequelize, DataTypes) {
    var HighestScores = sequelize.define("HighestScores", {
        playerID: DataTypes.INTEGER,
        scorePosition: DataTypes.INTEGER,
        highestScore: DataTypes.INTEGER
    });

    HighestScores.hasMany(Players);

    return HighestScores;
};