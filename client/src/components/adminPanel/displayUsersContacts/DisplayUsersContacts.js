import "./displayUsersContacts.scss";

import { deleteContact, getUsersContacts } from "./DisplayUsersSlice";

import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";
import Table from "react-bootstrap/esm/Table";
import Moment from "react-moment";
import { FiTrash2 } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";

const DisplayUsersContacts = () => {
  const dispatch = useDispatch();
  const { userContacts, isloading, contactsStatus } = useSelector(
    (state) => state.displayUsersReducer
  );

  // useEffect(() => {
  //   dispatch(getUsersContacts());
  // }, []);

  useEffect(() => {
    dispatch(getUsersContacts());
  }, [dispatch, contactsStatus]);

  return (
    <Table striped bordered hover className="display-contacts">
      <thead>
        <tr>
          <th className="display-contacts__id">#</th>
          <th className="display-contacts__date">Date</th>
          <th className="display-contacts__name">Name</th>
          <th className="display-contacts__email">Email</th>
          <th className="display-contacts__phone">Phone</th>
          <th className="display-contacts__message">message</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(userContacts) && userContacts.length > 0 ? (
          userContacts.map(({ _id, ...args }) => {
            return (
              <View
                key={_id}
                id={_id}
                {...args}
                // imageModal={imageModal}
                dispatch={dispatch}
                // setModalShow={setModalShow}
                // getTargetId={getTargetId}
              />
            );
          })
        ) : (
          <tr>
            <td colSpan={7}>
              <h4 className="text-center text-warning">No elements...</h4>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

const View = memo(
  ({
    // photoZoom,
    // imageRef,
    // cancellPhotoZoom,
    // imageModal,
    dispatch,
    // setModalShow,
    // getTargetId,
    // setOneGoodsId,
    id,
    ...args
  }) => {
    const { name, email, message, phone, createdAt } = args;

    // const deleteData = {
    //   id,
    //   picture,
    // };

    const dateToFormat = new Date(createdAt);
    return (
      <tr>
        <td className="contacts-table__id-wrapper">
          <div className="contacts-table__id">{id}</div>
        </td>
        <td className="contacts-table__date-wrapper">
          <div className="contacts-table__date">
            {<Moment date={dateToFormat} format="YYYY/MM/DD HH:mm" />}
          </div>
        </td>
        <td className="contacts-table__name">{name}</td>

        <td className="contacts-table__email-wrapper">
          <div className="contacts-table__email">
            {email ? email : "no email"}
          </div>
        </td>

        <td className="contacts-table__phone-wrapper">
          <div className="contacts-table__phone">{phone}</div>
        </td>
        <td className="contacts-table__message-wrapper">
          <div className="contacts-table__message">
            {message ? message : "no message"}
          </div>
        </td>

        <td className="contacts-table__icon-wrapper">
          <div className="d-flex flex-column  align-items-center  gap-2 ">
            <div
              className="contacts-table__delete"
              onClick={() => dispatch(deleteContact(id))}
              // onClick={() => dispatch(deletePost(deleteData))}
            >
              <FiTrash2 size={"23px"} />
            </div>
            {/* <div
              className="table__edit"
              onClick={() => {
                setModalShow(true);
                getTargetId(id);
              }}
            >
              <GrEdit size={"20px"} />
            </div> */}
          </div>
        </td>
      </tr>
    );
  }
);

export default DisplayUsersContacts;
