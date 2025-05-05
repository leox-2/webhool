// server.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const VERIFY_TOKEN = "123456";

app.use(bodyParser.json());

// Verification endpoint
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Handling incoming messages
app.post("/webhook", (req, res) => {
  console.log("Incoming webhook: ", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running"));
