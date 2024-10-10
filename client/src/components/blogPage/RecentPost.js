import "./recentPost.scss";
import imgPlaceholder from "../../resources/img/blog/blog-img-placeholder.jpg";

import { Link } from "react-router-dom";
import Moment from "react-moment";
import pageUp from "../../features/PageUp";

const ResentPost = ({ id, createdAt, name, picture, description }) => {
  const imgUrl = picture.length
    ? `http://localhost:3002/${picture[0]}`
    : imgPlaceholder;

  return (
    <div className="recent-post">
      <div className="recent-post__preview">
        <img src={imgUrl} alt={name} />
        {/* <img src={`http://localhost:3002/${picture[0]}`} alt={name} /> */}
      </div>

      <div className="recent-post__content">
        <span className="recent-post__data">
          {<Moment format="DD MMMM YYYY">{createdAt}</Moment>}
        </span>
        <Link
          to={`/blog/${id}`}
          className="recent-post__link"
          onClick={() => pageUp()}
        >
          <h3>{name.length >= 70 ? name.slice(0, 70) + "..." : name}</h3>

          {/* <p>{description}</p> */}
        </Link>
      </div>
    </div>
  );
};

export default ResentPost;
