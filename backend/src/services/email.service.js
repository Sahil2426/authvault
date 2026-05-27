import nodemailer from "nodemailer";

let transporter;

const createTransporter = async () => {
  // Creates a free ethereal.email test account automatically
  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  console.log("Test email account:", testAccount.user);
  console.log("Test email password:", testAccount.pass);
};

const sendVerificationEmail = async (email, verificationToken) => {
  if (!transporter) await createTransporter();

  const verificationLink = `${process.env.CLIENT_URL}/api/v1/auth/verify-email/${verificationToken}`;

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your email",
    html: `<h1>Verify Your Email</h1>
           <p>Click the link below to verify your email address</p>
           <a href="${verificationLink}">Verify Email</a>
           <p>This link expires in 24 hours</p>`,
  });

  // This URL lets you preview the email in browser
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
};

export { transporter, sendVerificationEmail };
