const sequelize = require('../config/config');
const User = require('../models/user');
const Task = require('../models/task');

const conectarNoBanco = async () => {
    try {
        await sequelize.authenticate(); // Agora você espera a resposta
        console.log("Conexão realizada com Sucesso");

        await sequelize.sync();
        console.log("Tabelas criadas com Sucesso");


    } catch (error) {
        console.error("Erro ao conectar ou sincronizar com o banco de dados:", error);
    }
};

module.exports = conectarNoBanco;
