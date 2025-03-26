import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import paymanai from "paymanai"; 

const app = express();
const PORT = process.env.PORT || 5000;
const payman = new paymanai({ apiKey: process.env.PAYMANAI_API_KEY });

app.use(cors());
app.use(bodyParser.json());

// ✅ Create Payee
app.post("/create-payee", async (req, res) => {
    try {
        const { name, accountHolderName, accountNumber, routingNumber, email } = req.body;

        if (!name || !accountHolderName || !accountNumber || !routingNumber || !email) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const payee = await payman.payments.createPayee({
            type: "US_ACH",
            name,
            accountHolderName,
            accountHolderType: "individual",
            accountNumber,
            routingNumber,
            accountType: "checking",
            contactDetails: { email }
        });

        res.json({ success: true, payee });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// ✅ Send Payment
app.post("/send-payment", async (req, res) => {
    try {
        const { amountDecimal, payeeId, memo } = req.body;

        if (!amountDecimal || !payeeId) {
            return res.status(400).json({ success: false, error: "Missing amount or payeeId" });
        }

        const payment = await payman.payments.sendPayment({
            amountDecimal,
            payeeId,
            memo,
            metadata: { department: "finance" }
        });

        res.json({ success: true, payment });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// ✅ Search Payees
app.get("/search-payees", async (req, res) => {
    try {
        const { name, type } = req.query;

        const filters = {};
        if (name) filters.name = name;
        if (type) filters.type = type;

        const payees = await payman.payments.searchPayees(filters);
        res.json({ success: true, payees });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// ✅ Get Payment Status
app.get("/payment-status", async (req, res) => {
    try {
        const { reference } = req.query;

        if (!reference) {
            return res.status(400).json({ success: false, error: "Missing payment reference" });
        }

        const payments = await payman.payments.searchPayments({ reference });

        if (!payments || payments.length === 0) {
            return res.status(404).json({ success: false, error: "Payment not found" });
        }

        res.json({ success: true, status: payments[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
