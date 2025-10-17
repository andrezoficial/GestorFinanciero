const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '24h';

const sign = (user) =>
  jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

class AuthController {
  // Registro (hash lo hace el modelo via hooks)
  static async register(data) {
    // normaliza email (el hook también lo hace, esto es extra safe si cambias el modelo)
    const payload = { ...data, email: (data.email || '').trim().toLowerCase() };

    const usuario = await Usuario.create(payload);
    const token = sign(usuario);
    return { usuario: usuario.toJSON(), token };
  }

  // Login
  static async login(email, password) {
    const correo = (email || '').trim().toLowerCase();
    const usuario = await Usuario.scope(null).findOne({ where: { email: correo } }); // scope(null) para incluir password en memoria

    if (!usuario) throw new Error('Usuario no encontrado');

    const ok = await usuario.validarPassword(password);
    if (!ok) throw new Error('Contraseña incorrecta');

    const token = sign(usuario);
    return { usuario: usuario.toJSON(), token };
  }

  // Verificar token
  static async verificarToken(token) {
    const decoded = jwt.verify(token, JWT_SECRET);
    // comprobamos que el usuario existe
    const usuario = await Usuario.findByPk(decoded.id);
    if (!usuario) throw new Error('Usuario no encontrado');
    return decoded;
  }
}

module.exports = AuthController;
