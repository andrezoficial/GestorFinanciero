const AuthController = require('../controllers/AuthController');

const authMiddleware = async (req, res, next) => {
    try {
        // Obtener token del header
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }

        // Verificar token
        const decoded = await AuthController.verificarToken(token);
        
        // Agregar usuario decodificado a la request
        req.usuario = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = authMiddleware;