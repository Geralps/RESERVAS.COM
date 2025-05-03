const { DataTypes, Sequelize } = require("sequelize");
const bcrypt = require('bcryptjs');
const sequelize = require("../config/database"); // Reutiliza la misma instancia de sequelize

const Usuario = sequelize.define("Usuario", {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "usuarios",
  timestamps: false, // Deshabilita los campos createdAt y updatedAt
});

// Hook para encriptar la contraseña antes de guardar el usuario
Usuario.beforeCreate(async (usuario, options) => {
  if (usuario.contrasena) {
    usuario.contrasena = await bcrypt.hash(usuario.contrasena, 10);
  }
});

module.exports = Usuario;
