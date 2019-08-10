module.exports = function(sequelize, DataTypes) {
    var PlayerWords = sequelize.define("PlayerWords", {
        // playerID: DataTypes.INTEGER,
        playerWord: DataTypes.STRING,
        wordPoints: DataTypes.INTEGER,
        playerWordRanking: DataTypes.INTEGER,
        letterBonus: DataTypes.TINYINT,
        wordBonus: DataTypes.TINYINT,

    });

    PlayerWords.associate = function (models) {
        PlayerWords.belongsTo(models.Players, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return PlayerWords;
};