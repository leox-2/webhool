export default function handler(req, res) {
  const VERIFY_TOKEN = "123456";

  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else if (req.method === "POST") {
    console.log("Received webhook:", req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(405); // Method Not Allowed
  }
}
