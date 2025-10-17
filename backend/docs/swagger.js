const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'SmartBudget API',
      version: '1.0.0',
      description: 'API del gestor de finanzas personales',
    },
    servers: [{ url: 'http://localhost:5000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nombre: { type: 'string' },
            email: { type: 'string', format: 'email' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: ['nombre', 'email', 'password'],
          properties: {
            nombre: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', format: 'password' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', format: 'password' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            usuario: { $ref: '#/components/schemas/User' },
          },
        },
        Transaction: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            userId: { type: 'integer' },
            type: { type: 'string', enum: ['income', 'expense'] },
            amount: { type: 'number', format: 'double' },
            category: { type: 'string' },
            description: { type: 'string' },
            date: { type: 'string', format: 'date' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateTransactionRequest: {
          type: 'object',
          required: ['type', 'amount'],
          properties: {
            type: { type: 'string', enum: ['income', 'expense'] },
            amount: { type: 'number', format: 'double' },
            category: { type: 'string' },
            description: { type: 'string' },
            date: { type: 'string', format: 'date' },
          },
        },
      },
    },
    // Seguridad por defecto para endpoints protegidos (puedes sobreescribir por-path)
    security: [{ bearerAuth: [] }],
  },
  // Rutas donde leeremos anotaciones JSDoc (opcional):
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
