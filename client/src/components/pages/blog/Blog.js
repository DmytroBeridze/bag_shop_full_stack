import "./blog.scss";
import imgPlaceholder from "../../../resources/img/blog/blog-img-placeholder.jpg";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Moment from "react-moment";

import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import Button from "../../buttons/Buttons";
import RecentPost from "../../catalogPage/RecentPost";
import pageUp from "../../../features/PageUp";
import Preloader from "../../preloader/Preloader";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, isloading, postStatus } = useSelector(
    (state) => state.postsReducer
  );
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [transition, setTransition] = useState(false);

  useEffect(() => {
    dispatch(getAllPosts());
    pageUp();
  }, [dispatch]);

  if (isloading || posts.length === 0) {
    // if (isloading || posts.length === 0 || currentIndex < 0) {
    return (
      <div style={{ paddingTop: "150px", height: "100vh" }}>
        <Preloader />
      </div>
    );
  }
  if (postStatus) {
    return (
      <div style={{ paddingTop: "150px", height: "100vh" }}>
        <h5 className="text-center mt-5 mb-5 text-danger">Loading error...</h5>
      </div>
    );
  }

  const recentPosts = posts.slice(0, 3);

  return (
    <div className="blog">
      <div className="main-container">
        <aside className="recent-posts">
          <h3 className="recent-posts__title">Recent Posts</h3>
          <ul>
            {recentPosts.map(({ _id, ...params }) => {
              return (
                <li key={_id}>
                  <RecentPost id={_id} {...params} />
                </li>
              );
            })}
          </ul>
        </aside>
        <main className="blog__content">
          {posts.map(({ picture, name, createdAt, description, _id }) => {
            const desc =
              description.length >= 200
                ? description.slice(0, 200) + "..."
                : description;
            const imageUrl = picture.length
              ? `http://localhost:3002/${picture[0]}`
              : imgPlaceholder;
            return (
              <View
                key={_id}
                // transition={transition}
                imageUrl={imageUrl}
                name={name}
                createdAt={createdAt}
                desc={desc}
                id={_id}
                navigate={navigate}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
};

const View = ({
  transition,
  imageUrl,
  name,
  createdAt,
  desc,
  id,
  navigate,
}) => {
  console.log(navigate);

  return (
    // <main className="blog__content">
    <article className={`blog__post ${transition ? "loading" : ""}`}>
      <header className="blog__header">
        <div
          className="blog__header-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <p className="blog__meta">
          <span className="blog__date">
            <Moment format="dddd, MMMM DD, YYYY">{createdAt}</Moment>
          </span>
        </p>
      </header>

      <section className="blog__body">
        <NavLink to={`/blog/${id}`}>
          <h2>{name.length >= 200 ? name.slice(0, 200) + "..." : name}</h2>
        </NavLink>
        {/* <h3 className="blog__subtitle">{subtitle}</h3> */}
        <p className="blog__text">{desc}</p>
      </section>
      <Button
        className="main-yellow"
        label="read more"
        onclick={() => navigate(`/blog/${id}`)}
      />
    </article>
    // </main>
  );
};

export default Blog;
