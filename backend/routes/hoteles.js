const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController'); // Asegúrate de que la ruta es correcta

// Definir rutas con controladores válidos
router.get('/', hotelController.getAllHoteles);
router.get('/:id', hotelController.getHotelById);
router.get("/:id", async (req, res) => {
    try {
      const hotel = await Hotel.findByPk(req.params.id);
      if (!hotel) {
        return res.status(404).json({ mensaje: "Hotel no encontrado" });
      }
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener hotel", error });
    }
  });

module.exports = router;
