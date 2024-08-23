import "./displayGoods.scss";

import React from "react";
import Table from "react-bootstrap/Table";

const DisplayGoods = () => {
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
          {/* <tr>
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
          </tr> */}
        </tbody>
      </Table>
    </section>
  );
};

export default DisplayGoods;
