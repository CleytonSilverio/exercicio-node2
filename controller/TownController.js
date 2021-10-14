let mocks = require('../mocks');

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

const getAll = async (req, res) =>{
    var town = await mocks.Town.findAll();

    if (!town) {
        res.status(404).json({
            message: "Não existe nenhuma cidade cadastrada!",
        });
    }
    res.status(200).json(town);
}

const getTownById = async (req, res) => {
    var town = await mocks.Town.findByPk(req.params.id)

    if (!town) {
        res.status(404).json({
            message: `Não foi encontrado nenhuma cidade com o id: ${req.params.id}`,
        });
    }

    res.status(200).json(town);
};

const postCidade = (req, res) => {
    
    var data = req.body;

    if(!data.nome) {
        res.status(500).json({
            message: "Nome de cidade é obrigatório!",
        });
    }

    const resultadoCreate = mocks.Town.create({
        nome: data.nome,
    });

    res.status(200).json({
        message: `Cidade ${data.nome} criada com sucesso`,
    })

}

const patchCidade = async (req, res) => {

    var data = req.body;
    var town = await mocks.Town.findByPk(req.params.id);

    town.nome = data.nome;

    const resultadoUpdate = await town.save();

    res.status(200).json({
        message: `Cidade ${data.nome} atualizada!`,
    });

}

const deleteCidade = async (req, res) => {

    var town = await mocks.Town.findByPk(req.params.id);

    town.destroy();

    res.status(200).json({
        message: `Cidade ${town.nome} deleada`,
    });
}

module.exports = {
    getAll,
    getTownById,
    postCidade,
    patchCidade,
    deleteCidade,
};