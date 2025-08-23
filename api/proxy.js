import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const url = `https://challenge-backend.mobi7.io${req.url}`;
    const response = await fetch(url);


    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no proxy' });
  }
}
