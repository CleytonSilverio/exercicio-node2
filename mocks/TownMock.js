const Sequelize = require('sequelize');
const database = require('../db');

const town = database.define('town', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = town;