const { DataTypes } = require('sequelize'); // tipos de dados do sequelize
const sequelize = require('../config/config'); // estância do sequelize

console.log(sequelize)

const User = sequelize.define('User', { // o Sequelize por padrão pluraliza as tabelas e usa mínusculas - users

    

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