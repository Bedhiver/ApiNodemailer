"use strict";
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const router = express.Router();
const PORT = 8080;

const app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extend: false,
  })
);
app.use(express.json());

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

app.post("/send", (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("Data : ", req.body);

  let mailOptions = {
    sender: name,
    from: "francisco59553@gmail.com",
    to: "francisco59553@gmail.com",
    subject: `${email} - ${subject}`,
    text: `${name} : ${message}`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Internal error" });
      console.log(`Error : ${err}`);
    } else {
      console.log("Email sent !");
      res.status(200).json({ message: "Email sent" });
      // res.json({ status: "Email sent (response)" });
    }
  });
});

// app.post("/send", (req, res) => {
//   const { name, email, subject, message } = req.body;
//   console.log("Data : ", req.body);

//   sendMail(name, email, subject, message, function (err, data) {
//     if (err) {
//       res.status(500).json({ message: "Internal error" });
//     } else {
//       console.log(`response!!!!`);
//       res.status({ message: "Email sent" });
//       console.log(`response === ${res}`);
//     }
//   });
// });

app.listen(PORT, () => {
  console.log("Server starting on PORT, ", 8080);
});
