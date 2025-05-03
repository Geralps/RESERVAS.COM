const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, contrasena } = req.body;

        let usuario = await Usuario.findOne({ where: { email } });
        if (usuario) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const salt = await bcrypt.genSalt(10);
        const contrasenaHash = await bcrypt.hash(contrasena, salt);

        usuario = await Usuario.create({ nombre, email, contrasena: contrasenaHash });

        res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario", error });
    }
};

// Inicio de sesión
exports.loginUsuario = async (req, res) => {
    try {
        const { email, contrasena } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!isMatch) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, usuario });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
};
