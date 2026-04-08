import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const port = Number(process.env.PORT || 8787);
const allowOrigin = process.env.ALLOW_ORIGIN || '*';

app.use(cors({ origin: allowOrigin }));
app.use(express.json({ limit: '64kb' }));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || 'false') === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const limiter = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const slot = limiter.get(ip) || { count: 0, resetAt: now + 60_000 };
  if (now > slot.resetAt) {
    limiter.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (slot.count >= 8) return true;
  slot.count += 1;
  limiter.set(ip, slot);
  return false;
}

function cleanText(input) {
  return String(input || '').replace(/\r/g, '').trim();
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  if (isRateLimited(String(ip))) {
    return res.status(429).json({ ok: false, error: 'too_many_requests' });
  }

  const name = cleanText(req.body?.name);
  const email = cleanText(req.body?.email);
  const message = cleanText(req.body?.message);
  const lang = cleanText(req.body?.lang || 'zh').slice(0, 8);

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'missing_fields' });
  }
  if (name.length > 120 || email.length > 180 || message.length > 5000) {
    return res.status(400).json({ ok: false, error: 'payload_too_large' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }

  const to = 'rayawa.work@outlook.com';

  const subject = `[Rayawa Contact] ${name} <${email}>`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Language: ${lang}`,
    '',
    'Message:',
    message,
  ].join('\n');

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      replyTo: email,
      subject,
      text,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error('send mail failed', err);
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }
});

app.listen(port, () => {
  console.log(`contact backend listening on ${port}`);
});
