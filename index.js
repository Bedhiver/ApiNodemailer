"use strict";
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extend: false,
  })
);
app.use(express.json());

let transporter = nodemailer.createTransport({
  // service: "gmail",
  host: "ssl0.ovh.net",
  port: 587,
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

app.get("/cv", (req, res) => {
  const file = `${__dirname}/resources/CVJavascript.pdf`;
  console.log(file);
  res.download(file);
});

app.post("/send", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Data : ", req.body);

  let mailOptions = {
    sender: name,
    from: "contact-pro@francisco-fernandez.fr",
    to: "francisco59553@gmail.com",
    subject: `${name} - ${email}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Internal error", error: `${err}` });
      console.log(`Error : ${err}`);
    } else {
      console.log("Email sent !");
      res.status(200).json({ message: "Email sent" });
    }
  });
});

app.listen(PORT, () => {
  console.log("Server starting on PORT, ", 8080);
});
