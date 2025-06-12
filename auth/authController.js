const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.register = async (req, res) => {

    try {
        
        let { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Dados inválidos' })
        }

        const existe = await consultarUserEmail(email);

        if (existe) {
            return res.json({ error: 'Usuário já cadastrado' })
        }

        let passwordHash = await bcrypt.hash(password, 10);

        password = passwordHash
        username = username.toLowerCase()

        await User.create({
            username,
            email,
            password
        })

        return res.status(201).json({ message: 'Usuário cadastrado com Sucesso' })

    } catch (error) {
        console.error('Erro no registro:', error);
        return res.status(500).json({ error: 'Erro interno ao registrar o usuário' });
    }
}


exports.login = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password || "") {
            return res.status(400).json({ error: 'Dados obrigatórios' })
        }

        const usuario = await consultarUserEmail(email);

        if (!usuario) {
            return res.status(401).json({ error: 'Usuário ou senha inválidos' })
        }

        const senhaCorreta = await bcrypt.compare(password, usuario.password)

        if (senhaCorreta) {
            
            const token = gerarJWT(usuario.id, usuario.email)

            return res.status(200).json({
                message: "Login realizado com sucesso",
                token: token,
                user: {
                    id: usuario.id,
                    email: usuario.email,
                    nome: usuario.username 
                }
            })
        }

        else {
            return res.status(401).json({acesso_negado: 'Usuário ou senha incorretos'})
        }
        
        
    } catch (error) {
        
        console.error('Erro no login:', error);
        return res.status(500).json({ error: 'Erro interno ao logar o usuário' });
    }

}

function gerarJWT(id, email) {

    const token = jwt.sign(
        { id: id, email: email },
        process.env.JWT_SECRET,
        {expiresIn:process.env.TIME_EXPIRE}
    )

    return token
}


async function consultarUserEmail(email) {
    
    const usuario = await User.findOne({

        where: {
            email: email
        }
    });

    if (usuario) return usuario;
    else return null;
}