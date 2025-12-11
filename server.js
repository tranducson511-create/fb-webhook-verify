// =============================================================
// 🔥 AI CSKH VAY TIỀN – LAOBAN INDO TAIWAN
// 🔥 BẢN NÂNG CẤP: NHẬN DIỆN ẢNH ARC / ATM BẰNG GPT-4o
// =============================================================

import express from "express";
import bodyParser from "body-parser";
import request from "request";
import axios from "axios";
import OpenAI from "openai";

const app = express().use(bodyParser.json());

// ======================= CONFIG =============================
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || "TOKEN_FB_PAGE";
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "ongchu123";

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  "7834095443:AAFziQxlE_FK3DHmSQurlk79h31xK_HqLuE";

const TELEGRAM_CHAT_ID =
  process.env.TELEGRAM_CHAT_ID || "8180898262";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "OPENAI_KEY";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// =============================================================
// 1. VERIFY WEBHOOK
// =============================================================
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// =============================================================
// 2. RECEIVE FACEBOOK MESSAGE (TEXT + IMAGE)
// =============================================================
app.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    body.entry.forEach((entry) => {
      const webhook_event = entry.messaging[0];
      const sender_psid = webhook_event.sender.id;

      // TEXT
      if (webhook_event.message?.text) {
        handleText(sender_psid, webhook_event.message.text);
      }

      // IMAGE
      if (webhook_event.message?.attachments) {
        const attachment = webhook_event.message.attachments[0];
        if (attachment.type === "image") {
          handleImage(sender_psid, attachment.payload.url);
        }
      }
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

// =============================================================
// 3. AI XỬ LÝ TIN NHẮN TEXT
// =============================================================
async function runAI(userMessage) {
  const rules = `
You are an AI loan assistant for LAOBAN INDO TAIWAN.  
Follow these rules STRICTLY:

1. Always speak politely.
2. Detect if customer wants a LOAN.
3. If they want loan → ask:
   - Full name
   - DOB
   - Last 3 digits ARC
   - Last 3 address numbers
   - ARC photo
   - ATM photo (blur number OK)
   - Nearest 7-11
   - Free time to meet
   - Come to office or request home-visit

4. When customer provides full info → CREATE JSON:
{
 "full_name": "",
 "dob": "",
 "arc_last3": "",
 "address_last3": "",
 "bank_name": "",
 "loan_amount": "10000",
 "monthly_interest": "400",
 "seven_eleven": "",
 "meet_time": "",
 "meet_option": "",
 "photos": { "arc": "", "atm": "" }
}

5. THEN send message:
"Your application has been submitted to staff."

6. STOP replying further until staff handles case.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: rules },
      { role: "user", content: userMessage },
    ],
  });

  return completion.choices[0].message.content;
}

async function handleText(sender_psid, message) {
  const aiReply = await runAI(message);
  sendFBMessage(sender_psid, aiReply);

  if (aiReply.includes("{") && aiReply.includes("}")) {
    sendToTelegram("📌 NEW LOAN APPLICATION\n\n" + aiReply);
  }
}

// =============================================================
// 4. AI NHẬN DIỆN ẢNH ARC / ATM
// =============================================================
async function analyzeImage(imageUrl) {
  const prompt = `
You are an AI image inspector.

Analyze the image and answer strictly in JSON:

{
 "type": "ARC or ATM or UNKNOWN",
 "is_clear": true/false,
 "owner_name": "",
 "bank_name": "",
 "issues": []
}

RULES:
- If ARC → check clarity, name, expiry, number visibility.
- If ATM → check bank name, blur card number, name visibility.
- If number fully visible → ADD ISSUE: "Card number not blurred"
- If image is blurry → ADD ISSUE: "Image too blurry, resend"
`;

  const result = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: { url: imageUrl },
          },
        ],
      },
    ],
  });

  return result.choices[0].message.content;
}

async function handleImage(sender_psid, imageUrl) {
  sendFBMessage(sender_psid, "Đang kiểm tra hình ảnh… vui lòng đợi 2–3 giây.");

  const analysis = await analyzeImage(imageUrl);

  sendFBMessage(sender_psid, "Kết quả kiểm tra ảnh:\n" + analysis);

  // Gửi về TELEGRAM
  sendToTelegram("📷 NEW IMAGE RECEIVED\n" + analysis + "\n\nURL: " + imageUrl);
}

// =============================================================
// 5. SEND MESSAGE BACK TO FACEBOOK USER
// =============================================================
function sendFBMessage(sender_psid, response) {
  const body = {
    recipient: { id: sender_psid },
    message: { text: response },
  };

  request(
    {
      uri: "https://graph.facebook.com/v21.0/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: body,
    },
    (err) => {
      if (err) console.error("FB SEND ERROR:", err);
    }
  );
}

// =============================================================
// 6. SEND TO TELEGRAM
// =============================================================
async function sendToTelegram(text) {
  await axios.post(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    { chat_id: TELEGRAM_CHAT_ID, text }
  );
}

// =============================================================
// 7. START SERVER
// =============================================================
app.listen(process.env.PORT || 3000, () =>
  console.log("🔥 AI Loan Assistant with Image Recognition is running…")
);
