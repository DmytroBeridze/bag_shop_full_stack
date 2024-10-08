import "./displayPosts.scss";

import { GrEdit } from "react-icons/gr";
import { FiTrash2 } from "react-icons/fi";

import Table from "react-bootstrap/Table";
import NoImage from "../noImage/NoImage";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { memo, useState } from "react";

import Moment from "react-moment";

import ModalPopup from "../../modal/Modal";
import { deletePost } from "../addPostsForm/postSlice";
import EditPost from "../editPost/EditPost";

const DisplayPosts = ({ imageModal, getTargetId }) => {
  const { posts } = useSelector((state) => state.postsReducer);
  // useSelector((state) => console.log(state.postsReducer));

  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  return (
    <section className="display-posts">
      <h2 className="mb-3">Added posts</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="display-posts__id">#</th>
            <th className="display-posts__date">Date</th>
            <th className="display-posts__name">Name</th>
            <th className="display-posts__description">Description</th>
            <th className="display-posts__pictures">Pictures</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map(({ _id, ...args }) => {
              return (
                <View
                  key={_id}
                  id={_id}
                  {...args}
                  imageModal={imageModal}
                  dispatch={dispatch}
                  setModalShow={setModalShow}
                  getTargetId={getTargetId}
                  // setOneGoodsId={setOneGoodsId}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan={6}>
                <h4 className="text-center text-warning">No elements...</h4>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* modal */}
      <ModalPopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        // id={oneGoodsId}
      >
        <EditPost />
      </ModalPopup>
    </section>
  );
};

const View = memo(
  ({
    // photoZoom,
    imageRef,
    cancellPhotoZoom,
    imageModal,
    id,
    dispatch,
    setModalShow,
    getTargetId,
    // setOneGoodsId,
    ...args
  }) => {
    const { description, picture, name, createdAt } = args;

    const deleteData = {
      id,
      picture,
    };

    const dateToFormat = new Date(createdAt);
    return (
      <tr>
        <td className="table__id-wrapper">
          <div className="table__id">{id}</div>
        </td>
        <td className="table__date-wrapper">
          <div className="table__date">
            {<Moment date={dateToFormat} format="YYYY/MM/DD HH:mm" />}
          </div>
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
                      src={`http://localhost:3002/${elem}`}
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

        <td>
          <div className=" d-flex flex-column  align-items-center gap-2">
            <div
              className="table__delete"
              onClick={() => dispatch(deletePost(deleteData))}
              // onClick={() => dispatch(deleteGoods(formData))}
            >
              <FiTrash2 size={"23px"} />
            </div>
            <div
              className="table__edit"
              onClick={() => {
                setModalShow(true);
                getTargetId(id);
                // setOneGoodsId(_id);
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

export default DisplayPosts;
