module.exports = function(sequelize, DataTypes) {
    var PlayerWords = sequelize.define("PlayerWords", {
        // playerID: DataTypes.INTEGER,
        playerWord: DataTypes.STRING
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