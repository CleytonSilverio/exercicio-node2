let mocks = require('../mocks');
var winston = require('winston');

(async () => {
    const database = require('../db');
    const Town = require('../mocks/TownMock')

    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();

const getAll = async (req, res) => {
    var town = await mocks.towns.findAll();

    if (!town) {
        res.status(404).json({
            message: "Não existe nenhuma cidade cadastrada!",
        });
    }

    winston.log('info', `Busca por todas as cidades realizada as ${Date.now()}`);
    res.status(200).json(town);
}

const getTownById = async (req, res) => {
    var town = await mocks.towns.findByPk(req.params.id)

    if (!town) {
        res.status(404).json({
            message: `Não foi encontrado nenhuma cidade com o id: ${req.params.id}`,
        });
    }

    winston.log('info', `Busca por uma cidade realizada as ${Date.getHour()}`);
    res.status(200).json(town);
};

const postCidade = (req, res) => {

    var data = req.body;

    if (!data.nome) {
        res.status(500).json({
            message: "Nome de cidade é obrigatório!",
        });
    }

    const resultadoCreate = mocks.towns.create({
        nome: data.nome,
    });

    winston.log('info', `Cidade criada as ${Date.now()}`);
    res.status(200).json({
        message: `Cidade ${data.nome} criada com sucesso.`,
    })

}

const patchCidade = async (req, res) => {

    var data = req.body;
    var town = await mocks.towns.findByPk(req.params.id);

    town.nome = data.nome;

    const resultadoUpdate = await town.save();

    winston.log('info', `Cidade atualizada as ${Date.now()}`);
    res.status(200).json({
        message: `Cidade ${data.nome} atualizada!`,
    });

}

const deleteCidade = async (req, res) => {

    var town = await mocks.towns.findByPk(req.params.id);

    town.destroy();

    winston.log('info', 'Cidade deletada.', Date.getHour());
    res.status(200).json({
        message: `Cidade ${town.nome} deleada`,
    });
}

winston.configure({
    transports: [
        new (winston.transports.File)({ filename: 'arquivolog.log' })
    ]
});

module.exports = {
    getAll,
    getTownById,
    postCidade,
    patchCidade,
    deleteCidade,
};