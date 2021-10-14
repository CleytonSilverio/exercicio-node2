const express = require('express');
const pokemonController = require('../controller/PokemonController');

const router = express.Router();

router.get('/', pokemonController.getAll);
router.get('/:id', pokemonController.getPokemonById);
router.post('/', pokemonController.postPokemon);
router.patch('/:id', pokemonController.patchPokemon);
router.delete('/:id', pokemonController.deletePokemon);

module.exports = router;