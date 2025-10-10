# GestorFinanciero
# 💰 Sistema Financiero (React + Node.js + PostgreSQL)

Este proyecto es un **sistema financiero completo** con frontend en **React (Vite)** y backend en **Node.js + Express + Sequelize + PostgreSQL**.  
Permite gestionar **ingresos, egresos, usuarios y reportes financieros**.

---

## 🧱 Estructura del Proyecto
sistema-financiero/
│
├── backend/
│ ├── server.js
│ ├── package.json
│ ├── .env
│ ├── config/
│ │ └── db.js
│ ├── models/
│ │ ├── User.js
│ │ └── Transaction.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ └── transactionRoutes.js
│ └── controllers/
│ ├── authController.js
│ └── transactionController.js
│
└── frontend/
├── package.json
├── vite.config.js
├── index.html
└── src/
├── main.jsx
├── App.jsx
├── context/
│ └── AuthContext.jsx
├── pages/
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Dashboard.jsx
│ ├── Ingresos.jsx
│ ├── Egresos.jsx
│ └── Reportes.jsx
├── components/
│ ├── Navbar.jsx
│ └── TransactionForm.jsx
└── services/
└── api.js
