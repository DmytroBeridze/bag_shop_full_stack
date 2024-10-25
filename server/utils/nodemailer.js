import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const MAIL_PASS = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  //   port: 2525,
  port: 465,
  secure: true, // true for port 465, false for other ports

  auth: {
    user: "exadverso@ukr.net",
    pass: MAIL_PASS,
  },
});

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log("Emqil sent:", info);
  });
};

export default mailer;
