import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpMail(to, code) {
  const html = `
    <div style="font-family: Arial, sans-serif">
      <h2>Kode Verifikasi Reset Password</h2>
      <p>Gunakan kode berikut untuk mengganti password Anda (berlaku 10 menit):</p>
      <div style="font-size: 26px; letter-spacing: 6px; font-weight: bold">${code}</div>
      <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
    </div>`;
    
  await mailer.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: "Kode Verifikasi Reset Password",
    html,
  });
}
