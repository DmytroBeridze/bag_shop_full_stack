import "./BlogNavbarDropdown.scss";
import imgPlaceholder from "../../resources/img/blog/blog-img-placeholder.jpg";

import { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const BlogNavbarDropdown = memo(({ setDropdown }) => {
  const { posts } = useSelector((state) => state.postsReducer);

  return (
    <main className="blogNavbarDropdown">
      <ul className="blogNavbarDropdown__list">
        {posts
          .slice(0, 3)
          .map(({ _id, createdAt, description, name, picture }) => {
            const img = picture.length
              ? `http://localhost:3002/${picture[0]}`
              : imgPlaceholder;
            return (
              <li key={_id}>
                <article className="blogNavbarDropdown__card">
                  <div className="blogNavbarDropdown__picture">
                    <img src={img} alt="" />
                  </div>
                  <div className="blogNavbarDropdown__date">
                    <Moment format="MMMM DD, YYYY">{createdAt}</Moment>
                  </div>

                  <Link to={`/blog/${_id}`} onClick={() => setDropdown(false)}>
                    <h1 className="blogNavbarDropdown__title">{name}</h1>
                  </Link>

                  <p className="blogNavbarDropdown__text">{description}</p>

                  <Link to={`/blog/${_id}`} onClick={() => setDropdown(false)}>
                    <span className="blogNavbarDropdown__read-more">
                      read more
                    </span>
                  </Link>
                </article>
              </li>
            );
          })}
      </ul>
    </main>
  );
});

export default BlogNavbarDropdown;
