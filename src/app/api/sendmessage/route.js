import nodemailer from "nodemailer";

export async function POST(req) {
  const { email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.PASS_USER,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // atau ke email lain
    subject: `Message from ${email}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return Response.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}