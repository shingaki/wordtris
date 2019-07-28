module.exports = function(sequelize, DataTypes) {
    var HighestWords = sequelize.define("HighestWords", {
        // playerID: DataTypes.INTEGER,
        scorePosition: DataTypes.INTEGER,
        highestWord: DataTypes.STRING,
        score: DataTypes.INTEGER
    });

    // HighestWords.hasMany(Players);
    HighestWords.associate = function (models) {
        HighestWords.hasMany(models.Players, {
            onDelete: "cascade"
        });
    };


    return HighestWords;
};