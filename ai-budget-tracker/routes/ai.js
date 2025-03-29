const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const router = express.Router();

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

router.post("/analyze", async (req, res) => {
    try {
        const { expenses } = req.body;
        const prompt = `Analyze the following expenses: ${JSON.stringify(expenses)}. Provide insights on spending patterns and suggest improvements.`;

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
        });

        res.json({ insights: response.data.choices[0].message.content });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
