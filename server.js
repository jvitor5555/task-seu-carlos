const app = require('./app');
const conectarNoBanco = require('./database/database');

const PORTA = process.env.PORTA || 8080

app.get('/teste', (req, resp) => { // Porque teste

    return resp.json({'Rodando': 'API no AR'})
})

conectarNoBanco()

app.listen(PORTA, () => {

    console.log(`Servidor rodando em http://localhost:${PORTA}`)

})