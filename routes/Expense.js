// routes/expense.js
const router = require('express').Router();
const Expense = require('../models/Expense'); // Importa el modelo de Expense

// Ruta para guardar gastos
router.post('/', async (req, res) => {
    const newExpense = new Expense(req.body);
    try {
        await newExpense.save();
        console.log('Gasto guardado:', newExpense);
        res.status(200).json(newExpense);
    } catch (err) {
        console.error('Error al guardar el gasto:', err);
        res.status(500).json({
            message: 'Error al guardar el gasto',
            error: err.message,
        });
    }
});

// Ruta para obtener gastos
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (err) {
        console.error('Error al obtener gastos:', err);
        res.status(500).json({
            message: 'Error al obtener gastos',
            error: err.message,
        });
    }
});

// Ruta para actualizar gastos
router.put('/:id', async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }
        res.status(200).json(updatedExpense);
    } catch (err) {
        console.error('Error al actualizar el gasto:', err);
        res.status(500).json({
            message: 'Error al actualizar el gasto',
            error: err.message,
        });
    }
});

// Ruta para eliminar gastos
router.delete('/:id', async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }
        res.status(200).json({ message: 'Gasto eliminado' });
    } catch (err) {
        console.error('Error al eliminar el gasto:', err);
        res.status(500).json({
            message: 'Error al eliminar el gasto',
            error: err.message,
        });
    }
});

module.exports = router;
