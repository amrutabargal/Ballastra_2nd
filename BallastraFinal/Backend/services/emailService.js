import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // Check if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP configuration missing. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env file');
      throw new Error('Email service not configured. Please contact administrator.');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false // Allow self-signed certificates
      }
    });

    // Verify transporter configuration
    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"Ballastra Security" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html
    });

    console.log('Email sent successfully:', {
      to,
      subject,
      messageId: info.messageId
    });

    return info;
  } catch (error) {
    console.error('Email sending failed:', {
      to,
      subject,
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
};
