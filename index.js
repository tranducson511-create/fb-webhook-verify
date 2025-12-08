// index.js (ESM)
import express from "express";

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN ?? "ongchu123";
const ZAPIER_URL = process.env.ZAPIER_URL ?? "";
const PORT = process.env.PORT ?? 10000;

app.get("/", (req, res) => res.send("fb-webhook-verify OK"));

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  console.log("VERIFY REQUEST:", { mode, token, challenge });

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED!");
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

app.post("/webhook", async (req, res) => {
  try {
    console.log("EVENT RECEIVED:", JSON.stringify(req.body));
    if (!ZAPIER_URL) {
      console.error("ZAPIER_URL is not set in environment variables.");
    } else {
      console.log("Forwarding to Zapier:", ZAPIER_URL);
      const r = await fetch(ZAPIER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      let text;
      try { text = await r.text(); } catch (e) { text = "<no body>"; }
      console.log("FORWARDED TO ZAPIER", r.status, text);
    }
  } catch (err) {
    console.error("FORWARD ERROR:", err);
  }
  // Always respond 200 so Facebook doesn't retry aggressively
  return res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
