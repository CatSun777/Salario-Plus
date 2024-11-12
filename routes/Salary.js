const router = require('express').Router();
const mongoose = require('mongoose');

// Definir el esquema de Salary
const SalarySchema = new mongoose.Schema({
    salary: { type: Number, required: true },
});

// Crear el modelo de Salary
const Salary = mongoose.model('Salary', SalarySchema);

// Ruta para guardar salario
router.post('/', async (req, res) => {
    const newSalary = new Salary({ salary: req.body.salary });
    try {
        await newSalary.save();
        console.log('Salario guardado');
        res.status(200).json(newSalary);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
