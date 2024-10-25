import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
const MAIL_PASS = process.env.MAIL_PASS;

sgMail.setApiKey(MAIL_PASS);

// const msg = {
//   to: "contentmanager150@gmail.com",
//   from: "ber_dev17@outlook.com", // Use the email address or domain you verified above
//   subject: "Sending with Twilio SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

const sendMail = async (contact) => {
  const msg = {
    from: " Bag shop <ber_dev17@outlook.com>", // Use the email address or domain you verified above
    to: "contentmanager150@gmail.com",
    subject: "User contact",
    html: `<h2>The user sent his contact:</h2>
    <ul>
    <li>Name: ${contact.name ? contact.name : "no name"}</li>
    <li>Email: ${contact.email ? contact.email : "no email"}</li>
    <li>Phone: ${contact.phone ? contact.phone : "no phone"}</li>
    <li>Message: ${contact.message ? contact.message : "no message"}</li>
    </ul>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email has been sent");
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};
export default sendMail;
