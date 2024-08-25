import "./displayGoods.scss";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import { FiTrash2 } from "react-icons/fi";

import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import NoImage from "../noImage/NoImage";

const DisplayGoods = ({ imageModal }) => {
  const { goods } = useSelector((state) => state.adminReducer);

  // const imageRef = useRef([]);

  // const photoZoom = (target) => {
  //   console.log(target);

  //   const allImages = document.querySelectorAll(".table__img");
  //   allImages.forEach((elem) => elem.classList.remove("active"));

  //   target.classList.add("active");
  // };

  // const cancellPhotoZoom = (target) => {
  //   target.classList.remove("active");

  // };

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
          {goods.length > 0 ? (
            goods.map(({ name, ...args }, i) => {
              return (
                <View
                  key={name}
                  name={name}
                  {...args}
                  // photoZoom={photoZoom}
                  // cancellPhotoZoom={cancellPhotoZoom}
                  // imageRef={imageRef}
                  imageModal={imageModal}
                  // i={i}
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
  ...args
}) => {
  const { description, picture, parameters, _id } = args;
  const { price } = JSON.parse(parameters);
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
            picture.map((elem, ind) => {
              return (
                <div
                  className="table__img"
                  key={elem}
                  // onMouseEnter={(e) => photoZoom(e.currentTarget)}
                  // onMouseLeave={(e) => cancellPhotoZoom(e.currentTarget)}
                  // onClick={(e) => photoZoom(e.currentTarget)}
                >
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
          <div className="table__delete table__icon">
            <FiTrash2 size={"23px"} />
          </div>
          <div className="table__edit table__icon">
            <GrEdit size={"20px"} />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default DisplayGoods;
