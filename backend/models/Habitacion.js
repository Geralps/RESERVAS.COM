'use strict';
const { Model, DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class Habitacion extends Model {
    static associate(models) {
      // Define association here
      Habitacion.belongsTo(models.Hotel, { // Una habitación pertenece a un hotel
        foreignKey: 'hotelId',           // Clave foránea en esta tabla (Habitacion)
        as: 'hotel'
      });
      Habitacion.hasMany(models.Reserva, { // Una habitación puede estar en muchas reservas (históricamente)
        foreignKey: 'habitacionId',
        as: 'reservas'
      });
    }
  }
  Habitacion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    hotelId: { // Clave Foránea para relacionar con Hotel
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hoteles', // Nombre de la tabla de Hotel
        key: 'id'
      },
      onUpdate: 'CASCADE', // Opcional: qué hacer si el id del hotel cambia
      onDelete: 'CASCADE'  // Opcional: qué hacer si el hotel se elimina (CASCADE borra las habitaciones)
                           // Podría ser SET NULL o RESTRICT dependiendo de tu lógica de negocio
    },
    numero: { // Número o identificador de la habitación dentro del hotel
      type: DataTypes.STRING, // O INTEGER si prefieres
      allowNull: false
    },
    tipo: { // Ej: 'Simple', 'Doble', 'Suite'
      type: DataTypes.STRING,
      allowNull: false
    },
    precioPorNoche: {
      type: DataTypes.DECIMAL(10, 2), // DECIMAL es bueno para dinero (10 dígitos totales, 2 decimales)
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0 // El precio no puede ser negativo
      }
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    disponible: { // Para saber si está ocupada en este momento (podría manejarse diferente)
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    // Podrías añadir campos como capacidad, imagenUrl, etc.
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'Habitacion',
    tableName: 'habitaciones',
    timestamps: true,
    underscored: false
    // Podrías añadir índices si buscas frecuentemente por hotelId y numero, etc.
    // indexes: [
    //   { unique: true, fields: ['hotelId', 'numero'] } // No puede haber dos habitaciones con el mismo número en el mismo hotel
    // ]
  });
  return Habitacion;
};