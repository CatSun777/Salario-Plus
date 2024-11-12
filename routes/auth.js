// salary-plus-backend/routes/auth.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

// Ruta de autenticación de Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Ruta de callback de Google
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    // Redirigir a la aplicación frontend después de un inicio de sesión exitoso
    const redirectUrl = process.env.NODE_ENV === 'production'
        ? 'https://salario-plus.netlify.app/'
        : 'http://localhost:3000/home';
        
    res.redirect(redirectUrl);
});

module.exports = router;
