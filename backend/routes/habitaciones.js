const express = require('express');
const router = express.Router();
const habitacionController = require('../controllers/habitacionController');

router.get('/', habitacionController.getAllHabitaciones);


router.get('/:id', habitacionController.getHabitacionById);


module.exports = router;