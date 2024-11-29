import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
const MAIL_PASS = process.env.MAIL_PASS;
sgMail.setApiKey(MAIL_PASS);

const sendMail = async (contact, type) => {
  const deserialisedOrder = contact.order && JSON.parse(contact.order);

  const tableRows =
    contact.order &&
    deserialisedOrder
      .map(({ counter, mainType, name, price, totalPrice }) => {
        return `<tr>
    <td style="border: 1px solid grey; text-align: start; padding: 10px;">${name}</td>
          <td style="border: 1px solid grey; text-align: center; padding: 10px;">${mainType}</td>
          <td style="border: 1px solid grey; text-align: center; padding: 10px;">${counter}</td>
          <td style="border: 1px solid grey; text-align: center; padding: 10px;">${price}</td>
          <td style="border: 1px solid grey; text-align: center; padding: 10px;">${totalPrice}</td>
    </tr>`;
      })
      .join("");

  const msg =
    type === "order"
      ? {
          from: " Bag shop <ber_dev17@outlook.com>",
          to: "contentmanager150@gmail.com",
          subject: "User contact",
          html: `
          <div>
          <h2>User ${contact.name} sent his contact:</h2>
              <ul>
              <li>Name: ${contact.name ? contact.name : "no name"}</li>
              <li>Last name: ${
                contact.lastName ? contact.lastName : "no last name"
              }</li>
              <li>Email: ${contact.email ? contact.email : "no email"}</li>
              <li>Phone: ${contact.phone ? contact.phone : "no phone"}</li>
              <li>Country: ${
                contact.country ? contact.country : "no country"
              }</li>
              <li>ZIP: ${contact.zip ? contact.zip : "no zip"}</li>
              <li>City: ${contact.city ? contact.city : "no city"}</li>
              <li>Apartment: ${
                contact.apartment ? contact.apartment : "no apartment"
              }</li>
              <li>Message: ${
                contact.message ? contact.message : "no message"
              }</li>
              </ul>

          <h2> make an order:</h2>
            <table style="border: 1px solid grey; text-align: center; width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="border: 1px solid grey; text-align: center; padding: 10px;">Name</th>
                  <th style="border: 1px solid grey; text-align: center; padding: 10px;">Type</th>
                  <th style="border: 1px solid grey; text-align: center; padding: 10px;">Counter</th>
                  <th style="border: 1px solid grey; text-align: center; padding: 10px;">Price</th>
                  <th style="border: 1px solid grey; text-align: center; padding: 10px;">Total Price</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows} 
              </tbody>
              <tfoot>
                <tr>
                  <th colspan="4" style="border: 1px solid grey; text-align: center; padding: 10px;">All goods price</th>
                  <td style="border: 1px solid grey; text-align: center; padding: 10px;">${
                    contact.allGoodsPrice
                  }</td>
                </tr>
              </tfoot>
            </table>
              </div>
            `,
        }
      : {
          from: " Bag shop <ber_dev17@outlook.com>",
          to: "contentmanager150@gmail.com",
          subject: "User contact",
          html: `<h2> User ${contact.name} sent his contact:</h2>
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
