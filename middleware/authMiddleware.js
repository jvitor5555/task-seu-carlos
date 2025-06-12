const jwt = require('jsonwebtoken');
require('dotenv').config();

function autenticarToken(req, res, next) {

    const autHeader = req.headers['authorization'];

    const token = autHeader && autHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({erro: 'token não fornecido'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {

        if (err) {
            return res.status(401).json({ erro: 'Token inválido ou expirado' });
        }

        req.usuario = usuario

        next()
    })
}

module.exports = autenticarToken