import "./latestFromBlog.scss";

import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../buttons/Buttons";
import { getPostsById } from "../../adminPanel/addPostsForm/postSlice";

const LatestFromBlog = ({ latestPost }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _id, name, description, picture, createdAt } = latestPost;
  const croppDesc = description && description.slice(0, 180) + "...";
  const croppName = name && name.slice(0, 50) + "...";

  // get post by id
  const getPost = (id) => {
    dispatch(getPostsById(id));
  };

  return (
    <>
      <section className="latestFromBlog ">
        <div className="main-container">
          <h2>Latest From the Blog</h2>

          <div className="latestFromBlog__container">
            <div className="latestFromBlog__text-content">
              <p className="latestFromBlog__date">
                {<Moment format=" MMMM D YYYY HH:mm">{createdAt}</Moment>}
                {/* {<Moment format="YYYY/MM/DD/HH:mm">{createdAt}</Moment>} */}
              </p>
              <h3 className="latestFromBlog__title">{croppName}</h3>
              <p className="latestFromBlog__description">{croppDesc}</p>
              <Button
                className="yellow-stroke latestFromBlog__button"
                label="read more"
                onclick={() => navigate(`/blog/${_id}`)}
                // onclick={() => getPost(_id)}
              />
            </div>

            <div className="latestFromBlog__photo-content">
              <img
                src={`http://localhost:3002/${picture}`}
                alt="latestFromBlog__photo-content"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestFromBlog;
