const Reserva = require("../models/Reserva");
const Hotel = require("../models/Hotel");
const Usuario = require("../models/Usuario");

// Obtener todas las reservas (solo para administradores)
exports.getAllReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [{ model: Hotel }, { model: Usuario }],
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reservas", error });
  }
};

// Obtener reservas de un usuario autenticado
exports.getMisReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      where: { usuarioId: req.user.id }, // req.user viene del middleware de autenticación
      include: [{ model: Hotel }],
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tus reservas", error });
  }
};

// Obtener una reserva por ID
exports.getReservaById = async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id, {
      include: [{ model: Hotel }, { model: Usuario }],
    });
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la reserva", error });
  }
};

// Crear una nueva reserva
exports.createReserva = async (req, res) => {
  try {
    const { hotelId, fechaEntrada, fechaSalida } = req.body;
    const nuevaReserva = await Reserva.create({
      usuarioId: req.user.id, // req.user.id viene del middleware de autenticación
      hotelId,
      fechaEntrada,
      fechaSalida,
    });
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la reserva", error });
  }
};

// Cancelar una reserva
exports.cancelReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id);
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    
    // Verificar si el usuario es el dueño de la reserva o es administrador
    if (reserva.usuarioId !== req.user.id && req.user.rol !== "admin") {
      return res.status(403).json({ message: "No autorizado para cancelar esta reserva" });
    }

    await reserva.destroy();
    res.json({ message: "Reserva cancelada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al cancelar la reserva", error });
  }
};
