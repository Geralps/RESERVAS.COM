const { Sequelize } = require('sequelize');
require('dotenv').config(); // Para cargar variables de entorno desde un archivo .env

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
);

// Función para probar la conexión
const testDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado a la base de datos correctamente.');
    } catch (error) {
        console.error('❌ Error al conectar la base de datos:', error);
    }
};

testDB();

module.exports = sequelize;
