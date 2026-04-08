import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const port = Number(process.env.PORT || 8787);
const allowOrigin = process.env.ALLOW_ORIGIN || '*';
const mailTo = process.env.CONTACT_TO || 'rayawa.work@icloud.com';
const smtpHost = process.env.SMTP_HOST || 'smtp.mail.me.com';
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = String(process.env.SMTP_SECURE || 'false') === 'true';
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';

app.use(cors({ origin: allowOrigin }));
app.use(express.json({ limit: '64kb' }));

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
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

function escapeHtml(input) {
  return String(input || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  if (!smtpUser || !smtpPass) {
    return res.status(500).json({ ok: false, error: 'smtp_not_configured' });
  }

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

  const subject = `[Rayawa Contact] ${name} <${email}>`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Language: ${lang}`,
    '',
    'Message:',
    message,
  ].join('\n');
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin: 0 0 12px;">New Contact Message</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin: 0 0 8px;"><strong>Language:</strong> ${escapeHtml(lang)}</p>
      <p style="margin: 16px 0 8px;"><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">${escapeHtml(message)}</pre>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: smtpUser,
      to: mailTo,
      replyTo: email,
      subject,
      text,
      html,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error('send mail failed', err);
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }
});

app.listen(port, () => {
  console.log(`contact backend listening on ${port}, target=${mailTo}`);
});
