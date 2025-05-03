const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

const verificarToken = require('../middleware/authMiddleware');

router.post('/', verificarToken, reservaController.createReserva);
router.get('/', verificarToken, reservaController.getMisReservas);
router.get('/:id', verificarToken, reservaController.getReservaById);
router.delete('/:id', verificarToken, reservaController.cancelReserva);

module.exports = router;