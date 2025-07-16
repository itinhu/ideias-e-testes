const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');
const auth = require('../middlewares/auth');

router.use(auth); // Proteger todas as rotas

router.post('/', rideController.createRide);
router.get('/', rideController.listRides);
router.post('/:id/accept', rideController.acceptRide);
router.post('/:id/finish', rideController.finishRide);

module.exports = router; 