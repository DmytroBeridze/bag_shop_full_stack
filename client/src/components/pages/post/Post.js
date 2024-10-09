import "./post.scss";
import imgPlaceholder from "../../../resources/img/blog/blog-img-placeholder.jpg";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Moment from "react-moment";

import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import Button from "../../buttons/Buttons";
import RecentPost from "../../blogPage/RecentPost";
import pageUp from "../../../features/PageUp";
import Preloader from "../../preloader/Preloader";

const Post = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { posts, isloading, postStatus } = useSelector(
    (state) => state.postsReducer
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    dispatch(getAllPosts());
    pageUp();
  }, [dispatch]);

  useEffect(() => {
    if (posts.length) {
      setTransition(true);
      setTimeout(() => {
        setCurrentIndex(posts.findIndex((elem) => elem._id === id));
        setTransition(false);
      }, 500);
    }
  }, [id, posts]);

  if (isloading || posts.length === 0 || currentIndex < 0) {
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

  // if (posts.length !== 0 && currentIndex >= 0) {
  const recentPosts = posts.filter((elem) => elem._id !== id).slice(0, 3);

  const currentPost = posts[currentIndex];
  const { name, description, createdAt, picture } = currentPost;

  const subtitle = description.split(".")[0];
  const desc = description.split(".").slice(1);
  const imageUrl = picture.length
    ? `http://localhost:3002/${picture[0]}`
    : imgPlaceholder;

  const goToPost = (direction) => {
    pageUp();
    let newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex < posts.length) {
      setTransition(true);
      setTimeout(() => {
        setCurrentIndex(newIndex);
        setTransition(false);
      }, 500);
    }
  };

  return (
    <div className="post-page">
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

        <main className="post-page__content">
          <article className={`post-page__post ${transition ? "loading" : ""}`}>
            <header className="post-page__header">
              <div
                className="post-page__header-image"
                style={{ backgroundImage: `url(${imageUrl})` }}
              >
                <h2>
                  {name.length >= 200 ? name.slice(0, 200) + "..." : name}
                </h2>
              </div>
              <p className="post-page__meta">
                <span className="post-page__date">
                  <Moment format="dddd, MMMM DD, YYYY">{createdAt}</Moment>
                </span>
              </p>
            </header>

            <section className="post-page__body">
              <h3 className="post-page__subtitle">{subtitle}</h3>
              <p className="post-page__text">{desc}</p>
            </section>
          </article>
          <nav className="post-page__nav">
            <Button
              label="preview post"
              className="main-yellow"
              onclick={() => goToPost(-1)}
              disabled={currentIndex === 0}
            />
            <div style={{ color: "#9fa3a7" }}>{`${currentIndex + 1}/${
              posts.length
            }`}</div>

            <Button
              label="next post"
              className="main-yellow"
              onclick={() => goToPost(+1)}
              disabled={currentIndex === posts.length - 1}
            />
          </nav>
        </main>
      </div>
    </div>
  );
  // }
};

export default Post;
