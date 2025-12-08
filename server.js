import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// GET verify
app.get("/webhook", (req, res) => {
  const verify = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (verify === "ongchu123") {
    console.log("WEBHOOK VERIFIED!");
    return res.send(challenge);
  }
  res.sendStatus(403);
});

// POST receive event & forward to Zapier
app.post("/webhook", async (req, res) => {
  console.log("EVENT RECEIVED:", JSON.stringify(req.body, null, 2));

  const zapierUrl = process.env.ZAPIER_URL;

  try {
    console.log("Forwarding to Zapier:", zapierUrl);

    const r = await fetch(zapierUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const txt = await r.text();
    console.log("FORWARDED TO ZAPIER", r.status, txt);
  } catch (err) {
    console.error("FORWARD ERROR:", err);
  }

  res.sendStatus(200);
});

app.listen(10000, () => console.log("Server running on port 10000"));
