const express = require('express');
const cors = require('cors');
const PokemonRoutes = require('./routes/PokemonRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/pokemon', PokemonRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Projeto iniciado.',
  });
});

app.listen(3000, () => {
  console.log('Aplicativo iniciado, porta: 3000');
});