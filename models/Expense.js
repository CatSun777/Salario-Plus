const mongoose = require('mongoose');

// Definir el esquema de Expense
const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'], // Mensaje de error personalizado
        trim: true, // Eliminar espacios en blanco al inicio y al final
        maxlength: [100, 'La descripción no puede exceder 100 caracteres'] // Limitar la longitud
    },
    amount: {
        type: Number,
        required: [true, 'El monto es obligatorio'], // Mensaje de error personalizado
        min: [0, 'El monto debe ser un número positivo'] // Asegurar que el monto sea positivo
    },
    createdAt: {
        type: Date,
        default: Date.now // Fecha de creación por defecto es ahora
    }
});

// Exportar el modelo
module.exports = mongoose.model('Expense', expenseSchema);
