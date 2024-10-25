import ContactsSchema from "../models/contacts.js";
class ContactsService {
  // post
  async postContact(contact) {
    const { name, email, phone, message } = contact;
    const createdContact = await ContactsSchema.create({
      name,
      email,
      phone,
      message,
    });
    return createdContact;
  }

  // get

  async getContacts() {
    const allContacts = await ContactsSchema.find();
    return allContacts;
  }
}

export default new ContactsService();
