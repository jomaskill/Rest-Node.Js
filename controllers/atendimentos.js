const Atendimento = require('../models/atendimentos')

module.exports = app => {

    //seleciona a tabela inteira
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res);
    })

    //adiciona na tabela
    app.post('/atendimentos', (req, res) => {
       const atendimento = req.body

        Atendimento.adiciona(atendimento, res)
    })


    //selecionar um item
    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id) //convertendo para int

        Atendimento.buscaPorId(res, id)
    })

}