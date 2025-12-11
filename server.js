// =============================================================
// 🔥 AI CSKH VAY TIỀN – LAOBAN INDO TAIWAN
// 🔥 BẢN CHUẨN CHO RENDER – KHÔNG LỖI, KHÔNG THOÁT SỚM
// =============================================================

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const axios = require("axios");
const OpenAI = require("openai");

const app = express().use(bodyParser.json());

// ======================= CONFIG =============================
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "ongchu123";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// =============================================================
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) return res.status(200).send(challenge);
  res.sendStatus(403);
});

// =============================================================
app.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    body.entry.forEach(entry => {
      const event = entry.messaging[0];
      const psid = event.sender.id;

      if (event.message?.text) handleText(psid, event.message.text);
      if (event.message?.attachments) {
        const file = event.message.attachments[0];
        if (file.type === "image") handleImage(psid, file.payload.url);
      }
    });

    return res.status(200).send("EVENT_RECEIVED");
  }

  res.sendStatus(404);
});

// =============================================================
async function handleText(psid, msg) {
  const reply = await runAI(msg);
  sendFB(psid, reply);

  if (reply.includes("{") && reply.includes("}")) {
    sendTelegram("📌 NEW LOAN APPLICATION\n\n" + reply);
  }
}

async function runAI(text) {
  const rules = `
You are an AI loan assistant for LAOBAN INDO TAIWAN.
Follow all company rules to guide the customer.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: rules },
      { role: "user", content: text }
    ],
  });

  return completion.choices[0].message.content;
}

// =============================================================
async function handleImage(psid, img) {
  sendFB(psid, "Đang kiểm tra hình ảnh…");

  const prompt = `
Recognize ARC or ATM card. Return JSON:
{
 "type": "",
 "is_clear": true/false,
 "owner_name": "",
 "bank": "",
 "issues": []
}
`;

  const result = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: img } }
        ]
      }
    ]
  });

  const data = result.choices[0].message.content;

  sendFB(psid, "Kết quả kiểm tra ảnh:\n" + data);
  sendTelegram("📷 NEW IMAGE RECEIVED\n" + data + "\nURL: " + img);
}

// =============================================================
function sendFB(psid, text) {
  request(
    {
      uri: "https://graph.facebook.com/v21.0/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: { recipient: { id: psid }, message: { text } },
    },
    (err) => err && console.error("FB SEND ERROR:", err)
  );
}

// =============================================================
async function sendTelegram(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  await axios.post(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      chat_id: TELEGRAM_CHAT_ID,
      text,
    }
  );
}

// =============================================================
app.listen(process.env.PORT || 3000, () =>
  console.log("🔥 AI CSKH ĐANG CHẠY KHÔNG LỖI…")
);
