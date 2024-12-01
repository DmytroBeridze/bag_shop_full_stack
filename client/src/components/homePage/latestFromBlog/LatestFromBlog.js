import "./latestFromBlog.scss";

import Moment from "react-moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../buttons/Buttons";
import Preloader from "../../preloader/Preloader";

const LatestFromBlog = () => {
  const requestUrl = process.env.REACT_APP_REQUEST;
  const navigate = useNavigate();
  const { posts, isloading, postStatus } = useSelector(
    (state) => state.postsReducer
  );

  //------ filtered by date
  const latestPost = posts.reduce((acc, curr) => {
    return Date.parse(acc.createdAt) > Date.parse(curr.createdAt) ? acc : curr;
  }, 0);

  const { _id, name, description, picture, createdAt } = latestPost;
  const croppDesc = description && description.slice(0, 180) + "...";
  const croppName = name && name.slice(0, 50) + "...";

  if (isloading) {
    return <Preloader />;
  } else if (postStatus) {
    return (
      <h5 className="text-center mt-5 mb-5 text-danger">Loading error...</h5>
    );
  }

  return (
    <>
      <section className="latestFromBlog ">
        <div className="main-container">
          <h2>Latest From the Blog</h2>

          <div className="latestFromBlog__container">
            <div className="latestFromBlog__text-content">
              <p className="latestFromBlog__date">
                {<Moment format=" MMMM D YYYY HH:mm">{createdAt}</Moment>}
              </p>
              <h3 className="latestFromBlog__title">{croppName}</h3>
              <p className="latestFromBlog__description">{croppDesc}</p>
              <Button
                className="yellow-stroke latestFromBlog__button"
                label="read more"
                onclick={() => navigate(`/blog/${_id}`)}
              />
            </div>

            <div className="latestFromBlog__photo-content">
              <img
                src={`${requestUrl}/${picture}`}
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
