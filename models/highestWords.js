module.exports = function(sequelize, DataTypes) {
    var HighestWords = sequelize.define("HighestWords", {
        // playerID: DataTypes.INTEGER,
        scorePosition: DataTypes.INTEGER,
        highestWord: DataTypes.STRING,
        score: DataTypes.INTEGER,
        letterBonus: DataTypes.TINYINT,
        wordBonus: DataTypes.TINYINT

    });

    HighestWords.associate = function (models) {
        HighestWords.belongsTo(models.Players, {
            foreignKey: {
                allowNull: false
            }
        });
    };


    return HighestWords;
};