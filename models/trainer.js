module.exports = function(sequelize, DataTypes) {
    let Trainer = sequelize.define("Trainer", {
      // Giving the Trainer model a name of type STRING
      name: DataTypes.STRING,
      pokemon_owned: DataTypes.STRING
    });
  
    return Trainer;
  };
  