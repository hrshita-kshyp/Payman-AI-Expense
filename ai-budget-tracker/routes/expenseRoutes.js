const express = require('express');
const router = express.Router(); 
const Expense = require('../models/expense'); 

// Add an expense
router.post('/add', async (req, res) => {
    try {
        const { userId, amount, category } = req.body;
        if (!userId || !amount || !category) {
            return res.status(400).json({ errorMessage: "Missing required fields" });
        }
        const newExpense = new Expense({ userId, amount, category });
        await newExpense.save();
        res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });  
    }
});

module.exports = router; // 🟢 Make sure you export it
