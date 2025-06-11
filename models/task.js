const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Task = sequelize.define('Task', { // o Sequelize por padrão pluraliza as tabelas e usa mínusculas - tasks
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    timestamps: false
});

module.exports = Task;