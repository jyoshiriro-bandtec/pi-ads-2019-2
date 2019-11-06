var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;

/* Recuperar usuário por login e senha */
router.post('/autenticar', function(req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login	
	
	let instrucaoSql = `select * from usuario where login='${login}' and senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			res.json(resultado);
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}

	});	
});

/* Cadastrar usuário */
router.post('/', function(req, res, next) {
	console.log('Criando um usuário');
	
	Usuario.create({
		nome : req.body.nome,
		login : req.body.login,
		senha: req.body.senha
	}).then(function (resultado) {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(function (erro) {
		res.status(500).send(`Erro ao tentar criar usuário! ${erro}`);
	});
});


/* Recuperar todos os usuários */
router.get('/', function(req, res, next) {
	console.log('Recuperando todos os usuários');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	});	
});

module.exports = router;
