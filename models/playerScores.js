module.exports = function(sequelize, DataTypes) {
    var PlayerScores = sequelize.define("PlayerScores", {
        // playerID: DataTypes.INTEGER,
        playerScore: DataTypes.INTEGER,
        playerScoreRanking: DataTypes.INTEGER,

    });

    PlayerScores.associate = function (models) {
        PlayerScores.belongsTo(models.Players, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return PlayerScores;
};