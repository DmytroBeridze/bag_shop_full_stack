import "./BlogNavbarDropdown.scss";
import imgPlaceholder from "../../resources/img/blog/blog-img-placeholder.jpg";

import { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// TODO---де викликати useSelector, тут, чи в Header?

const BlogNavbarDropdown = memo(() => {
  const { posts } = useSelector((state) => state.postsReducer);
  console.log(posts);

  return (
    <main className="blogNavbarDropdown">
      <ul className="blogNavbarDropdown__list">
        <li>
          <article className="blogNavbarDropdown__card">
            <div className="blogNavbarDropdown__picture">
              <img src={imgPlaceholder} alt="" />
            </div>
            <div className="blogNavbarDropdown__date">august 28, 2017</div>
            <h1 className="blogNavbarDropdown__header">
              We provide only branded goods - that's a part of our official
              policy
            </h1>
            <p className="blogNavbarDropdown__text">
              Even if you are not the biggest fan of fashion, our shop can still
              offer you some special propositions. What we sell are not just
              simple handbags; the products of our shop are the part of a style
              because...
            </p>
            <Link>
              <span className="blogNavbarDropdown__read-more">read more</span>
            </Link>
          </article>
        </li>

        <li>
          <article className="blogNavbarDropdown__card">
            <div className="blogNavbarDropdown__picture">
              <img src={imgPlaceholder} alt="" />
            </div>
            <div className="blogNavbarDropdown__date">august 28, 2017</div>
            <h1 className="blogNavbarDropdown__header">
              We provide only branded goods - that's a part of our official
              policy
            </h1>
            <p className="blogNavbarDropdown__text">
              Even if you are not the biggest fan of fashion, our shop can still
              offer you some special propositions. What we sell are not just
              simple handbags; the products of our shop are the part of a style
              because...
            </p>
            <Link>read more</Link>
          </article>
        </li>
        <li>
          <article className="blogNavbarDropdown__card">
            <div className="blogNavbarDropdown__picture">
              <img src={imgPlaceholder} alt="" />
            </div>
            <div className="blogNavbarDropdown__date">august 28, 2017</div>
            <h1 className="blogNavbarDropdown__header">
              We provide only branded goods - that's a part of our official
              policy
            </h1>
            <p className="blogNavbarDropdown__text">
              Even if you are not the biggest fan of fashion, our shop can still
              offer you some special propositions. What we sell are not just
              simple handbags; the products of our shop are the part of a style
              because...
            </p>
            <Link>read more</Link>
          </article>
        </li>
      </ul>
    </main>
  );
});

export default BlogNavbarDropdown;
