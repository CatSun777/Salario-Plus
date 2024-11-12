const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const salaryRoutes = require('./routes/salary'); // Importar las rutas de salario
const expenseRoutes = require('./routes/expense'); // Importar las rutas de gasto
require('dotenv').config();
require('./config/passport-setup'); // Configuración de passport

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(`MongoDB connection error: ${err}`));

// Middleware para CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permite solicitudes desde el frontend en HTTP
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
    credentials: true, // Permite el envío de cookies en las solicitudes
}));

// Middleware para parsing de JSON y URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/auth', authRoutes);
app.use('/api/salary', salaryRoutes); // Ruta para manejar salarios
app.use('/api/expense', expenseRoutes); // Ruta para manejar gastos

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
