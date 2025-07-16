const User = require('./User');
const Ride = require('./Ride');

// Associações
User.hasMany(Ride, { foreignKey: 'passageiroId', as: 'corridasPassageiro' });
User.hasMany(Ride, { foreignKey: 'motoqueiroId', as: 'corridasMotoqueiro' });
Ride.belongsTo(User, { foreignKey: 'passageiroId', as: 'passageiro' });
Ride.belongsTo(User, { foreignKey: 'motoqueiroId', as: 'motoqueiro' });

module.exports = {
  User,
  Ride,
}; 