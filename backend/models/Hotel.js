const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Hotel = sequelize.define("Hotel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagen_local: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: "hoteles",
  timestamps: false 
});

module.exports = Hotel;
