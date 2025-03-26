const express = require("express");
const Payman = require("paymanai");
require("dotenv").config();

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Initialize PaymanAI
const payman = new Payman({
    xPaymanAPISecret: process.env.PAYMAN_API_SECRET,
});

// API Route to Create a Payee
app.post("/create-payee", async (req, res) => {
    try {
        const payee = await payman.payments.createPayee({
            type: req.body.type || "US_ACH",
            name: req.body.name,
            accountHolderName: req.body.accountHolderName,
            accountHolderType: req.body.accountHolderType || "individual",
            accountNumber: req.body.accountNumber,
            routingNumber: req.body.routingNumber,
            accountType: req.body.accountType || "checking",
            contactDetails: {
                email: req.body.email,
            },
        });

        res.json({ success: true, payee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// API Route to Send a Payment
app.post("/send-payment", async (req, res) => {
    try {
        const payment = await payman.payments.sendPayment({
            amountDecimal: req.body.amountDecimal,
            payeeId: req.body.payeeId,
            memo: req.body.memo || "Test payment",
        });

        res.json({ success: true, payment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// API Route to Get Payees
app.get("/get-payees", async (req, res) => {
    try {
        const payees = await payman.payments.listPayees(); // Adjust if needed based on PaymanAI documentation
        res.json({ success: true, payees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = app;
