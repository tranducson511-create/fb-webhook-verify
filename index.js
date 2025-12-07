const express = require("express");
const app = express();

const VERIFY_TOKEN = "ongchu123";

// Route Facebook webhook
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Server chạy trên Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server is running on port " + PORT));
