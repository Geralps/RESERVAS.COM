const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./config/database');
const hotelRoutes = require('./routes/hoteles');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

// --- CORS Configuration ---

const allowedOrigins = ['http://localhost:3000']; 

const corsOptions = {
  origin: function (origin, callback) {

    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// --- Middlewares ---
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- Rutas ---

app.use('/api/hoteles', hotelRoutes);
app.use('/api/auth', authRoutes);

// --- Conectar con la base de datos ---
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado a la base de datos correctamente.');

  })
  .catch(err => {
    console.error('❌ Error al conectar la base de datos:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});