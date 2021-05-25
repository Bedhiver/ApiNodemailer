require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`Server is ready to take messages: ${success}`);
});

const sendMail = (resp, name, email, subject, text) => {
  let mailOptions = {
    sender: name,
    from: "francisco59553@gmail.com",
    to: "francisco59553@gmail.com",
    subject: `${email} - ${subject}`,
    text: `${name} : ${text}`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(`Error : ${err}`);
    } else {
      console.log("Email sent");
      resp.json({ status: "Email sent (response)" });
    }
  });
};

module.exports = sendMail;
