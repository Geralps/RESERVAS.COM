const Usuario = require('../models/Usuario'); // Ajusta la ruta si es diferente
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Para acceder a JWT_SECRET

// --- Controlador para Registrar un Nuevo Usuario ---
exports.register = async (req, res) => {
  const { nombre, apellido, email, contrasena , telefono } = req.body;
  console.log('Datos recibidos para registro:', req.body); // Para depuración

  // Validación básica de entrada
  if (!nombre || !apellido || !email || !contrasena || !telefono)  {
    return res.status(400).json({ error: 'Por favor, proporciona nombre, email y contraseña.' });
  }
  if (contrasena.length < 6) { // Ejemplo de validación de contraseña
     return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
  }

  try {
    // Verificar si el email ya existe (Sequelize maneja esto con 'unique', pero es bueno chequear)
    const existingUser = await Usuario.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    // Crear el nuevo usuario. La contraseña se hasheará automáticamente por el hook en el modelo.
    const newUser = await Usuario.create({ nombre, apellido, email, telefono, contrasena });

    // Excluir la contraseña de la respuesta
    const userResponse = {
      id: newUser.id,
      nombre: newUser.nombre,
      apellido: newUser.apellido,
      email: newUser.email,
      telefono: newUser.telefono,
      contrasena: newUser.contrasena,
    };

    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: userResponse });

  } catch (error) {
    console.error('Error en registro:', error);
     // Manejo de errores de validación de Sequelize (como formato de email)
     if (error.name === 'SequelizeValidationError') {
         const messages = error.errors.map(e => e.message);
         return res.status(400).json({ error: messages.join(', ') });
     }
    res.status(500).json({ error: 'Error interno del servidor al registrar el usuario.' });
  }
};

// --- Controlador para Iniciar Sesión ---
exports.login = async (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ error: 'Por favor, proporciona email y contraseña.' });
  }

  try {
    // Buscar usuario por email
    const usuario = await Usuario.findOne({ where: { email: email } });

    // Si no se encuentra el usuario o la contraseña no coincide
    if (!usuario || !usuario.validcontrasena(contrasena)) { // Usa el método del modelo
      return res.status(401).json({ error: 'Credenciales inválidas.' }); // Mensaje genérico por seguridad
    }

    // Si las credenciales son válidas, crear el token JWT
    const payload = {
      id: usuario.id,
      email: usuario.email,
      // Puedes añadir más datos si los necesitas, pero mantenlo ligero
    };

    const secret = process.env.JWT_SECRET;
    if (!secret) {
       console.error('🔴 Error: JWT_SECRET no está definido en .env');
       return res.status(500).json({ error: 'Error interno del servidor (configuración).' });
    }

    const token = jwt.sign(
        payload,
        secret,
        { expiresIn: '1h' } // El token expira en 1 hora (puedes cambiarlo)
    );

    // Enviar el token y quizás algunos datos del usuario (sin contraseña)
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token: token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor durante el inicio de sesión.' });
  }
};