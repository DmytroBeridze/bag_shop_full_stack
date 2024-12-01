import "./recentPost.scss";
import imgPlaceholder from "../../resources/img/blog/blog-img-placeholder.jpg";

import { Link } from "react-router-dom";
import Moment from "react-moment";

import pageUp from "../../features/PageUp";

const RecentPost = ({ recentPosts }) => {
  const requestUrl = process.env.REACT_APP_REQUEST;
  return recentPosts.length ? (
    <ul>
      {recentPosts.map((elem) => {
        const { _id, createdAt, name, picture } = elem;

        const imgUrl = picture.length
          ? `${requestUrl}/${picture[0]}`
          : imgPlaceholder;
        return (
          <li key={_id}>
            <div className="recent-post">
              <div className="recent-post__preview">
                <img src={imgUrl} alt={name} />
              </div>

              <div className="recent-post__content">
                <span className="recent-post__data">
                  {<Moment format="DD MMMM YYYY">{createdAt}</Moment>}
                </span>
                <Link
                  to={`/blog/${_id}`}
                  className="recent-post__link"
                  onClick={() => pageUp()}
                >
                  <h4>
                    {name.length >= 70 ? name.slice(0, 70) + "..." : name}
                  </h4>
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  ) : null;
};

export default RecentPost;
