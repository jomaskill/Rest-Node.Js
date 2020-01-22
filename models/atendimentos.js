const moment = require('moment');
const conexao = require('../infra/conexao')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        /////////Tratamento dos dados//////////////////
        //checando campos[boleanos]
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >=5

        //estrutura para cada campo
        const validacao = [
            {
                nome: 'data',
                valido: dataEhValida,
                menssagem: 'data deve ser no futuro'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                menssagem: 'cliente deve posuir pelo menos 5 caracteres'
            }
        ]

        const erros = validacao.filter(campo => !campo.valido)
        const existemErros = erros.length

        //caso haja erros, e menssagem é enviada
        if(existemErros) res.status(400).json(erros)
        else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) res.status(400).json(erro)
                else res.status(201.).json(resultados)
            })
        }

        
    }
}

module.exports = new Atendimento;