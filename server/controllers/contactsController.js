import ContactsService from "../services/contactsService.js";
import sendMail from "../utils/sandGreed.js";

// post
export const postContacts = async (req, res) => {
  try {
    const contact = await ContactsService.postContact(req.body);

    // ---sending to admin email
    sendMail(contact);

    return res.status(200).json({
      message: "Sending successfull.",
      contact,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Sending error." });
  }
};

// get
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactsService.getContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// delete
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactsService.removeContact(id);
    return res.json({
      contact: contact,
      message: `Contact id: ${id} deleted`,
    });
  } catch (error) {
    res.json(error.massage);
  }
};
