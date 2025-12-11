import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express().use(bodyParser.json());

// ==============================
// 🔥 TOKEN FACEBOOK + VERIFY
// ==============================
const PAGE_ACCESS_TOKEN = "EAARMY28v3qABQAIrNBiO0ABXV8ZBZCOdyzApCGWwaRLM7HvNJiIVafCJ1I2ltncmOyQKVn6NrkvhigDK1ZBTiNZAdLYLb6Gd6lZAYtZBycAvCdVvoRl6QS2ryhyFHWZAihpeEqmlZBtN8pM4YuQvZCAD4NBBo32giidz8IaMZBf7dbZBGafHCgZBdcrEHJOvBIf6jBR9FukynuEgK7X8nZCRTjCjAYsMkpAZDZD";
const VERIFY_TOKEN = "ongchu123";

// ==============================
// 🔥 TELEGRAM BOT THÔNG BÁO
// ==============================
const TELEGRAM_BOT_TOKEN = "7834095443:AAFziQxlE_FK3DHmSQurlk79h31xK_HqLuE";
const TELEGRAM_CHAT_ID   = "8180898262";

// ==============================
// 🟢 VERIFY WEBHOOK
// ==============================
app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token) {
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            console.log("Webhook verified");
            res.status(200).send(challenge);
        } else res.sendStatus(403);
    }
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

        res.status(200).send("EVENT_RECEIVED");
    } else res.sendStatus(404);
});

// ==============================
// 🧠 XỬ LÝ TIN NHẮN
// ==============================
async function handleMessage(sender_psid, msg) {
    let text = msg.text || "(không có văn bản)";

    // Gửi về Telegram
    sendToTelegram(`📩 KHÁCH FB nhắn:\n\n${text}`);

    // Auto trả lời khách
    sendMessage(sender_psid, {
        text: "Xin chào! Bạn cần hỗ trợ vay vốn hay tư vấn gì ạ?"
    });
}

// ==============================
// 📤 GỬI TIN NHẮN FB
// ==============================
function sendMessage(sender_psid, response) {
    axios({
        method: "POST",
        url: `https://graph.facebook.com/v17.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
        data: {
            recipient: { id: sender_psid },
            message: response
        }
    })
        .then(() => console.log("Message sent"))
        .catch(err => console.error("FB ERROR:", err.response?.data || err.message));
}

// ==============================
// 📤 GỬI THÔNG BÁO TELEGRAM
// ==============================
function sendToTelegram(text) {
    axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
            chat_id: TELEGRAM_CHAT_ID,
            text
        }
    )
        .then(() => console.log("Telegram sent"))
        .catch(err => console.error("TELE ERROR:", err.response?.data || err.message));
}

// ==============================
// 🚀 START SERVER
// ==============================
app.listen(3000, () => console.log("Server running on port 3000"));
