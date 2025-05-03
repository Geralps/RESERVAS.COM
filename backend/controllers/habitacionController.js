const Habitacion = require('../models/Habitacion'); // Ajusta la ruta si es necesario

// --- Controlador para obtener todas las habitaciones ---
exports.getAllHabitaciones = async (req, res) => {
  try {
    const habitaciones = await Habitacion.findAll({
        // Aquí podrías añadir opciones, como incluir el modelo Hotel si ya lo tienes relacionado
        // include: [{ model: Hotel }]
    });
    res.status(200).json(habitaciones);
  } catch (error) {
    console.error('Error al obtener habitaciones:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener habitaciones.' });
  }
};

// --- Controlador para obtener una habitación por ID (Ejemplo) ---
exports.getHabitacionById = async (req, res) => {
    const { id } = req.params; // Obtiene el ID de la URL (ej: /api/habitaciones/5)
    try {
        const habitacion = await Habitacion.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({ error: 'Habitación no encontrada.' });
        }
        res.status(200).json(habitacion);
    } catch (error) {
        console.error(`Error al obtener habitación ${id}:`, error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// --- Aquí añadirías controladores para CREAR, ACTUALIZAR, ELIMINAR habitaciones (probablemente protegidas) ---
// exports.createHabitacion = async (req, res) => { ... };
// exports.updateHabitacion = async (req, res) => { ... };
// exports.deleteHabitacion = async (req, res) => { ... };