import ContactsService from "../services/contactsService.js";
// import mailer from "../utils/nodemailer.js";
import sendMail from "../utils/sandGreed.js";

// post
export const postContacts = async (req, res) => {
  try {
    const contact = await ContactsService.postContact(req.body);

    // ---відправка на адмін пошту
    sendMail(contact);

    //------ nodemailer
    // const message = {
    //   from: "Bag shop <exadverso@ukr.net>",
    //   to: "contentmanager150@gmail.com",
    //   subject: "User contact",
    //   //   text: "The user sent his contact",
    //   html: `<h2>The user sent his contact</h2>
    // <ul>
    // <li>Name: ${contact.name ? contact.name : "no name"}</li>
    // <li>Email: ${contact.email ? contact.email : "no email"}</li>
    // <li>Phone: ${contact.phone ? contact.phone : "no phone"}</li>
    // <li>Message: ${contact.message ? contact.message : "no message"}</li>
    // </ul>`,
    // };
    // mailer(message);

    return res.status(200).json(contact);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};
// export const postContacts = async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;
//     const contacts = await ContactsSchema.create({
//       name,
//       email,
//       phone,
//       message,
//     });

//     res.status(200).json(contacts);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// get

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactsService.getContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
