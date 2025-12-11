"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express().use(bodyParser.json());

// 🔥 PAGE TOKEN THẬT CỦA ÔNG CHỦ
const PAGE_ACCESS_TOKEN =
  "EAARMY28v3qABQAIrNBiO0ABXV8ZBZCOdyzApCGWwaRLM7HvNJiIVafCJ1I2ltncmOyQKVn6NrkvhigDK1ZBTiNZAdLYLb6Gd6lZAYtZBycAvCdVvoRl6QS2ryhyFHWZAihpeEqmlZBtN8pM4YuQvZCAD4NBBo32giidz8IaMZBf7dbZBGafHCgZBdcrEHJOvBIf6jBR9FukynuEgK7X8nZCRTjCjAYsMkpAZDZD";

// 🔥 VERIFY TOKEN KHỚP VỚI FACEBOOK
const VERIFY_TOKEN = "ongchu123";

// ===============================
// 🔰 1. VERIFY WEBHOOK (FB gọi xác minh)
// ===============================
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ WEBHOOK VERIFIED!");
      res.status(200).send(challenge);
    } else {
      console.log("❌ VERIFY TOKEN SAI!");
      res.sendStatus(403);
    }
  }
});

// ===============================
// 🔰 2. NHẬN TIN NHẮN TỪ FACEBOOK
// ===============================
app.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    body.entry.forEach(entry => {
      const webhook_event = entry.messaging[0];

      console.log("📩 Nhận tin nhắn:", webhook_event);

      const sender_psid = webhook_event.sender.id;

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      }
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

// ===============================
// 🔰 3. XỬ LÝ TIN NHẮN
// ===============================
function handleMessage(sender_psid, received_message) {
  let response;

  if (received_message.text) {
    response = {
      text: `Bạn vừa gửi: "${received_message.text}"`
    };
  }

  callSendAPI(sender_psid, response);
}

// ===============================
// 🔰 4. GỬI TIN NHẮN TRẢ LỜI
// ===============================
function callSendAPI(sender_psid, response) {
  const request_body = {
    recipient: { id: sender_psid },
    message: response
  };

  request(
    {
      uri: "https://graph.facebook.com/v21.0/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body
    },
    (err, res, body) => {
      if (!err) {
        console.log("✔️ Tin nhắn đã gửi!");
      } else {
        console.error("❌ Lỗi gửi tin nhắn:", err);
      }
    }
  );
}

// ===============================
// 🔰 5. CHẠY SERVER
// ===============================
app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Server đang chạy...");
});
