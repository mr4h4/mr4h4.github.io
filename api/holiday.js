export default async function handler(req, res) {
  try {
    const API_URL = process.env.API_URL; 
    const response = await fetch(API_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch holiday' });
  }
}