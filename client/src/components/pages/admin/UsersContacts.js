import DisplayUsersContacts from "../../adminPanel/displayUsersContacts/DisplayUsersContacts";

const UsersContacts = () => {
  return (
    <section className="admin ">
      <div className="admin__users-contacts ">
        <h2 className="mb-3">User contacts</h2>
        <DisplayUsersContacts />
      </div>
    </section>
  );
};

export default UsersContacts;
