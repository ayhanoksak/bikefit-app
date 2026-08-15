import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}`;

  await transporter.sendMail({
    from: '"BikeFit TR" <noreply@bikefittr.com>',
    to: email,
    subject: 'Hesabınızı Doğrulayın - BikeFit TR',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>BikeFit TR'ye Hoş Geldiniz!</h2>
        <p>Hesabınızı aktif hale getirmek ve e-posta adresinizi doğrulamak için lütfen aşağıdaki bağlantıya tıklayın:</p>
        <a href="${confirmLink}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px;">E-Postamı Doğrula</a>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">Eğer bu üyeliği siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
      </div>
    `,
  });
}