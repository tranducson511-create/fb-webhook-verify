const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express().use(bodyParser.json());

// ==============================
// 🔥 TOKEN FACEBOOK + VERIFY
// ==============================
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// ==============================
// 🔥 TELEGRAM BOT
// ==============================
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// ==============================
// 🟢 VERIFY WEBHOOK
// ==============================
app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === VERIFY_TOKEN) {
        return res.status(200).send(challenge);
    }
    res.sendStatus(403);
});

// ==============================
// 🟢 NHẬN TIN NHẮN FACEBOOK
// ==============================
app.post("/webhook", async (req, res) => {
    const body = req.body;

    if (body.object === "page") {
        body.entry.forEach(entry => {
            const event = entry.messaging[0];
            const sender = event.sender.id;

            if (event.message) {
                handleMessage(sender, event.message);
            }
        });

        return res.status(200).send("EVENT_RECEIVED");
    }
    res.sendStatus(404);
});

// ==============================
// 🧠 XỬ LÝ TIN NHẮN
// ==============================
async function handleMessage(sender_psid, msg) {
    const text = msg.text || "(không có văn bản)";

    await sendToTelegram(`📩 KHÁCH FB: ${text}`);

    sendMessage(sender_psid, {
        text: "Xin chào! Bạn cần hỗ trợ vay vốn hay tư vấn gì ạ?"
    });
}

// ==============================
// 📤 GỬI TIN NHẮN FB
// ==============================
function sendMessage(sender_psid, response) {
    axios.post(`https://graph.facebook.com/v17.0/me/messages`, {
        recipient: { id: sender_psid },
        message: response
    }, {
        params: { access_token: PAGE_ACCESS_TOKEN }
    }).catch(err => {
        console.error("FB ERROR:", err.response?.data || err.message);
    });
}

// ==============================
// 📤 TELEGRAM
// ==============================
function sendToTelegram(text) {
    return axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        { chat_id: TELEGRAM_CHAT_ID, text }
    );
}

// ==============================
// 🚀 START SERVER
// ==============================
app.listen(3000, () => console.log("Server chạy rồi OK ✔"));
