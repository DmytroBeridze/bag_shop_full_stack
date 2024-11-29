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

  // delete
  async removeContact(id) {
    if (!id) {
      throw new Error("Such contact does not exist");
    }
    const contact = await ContactsSchema.findByIdAndDelete(id);
    return contact;
  }
}

export default new ContactsService();
