import Payman from "paymanai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const payman = new Payman({
    xPaymanAPISecret: process.env.PAYMAN_API_SECRET,
});

// Example: Create a payee
async function processPayment() {
    try {
        const payee = await payman.payments.createPayee({
            type: "US_ACH",
            name: "John Doe",
            accountHolderName: "John Doe",
            accountHolderType: "individual",
            accountNumber: "12345678",
            routingNumber: "021000021",
            accountType: "checking",
            contactDetails: {
                email: "john@example.com",
            },
        });

        // Send payment
        const payment = await payman.payments.sendPayment({
            amountDecimal: 100.0,
            payeeId: payee.id,
            memo: "Test payment",
        });

        console.log("Payee created:", payee);
        console.log("Payment created:", payment);
    } catch (error) {
        console.error("Error processing payment:", error);
    }
}

processPayment();
