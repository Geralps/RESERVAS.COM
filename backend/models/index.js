// backend/models/index.js
'use strict';

const fs = require('fs');           // Módulo File System de Node para leer archivos
const path = require('path');       // Módulo Path de Node para manejar rutas de archivos
const Sequelize = require('sequelize'); // La librería Sequelize
const process = require('process'); // Para acceder a variables de entorno
const basename = path.basename(__filename); // Nombre de este archivo (index.js)
const env = process.env.NODE_ENV || 'development'; // Entorno actual (development por defecto)

// --- Carga la configuración de la base de datos ---
// Asume que tienes un archivo config/config.json o config/config.js
// que exporta un objeto con claves 'development', 'test', 'production'
// Si usas variables de entorno directamente, adapta esta parte.
// Ejemplo: const configDB = require(__dirname + '/../config/config.js')[env];
// O si usas variables de entorno directas en un .env:
const configDB = {
  username: process.env.DB_USER,
  contrasena: process.env.DB_contrasena,
  database: process.env.DB_DATABASE, // Asegúrate que coincida con tu .env
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'mysql', // Dialecto (mysql, postgres, etc.)
  // Opcional: otras configuraciones de Sequelize
  // logging: false, // Descomenta para desactivar los logs SQL en la consola
};
// --- Fin de Carga de Configuración ---

const db = {}; // Objeto que contendrá nuestros modelos y la conexión

let sequelize;
// --- Crea la instancia de Sequelize ---
// Verifica si se debe usar una variable de entorno para la URL de conexión (común en Heroku, etc.)
if (configDB.use_env_variable) { // Si tu config tiene esta propiedad
  sequelize = new Sequelize(process.env[configDB.use_env_variable], configDB);
} else { // Usa los parámetros individuales
  sequelize = new Sequelize(configDB.database, configDB.username, configDB.contrasena, {
      host: configDB.host,
      dialect: configDB.dialect,
      // logging: console.log // Puedes activar el logging aquí si quieres
      // logging: false // O desactivarlo
      // pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }, // Opcional: configuración del pool
      define: {
          // Opcional: puedes definir opciones globales para todos los modelos aquí
          // underscored: true, // si prefieres nombres de tabla/columna con guion_bajo
      }
  });
}
// --- Fin de Creación de Instancia ---

// --- Prueba la conexión (Opcional pero recomendado) ---
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos establecida correctamente (desde models/index.js).');
  })
  .catch(err => {
    console.error('❌ No se pudo conectar a la base de datos (desde models/index.js):', err);
  });
// --- Fin de Prueba de Conexión ---


// --- Carga dinámica de modelos ---
fs
  .readdirSync(__dirname) // Lee todos los archivos en el directorio actual (models)
  .filter(file => {
    // Filtra para quedarse solo con archivos Javascript, que no sean ocultos, y que no sean este mismo archivo (index.js)
    return (
      file.indexOf('.') !== 0 && // No empezar con '.' (archivos ocultos)
      file !== basename &&       // No ser index.js
      file.slice(-3) === '.js' && // Terminar en .js
      file.indexOf('.test.js') === -1 // Opcional: excluir archivos de test
    );
  })
  .forEach(file => {
    // Importa la función del modelo y la llama pasándole la instancia sequelize y DataTypes
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // Añade el modelo inicializado al objeto db, usando su nombre como clave
    db[model.name] = model;
    console.log(`  - Modelo cargado: ${model.name}`);
  });
// --- Fin de Carga de Modelos ---

console.log('Estableciendo asociaciones entre modelos...');
// --- Establece las asociaciones ---
Object.keys(db).forEach(modelName => {
  // Si el modelo tiene un método 'associate' (definido en Usuario.js, Hotel.js, etc.)
  if (db[modelName].associate) {
    console.log(`  - Asociando modelo: ${modelName}`);
    // Llama al método associate, pasándole el objeto db completo (para que pueda referenciar otros modelos)
    db[modelName].associate(db);
  }
});
// --- Fin de Asociaciones ---

// --- Exporta la conexión y los modelos ---
db.sequelize = sequelize; // Exporta la instancia de Sequelize configurada
db.Sequelize = Sequelize; // Exporta la propia librería Sequelize (útil para usar Sequelize.Op, etc.)

console.log('✅ Modelos y asociaciones cargados correctamente.');

module.exports = db; // Exporta el objeto db completo