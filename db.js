const Sequelize = require('sequelize');
const sequelize = new Sequelize('pokemon', 'root', '', {dialect: 'mysql', host: 'localhost'});
 
module.exports = sequelize;