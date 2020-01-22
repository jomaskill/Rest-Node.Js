//Arquivos iniciais de qualquer projeto
const express = require('express');

const bodyParser = require('body-parser');
const consign = require('consign');

module.exports = () =>{
    const app = express();

    //código para capturar os dados por post
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    
    //faz rodar todos os arquivos na pasta 'controllers'
    consign().include('controllers').into(app);

    return app;
}

