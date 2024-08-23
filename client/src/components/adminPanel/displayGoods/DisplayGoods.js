import "./displayGoods.scss";

import React from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { json } from "react-router-dom";
import NoImage from "../noImage/NoImage";

const DisplayGoods = () => {
  const { goods } = useSelector((state) => state.adminReducer);

  return (
    <section className="w-100  display-goods ">
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
          {goods.map(({ name, ...args }) => {
            return <View key={name} name={name} {...args} />;
          })}
        </tbody>
      </Table>
    </section>
  );
};

const View = ({ name, ...args }) => {
  const { description, picture, parameters, _id } = args;
  const { price } = JSON.parse(parameters);
  return (
    <tr>
      <td className="table__id-wrapper">
        <div className="table__id">{_id}</div>
      </td>
      <td className="table__id-name">{name}</td>
      <td>
        <div className="table__id-description">{description}</div>
      </td>

      <td>
        {picture ? (
          picture.map((elem, i) => <img src={elem} alt={name} key={i} />)
        ) : (
          <NoImage />
        )}
      </td>

      <td>{price}</td>
      <td>@mdo</td>
    </tr>
  );
};

export default DisplayGoods;

{
  /* <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr> */
}
