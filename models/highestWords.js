module.exports = function(sequelize, DataTypes) {
    var HighestWords = sequelize.define("HighestWords", {
        playerID: DataTypes.INTEGER,
        scorePosition: DataTypes.INTEGER,
        highestWord: DataTypes.STRING,
        score: DataTypes.INTEGER
    });

    HighestWords.hasMany(Players);


    return HighestWords;
};