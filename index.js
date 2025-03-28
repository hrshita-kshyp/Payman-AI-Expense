import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import Payman from "paymanai"; // ✅ Correct import for ES module

const app = express();
const PORT = process.env.PORT || 5000;
const payman = new Payman({ apiKey: process.env.PAYMANAI_API_SECRET });

app.use(cors());
app.use(bodyParser.json());

// ✅ Root Route to Fix "Cannot GET /"
app.get("/", (req, res) => {
    res.send("🚀 Payment AI Expense Server is Running!");
});

// ✅ Find or Create Payee Function
async function findOrCreatePayee({ name, accountHolderName, accountNumber, routingNumber, email }) {
    try {
        // 🔹 Search for existing payee first
        const existingPayees = await payman.payments.searchPayees({ name });

        if (existingPayees.length > 0) {
            console.log("Payee already exists:", existingPayees[0]);
            return existingPayees[0]; // Return existing payee
        }

        // 🔹 Create a new payee if not found
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

        console.log("New Payee Created:", payee);
        return payee;
    } catch (error) {
        throw new Error(error.message);
    }
}

// ✅ Process Payment
app.post("/process-payment", async (req, res) => {
    try {
        const { name, accountHolderName, accountNumber, routingNumber, email, amountDecimal, memo } = req.body;

        if (!name || !accountHolderName || !accountNumber || !routingNumber || !email || !amountDecimal) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        // 🔹 Get Payee (existing or new)
        const payee = await findOrCreatePayee({ name, accountHolderName, accountNumber, routingNumber, email });

        // 🔹 Send Payment
        const payment = await payman.payments.sendPayment({
            amountDecimal,
            payeeId: payee.id,
            memo,
            metadata: { department: "finance" }
        });

        res.json({ success: true, payee, payment });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
