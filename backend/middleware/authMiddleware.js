const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay token' });
    }

    try {
        const tokenSinBearer = token.replace('Bearer ', '');
        const verificado = jwt.verify(tokenSinBearer, process.env.JWT_SECRET);
        req.user = verificado; // Esto permite acceder a req.user.id en reservaController
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
};

module.exports = verificarToken;
