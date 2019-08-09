module.exports = function(sequelize, DataTypes) {
    let Pokemon = sequelize.define("Pokemon", {
      name: DataTypes.STRING,
      move: DataTypes.STRING,
      type: DataTypes.STRING
    });

    return Pokemon;
  };
  