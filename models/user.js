const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const User = sequelize.define('User', {

    

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    username:{
        type: DataTypes.STRING,
        allowNull:false,
    },

    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate: {
            isEmail: true, // valida que é um email
        }
    },

    password:{
        type: DataTypes.STRING,
        allowNull:false,
    },

    ativo:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },

}, {
    timestamps: false // evita a criação automatica de campos
});

module.exports = User;