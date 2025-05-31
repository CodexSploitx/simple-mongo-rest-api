import dotenv from 'dotenv';
dotenv.config();

export default function authToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (token !== process.env.AUTH_TOKEN) {
    return res.status(403).json({ error: 'Invalid or unauthorized token' });
  }

  next();
}
