const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectName: String,
    totalBudget: Number,
    spentAmount: Number,
});

module.exports = mongoose.model("Budget", BudgetSchema);
