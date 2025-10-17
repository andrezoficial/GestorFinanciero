const AuthController = require('../controllers/AuthController');

const authMiddleware = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || '';
    const [scheme, token] = auth.split(' ');
    if (scheme?.toLowerCase() !== 'bearer' || !token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = await AuthController.verificarToken(token);
    req.user = { id: decoded.id, email: decoded.email }; // limpio
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;