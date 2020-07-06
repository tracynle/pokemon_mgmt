module.exports = function(sequelize, DataTypes) {
    let Trainer = sequelize.define("Trainer", {
      // Giving the Trainer model a name of type STRING
      name: {type: DataTypes.STRING, primaryKey: true},
      pokemon_owned: DataTypes.STRING
    });
  
    return Trainer;
  };
  