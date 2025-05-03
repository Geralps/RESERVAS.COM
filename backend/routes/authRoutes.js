// Import necessary modules
const express = require('express');
const bcrypt = require('bcrypt'); // Needed for contrasena hashing
const Usuario = require('../models/Usuario');

// Create an Express router instance
const router = express.Router();

// --- User Registration Endpoint ---
// Route: POST /register (relative to the mount point in server.js, e.g., /api/auth/register)
router.post('/register', async (req, res) => {
  // 1. Extract data from the request body
  const { nombre, apellido, email, contrasena , telefono } = req.body;

  // 2. Basic backend input validation
  if (!nombre || !apellido || !email || !contrasena  || !telefono) {
    return res.status(400).json({ message: 'Todos los campos son requeridos.' }); // Bad Request
  }

  try {
    // 3. Check if the email already exists
    const usuarioExistente = await Usuario.findOne({ where: { email: email } });
    if (usuarioExistente) {
      // Conflict - email already registered
      return res.status(409).json({ message: 'El email ya está registrado.' });
    }

    // 4. Hash the contrasena BEFORE saving it
    const saltRounds = 10; // Standard number of salt rounds for bcrypt
    const contrasenaHasheada = await bcrypt.hash(contrasena , saltRounds);

    // 5. Create the new user in the database
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      email,
      contrasena: contrasenaHasheada, // Save the hashed contrasena!
      telefono,
      // Add any other fields your Usuario model might have/require
    });

    // 6. Send success response (201 Created)
    // Avoid sending the contrasena back, even the hash
    res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      usuario: {
        id: nuevoUsuario.id_usuario, // Make sure 'id_usuario' is the correct primary key field name
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email,
         contrasena: nuevoUsuario.contrasena ,
        telefono: nuevoUsuario.telefono,
      }
    });

  } catch (error) {
    // Handle potential errors during the process
    console.error("Error en /register:", error); // Log the detailed error on the server

    // Handle specific Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Error de validación de datos.', details: error.errors });
    }
    // Generic server error for other issues
    res.status(500).json({ message: 'Error interno del servidor durante el registro.' });
  }
}); 


module.exports = router;
