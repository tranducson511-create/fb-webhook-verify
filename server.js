'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express().use(bodyParser.json());

// -------------------- CONFIG --------------------

// 🔥 PAGE TOKEN thật của bạn
const PAGE_ACCESS_TOKEN = "EAARMY28v3qABQIH2Pg8bZCnu4C8xjwNDl3bpsLWlZBpDbuWaFLXJK4ZACOWYLmUmZCXMa9ZCh4GM7gZCsDTZBhLyF3ZBGccetzKNBa8hw0wiknnUwnuPC7nbXuiqHpivUROADWmJt112ZCCTO3PZBuIvrtrV68RqLpezTLUuT0SqVOZAfPkLGBd2IZBzTHyYAE2ZAFn2Lpbo5oByc8yZCfJvJsNMZBANF7wXQZDZD";

// 🔥 VERIFY TOKEN bạn tự đặt
const VERIFY_TOKEN = "ongchu123";

// 🔥 OPENAI API KEY (bạn sẽ thêm vào Render)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


// -------------------- VERIFY WEBHOOK --------------------

app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log("Webhook verified OK!");
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});


// -------------------- RECEIVE MESSAGE FROM MESSENGER --------------------

app.post('/webhook', async (req, res) => {
    const body = req.body;

    if (body.object === 'page') {

        body.entry.forEach(async (entry) => {
            const event = entry.messaging[0];
            const sender_psid = event.sender.id;

            if (event.message && event.message.text) {
                const userMessage = event.message.text;
                console.log("📩 USER:", userMessage);

                // Gọi OpenAI để tạo trả lời
                const aiReply = await callOpenAI(userMessage);

                // Gửi tin trả lời lại
                await sendMessage(sender_psid, aiReply);
            }
        });

        res.status(200).send("EVENT_RECEIVED");
    } else {
        res.sendStatus(404);
    }
});


// -------------------- CALL OPENAI GPT-4o --------------------

async function callOpenAI(text) {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o",
                messages: [
                    { 
                        role: "system", 
                        content: "You are a helpful, friendly loan support chatbot. Reply briefly and clearly." 
                    },
                    { 
                        role: "user", 
                        content: text 
                    }
                ],
                max_tokens: 150
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error("🔥 LỖI OPENAI:", error.response?.data || error.message);
        return "Sorry, I cannot process your request right now.";
    }
}


// -------------------- SEND MESSAGE BACK TO USER --------------------

async function sendMessage(sender_psid, text) {

    await axios.post(
        `https://graph.facebook.com/v21.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
        {
            recipient: { id: sender_psid },
            message: { text: text }
        },
        { headers: { "Content-Type": "application/json" } }
    );

    console.log("📤 Đã gửi tin:", text);
}


// -------------------- START SERVER --------------------

app.listen(process.env.PORT || 3000, () => {
    console.log("🚀 Server AI bot đang chạy...");
});
