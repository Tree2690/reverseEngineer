'use strict';
// use strict - "cleans up javascript code"  = forces poor syntax practices to cause an error

var fs        = require('fs');
// brings in node modules "file save system"
var path      = require('path');
// brings in node module path, usage when joingin files or function
var Sequelize = require('sequelize');
//bring in node module sequelize, allows sequelize database
var basename  = path.basename(module.filename);
// dependent on the 'path' module system
var env       = process.env.NODE_ENV || 'development';
//brings in node module dot.env
//allows programmer to hide certain pieces of data, ex. API keys
var config    = require(__dirname + '/../config/config.json')[env];
//bring in config
var db        = {};
//creating an empty object for db

//setting up Sequelization
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
