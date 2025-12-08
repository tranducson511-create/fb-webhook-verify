const express = require("express");
const app = express();
app.use(express.json());

const VERIFY_TOKEN = "ongchu123";

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

app.post("/webhook", (req, res) => {
    console.log("EVENT RECEIVED:", req.body);
    res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server is running on port " + PORT));
