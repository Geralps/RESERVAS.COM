const Hotel = require("../models/Hotel");

// Obtener todos los hoteles
exports.getAllHoteles = async (req, res) => {
  try {
    console.log("📡 Solicitando todos los hoteles...");
    const hoteles = await Hotel.findAll({
      attributes: ["id", "nombre", "ubicacion", "descripcion", "imagen_local", "precio"] // 📌 Agregamos las columnas
    });

    console.log("🟢 Hoteles obtenidos:", hoteles);

    if (!hoteles || hoteles.length === 0) {
      console.warn("⚠️ No se encontraron hoteles en la base de datos.");
      return res.status(404).json({ message: "No hay hoteles disponibles" });
    }

    res.json(hoteles);
  } catch (error) {
    console.error("🔴 Error al obtener los hoteles:", error);
    res.status(500).json({ message: "Error al obtener los hoteles", error: error.message });
  }
};

// Obtener un hotel por ID
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id, {
      attributes: ["id", "nombre", "ubicacion", "descripcion", "imagen_local", "precio"] // 📌 Asegurar que traiga estos datos
    });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }

    res.json(hotel);
  } catch (error) {
    console.error("🔴 Error al obtener el hotel:", error);
    res.status(500).json({ message: "Error al obtener el hotel", error: error.message });
  }
};
