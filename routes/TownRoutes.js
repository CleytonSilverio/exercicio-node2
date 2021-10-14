const express = require('express');
const townController = require('../controller/TownController');

const router = express.Router();

router.get('/', townController.getAll);
router.get('/:id', townController.getTownById);
router.post('/', townController.postCidade);
router.patch('/:id', townController.patchCidade);
router.delete('/:id', townController.deleteCidade);

module.exports = router;