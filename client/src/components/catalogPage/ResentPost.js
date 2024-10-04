import { Link } from "react-router-dom";
import "./resentPost.scss";

import Moment from "react-moment";

const ResentPost = ({ id, createdAt, name, picture, description }) => {
  return (
    <div className="recent-post">
      <div className="recent-post__preview">
        <img src={`http://localhost:3002/${picture[0]}`} alt="" />
      </div>

      <div className="recent-post__content">
        <span className="recent-post__data">
          {<Moment format="DD MMMM YYYY">{createdAt}</Moment>}
        </span>
        <Link to={`/blog/${id}`} className="recent-post__link">
          <h3>{name.slice(0, 70) + "..."}</h3>

          {/* <p>{description}</p> */}
        </Link>
      </div>
    </div>
  );
};

export default ResentPost;
