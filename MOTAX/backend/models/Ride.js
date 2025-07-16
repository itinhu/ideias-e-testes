const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ride = sequelize.define('Ride', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  passageiroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  motoqueiroId: {
    type: DataTypes.INTEGER,
    allowNull: true, // só será preenchido quando o motoqueiro aceitar
  },
  origem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destino: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  formaPagamento: {
    type: DataTypes.ENUM('dinheiro', 'pix', 'cartao'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('solicitada', 'aceita', 'finalizada', 'cancelada'),
    defaultValue: 'solicitada',
  },
  valor: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Ride; 