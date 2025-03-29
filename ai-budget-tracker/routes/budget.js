const express = require("express");
const Budget = require("../models/budget");
const router = express.Router();

// Create Budget
router.post("/create", async (req, res) => {
    try {
        const { user, projectName, totalBudget } = req.body;
        const budget = new Budget({ user, projectName, totalBudget, spentAmount: 0 });
        await budget.save();
        res.json(budget);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Budgets
router.get("/:userId", async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.params.userId });
        res.json(budgets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Expense
router.post("/add-expense", async (req, res) => {
    try {
        const { budgetId, amount } = req.body;
        const budget = await Budget.findById(budgetId);
        budget.spentAmount += amount;
        await budget.save();
        res.json(budget);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
