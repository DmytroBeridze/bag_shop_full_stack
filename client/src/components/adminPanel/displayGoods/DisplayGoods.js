import "./displayGoods.scss";

import { GrEdit } from "react-icons/gr";
import { FiTrash2 } from "react-icons/fi";

import Table from "react-bootstrap/Table";
import NoImage from "../noImage/NoImage";
import { deleteGoods } from "../../pages/admin/adminSlice";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const DisplayGoods = ({ imageModal }) => {
  const { goods } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();

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
    </section>
  );
};

const View = ({
  // photoZoom,
  imageRef,
  cancellPhotoZoom,
  imageModal,
  name,
  dispatch,
  ...args
}) => {
  const { description, picture, parameters, _id } = args;
  const { price } = JSON.parse(parameters);

  const formData = new FormData();
  formData.append("id", _id);
  formData.append("picture", JSON.stringify(picture));

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
          {picture ? (
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

      <td>{price}</td>
      <td>
        <div className=" d-flex flex-column  align-items-center gap-2">
          <div
            className="table__delete "
            onClick={() => dispatch(deleteGoods(formData))}
          >
            <FiTrash2 size={"23px"} />
          </div>
          <div className="table__edit ">
            <GrEdit size={"20px"} />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default DisplayGoods;
