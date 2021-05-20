require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = (name, email, subject, text, cb) => {
  let mailOptions = {
    sender: name,
    from: "francisco59553@gmail.com",
    to: "francisco59553@gmail.com",
    subject: `${email} - ${subject}`,
    text: `${name} : ${text}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = sendMail;
