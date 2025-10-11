const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Configuración para bcrypt y jwt
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'tu_secret_key';

class AuthController {
    // Registro de nuevo usuario
    static async register(userData) {
        try {
            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
            
            // Crear usuario con contraseña hasheada
            const usuario = await Usuario.create({
                ...userData,
                password: hashedPassword
            });

            // Generar token
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            // Retornar usuario (sin contraseña) y token
            const { password, ...usuarioSinPassword } = usuario.toJSON();
            return {
                usuario: usuarioSinPassword,
                token
            };
        } catch (error) {
            throw new Error('Error al registrar usuario: ' + error.message);
        }
    }

    // Login de usuario
    static async login(email, password) {
        try {
            // Buscar usuario
            const usuario = await Usuario.findOne({ where: { email } });
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            // Verificar contraseña
            const passwordValida = await bcrypt.compare(password, usuario.password);
            if (!passwordValida) {
                throw new Error('Contraseña incorrecta');
            }

            // Generar token
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            // Retornar usuario (sin contraseña) y token
            const { password: _, ...usuarioSinPassword } = usuario.toJSON();
            return {
                usuario: usuarioSinPassword,
                token
            };
        } catch (error) {
            throw new Error('Error en login: ' + error.message);
        }
    }

    // Verificar token
    static async verificarToken(token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const usuario = await Usuario.findByPk(decoded.id);
            
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            return decoded;
        } catch (error) {
            throw new Error('Token inválido');
        }
    }
}

module.exports = AuthController;