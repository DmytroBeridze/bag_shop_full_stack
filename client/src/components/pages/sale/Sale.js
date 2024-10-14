import "./sale.scss";

import { useEffect } from "react";

import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import { fetchAllGoods } from "../../gallery/gallerySlice";
import { useDispatch } from "react-redux";

const Sale = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllGoods());
    dispatch(getAllPosts());
  }, []);

  return (
    <div className="sale">
      <div className="main-container">
        <h1 className="sale-title">Sale</h1>
      </div>
    </div>
  );
};

export default Sale;
