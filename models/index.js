const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;

console.log(env);
console.log(config);
if (process.env.JAWSDB_URL) {
    console.log('YYYY');
  sequelize = new Sequelize(process.env.JAWSDB_URL, config);
} else {
    console.log('Connecting to DB');
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
    console.log('ASDF')
    console.log(model.name);
  }
);

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    console.log('ASDF2')
    console.log(modelName);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
