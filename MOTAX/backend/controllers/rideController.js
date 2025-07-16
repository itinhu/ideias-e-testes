const { Ride, User } = require('../models');

exports.createRide = async (req, res) => {
  try {
    const { origem, destino, formaPagamento } = req.body;
    const passageiroId = req.user.id;
    const ride = await Ride.create({ origem, destino, formaPagamento, passageiroId });
    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao solicitar corrida.' });
  }
};

exports.listRides = async (req, res) => {
  try {
    const rides = await Ride.findAll({ include: [
      { model: User, as: 'passageiro', attributes: ['id', 'nome'] },
      { model: User, as: 'motoqueiro', attributes: ['id', 'nome'] }
    ] });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar corridas.' });
  }
};

exports.acceptRide = async (req, res) => {
  try {
    const { id } = req.params;
    const motoqueiroId = req.user.id;
    const ride = await Ride.findByPk(id);
    if (!ride) return res.status(404).json({ error: 'Corrida não encontrada.' });
    if (ride.status !== 'solicitada') return res.status(400).json({ error: 'Corrida não está disponível.' });
    ride.motoqueiroId = motoqueiroId;
    ride.status = 'aceita';
    await ride.save();
    res.json(ride);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao aceitar corrida.' });
  }
};

exports.finishRide = async (req, res) => {
  try {
    const { id } = req.params;
    const ride = await Ride.findByPk(id);
    if (!ride) return res.status(404).json({ error: 'Corrida não encontrada.' });
    ride.status = 'finalizada';
    await ride.save();
    res.json(ride);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao finalizar corrida.' });
  }
}; 