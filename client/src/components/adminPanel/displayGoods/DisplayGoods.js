import "./displayGoods.scss";

import { GrEdit } from "react-icons/gr";
import { FiTrash2 } from "react-icons/fi";

import Table from "react-bootstrap/Table";
import NoImage from "../noImage/NoImage";
import { deleteGoods, getGoods } from "../../pages/admin/adminSlice";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import ModalPopup from "../../modal/Modal";
import EditeForm from "../../adminPanel/editeForm/EditeForm";
import { memo, useEffect, useState } from "react";

const DisplayGoods = ({ imageModal, getTargetId }) => {
  const requestUrl = process.env.REACT_APP_REQUEST;
  const { goods, status } = useSelector((state) => state.adminReducer);

  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch(getGoods());
  }, [dispatch, status]);

  return (
    <section className="display-goods ">
      <h2 className="mb-3">Added goods</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="display-goods__id">#</th>
            <th className="display-goods__name">Name</th>
            <th className="display-goods__description">Description</th>
            <th className="display-goods__pictures">Pictures</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(goods) && goods.length > 0 ? (
            goods.map(({ name, ...args }, i) => {
              return (
                <View
                  key={name}
                  name={name}
                  {...args}
                  imageModal={imageModal}
                  dispatch={dispatch}
                  setModalShow={setModalShow}
                  getTargetId={getTargetId}
                  requestUrl={requestUrl}
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

      {/* modal */}
      <ModalPopup show={modalShow} onHide={() => setModalShow(false)}>
        <EditeForm />
      </ModalPopup>
    </section>
  );
};

const View = memo(
  ({
    imageRef,
    cancellPhotoZoom,
    imageModal,
    name,
    dispatch,
    setModalShow,
    getTargetId,
    requestUrl,
    ...args
  }) => {
    const { description, picture, parameters, _id } = args;
    const { price } = JSON.parse(parameters);
    const deleteData = {
      id: _id,
      picture,
    };

    return (
      <tr>
        <td className="table__id-wrapper">
          <div className="table__id">{_id}</div>
        </td>
        <td className="table__name">{name}</td>
        <td className="table__description-wrapper">
          <div className="table__description">{description}</div>
        </td>

        <td className="table__img-wrapper">
          <div className="table__img-container">
            {picture && picture.length > 0 ? (
              picture.map((elem) => {
                return (
                  <div className="table__img" key={elem}>
                    <img
                      src={`${requestUrl}/${elem}`}
                      alt={name}
                      className="w-100 h-100 object-fit-cover rounded"
                      onClick={(e) => imageModal(e.target)}
                    />
                  </div>
                );
              })
            ) : (
              <NoImage />
            )}
          </div>
        </td>

        <td>{price}</td>
        <td>
          <div className=" d-flex flex-column  align-items-center gap-2">
            <div
              className="table__delete"
              onClick={() => dispatch(deleteGoods(deleteData))}
            >
              <FiTrash2 size={"23px"} />
            </div>
            <div
              className="table__edit"
              onClick={() => {
                setModalShow(true);
                getTargetId(_id);
              }}
            >
              <GrEdit size={"20px"} />
            </div>
          </div>
        </td>
      </tr>
    );
  }
);

export default DisplayGoods;
