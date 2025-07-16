require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const rideRoutes = require('./routes/ride');
app.use('/api/rides', rideRoutes);

// Sincronizar modelos com o banco
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado!');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((err) => {
  console.error('Erro ao sincronizar o banco:', err);
}); 