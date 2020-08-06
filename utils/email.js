const nodemailer = require('nodemailer');

// function to send emails to users
const sendEmail = async (options) => {
  // create a transporter
  const trasporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // define email options
  const mailOptions = {
    from: 'Tomiwa Obanla <obanlatomiwa@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //   html
  };
  // send the email
  await trasporter.sendMail(mailOptions);
};

module.exports = sendEmail;
