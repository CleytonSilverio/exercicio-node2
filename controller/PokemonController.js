let mocks = require('../mocks');
var winston = require('winston');

(async () => {
    const database = require('../db');
    const Pokemon = require('../mocks/PokemonMock')
    
    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();

const getAll = async (req, res) =>{
    var pokemon = await mocks.pokemons.findAll();

    if (!pokemon) {
        res.status(404).json({
            message: "Não existe nenhum pokemon cadastrado!",
        });
    }
    console.log(pokemon);
    res.status(200).json(pokemon);
}

const getPokemonById = async (req, res) => {
    var pokemon = await mocks.pokemons.findByPk(req.params.id)

    if (!pokemon) {
        res.status(404).json({
            message: `Não foi encontrado nenhum pokemon com o id: ${req.params.id}`,
        });
    }

    res.status(200).json(pokemon);
};

const postPokemon = (req, res) => {
    
    var data = req.body;

    if(!data.nome) {
        res.status(500).json({
            message: "Nome de pokemon é obrigatório!",
        });
    }

    const resultadoCreate = mocks.pokemons.create({
        nome: data.nome,
    });

    res.status(200).json({
        message: `Pokemon ${data.nome} criado com sucesso`,
    })

}

const patchPokemon = async (req, res) => {

    var data = req.body;
    var pokemon = await mocks.pokemons.findByPk(req.params.id);

    pokemon.nome = data.nome;

    const resultadoUpdate = await pokemon.save();

    res.status(200).json({
        message: `Pokemon ${data.nome} atualizado!`,
    });

}

const deletePokemon = async (req, res) => {

    var pokemon = await mocks.pokemons.findByPk(req.params.id);

    pokemon.destroy();

    res.status(200).json({
        message: `Pokemon ${pokemon.nome} deleado`,
    });
}

winston.configure({
    transports: [
        new (winston.transports.File)({ filename: 'arquivolog.log' })
    ]
});

module.exports = {
    getAll,
    getPokemonById,
    postPokemon,
    patchPokemon,
    deletePokemon,
};