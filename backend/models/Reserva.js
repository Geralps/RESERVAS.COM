const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const Usuario = require("./Usuario"); // Importa el modelo Usuario para la relación
const Hotel = require("./Hotel"); // Importa el modelo Hotel para la relación

const Reserva = sequelize.define("Reserva", {
  id_reserva: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, // Referencia al modelo Usuario
      key: 'id_usuario', // Llave primaria en la tabla usuarios
    }
  },
  id_hotel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Hotel, // Referencia al modelo Hotel
      key: 'id', // Llave primaria en la tabla hoteles (según tu modelo Hotel)
    }
  },
  fecha_inicio: {
    type: DataTypes.DATEONLY, // Usar DATEONLY si solo necesitas la fecha, no la hora
    allowNull: false,
  },
  fecha_fin: {
    type: DataTypes.DATEONLY, // Usar DATEONLY si solo necesitas la fecha, no la hora
    allowNull: false,
  },
  numero_habitaciones: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio_total: {
    type: DataTypes.FLOAT, // O DataTypes.DECIMAL para mayor precisión monetaria
    allowNull: false,
  },
  fecha_reserva: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW, // Valor por defecto: fecha y hora actuales
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    // Opcional: usar ENUM para restringir los valores posibles
    // type: DataTypes.ENUM('Confirmada', 'Pendiente', 'Cancelada'),
    // defaultValue: 'Pendiente' // Opcional: estado por defecto
  },
}, {
  tableName: "reservas", // Nombre exacto de la tabla
  timestamps: false, // Deshabilitar createdAt/updatedAt ya que existe fecha_reserva
});

// --- Definir Asociaciones (Opcional pero recomendado) ---

// Una Reserva pertenece a un Usuario
Reserva.belongsTo(Usuario, { foreignKey: 'id_usuario' });
// Un Usuario puede tener muchas Reservas
Usuario.hasMany(Reserva, { foreignKey: 'id_usuario' });

// Una Reserva pertenece a un Hotel
Reserva.belongsTo(Hotel, { foreignKey: 'id_hotel' });
// Un Hotel puede tener muchas Reservas
Hotel.hasMany(Reserva, { foreignKey: 'id_hotel' });

// ---------------------------------------------------------

module.exports = Reserva;