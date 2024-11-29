import "./post.scss";

import imgPlaceholder from "../../../resources/img/blog/blog-img-placeholder.jpg";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";

import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import Button from "../../buttons/Buttons";
import pageUp from "../../../features/PageUp";
import Preloader from "../../preloader/Preloader";
import RecentPost from "../../blogPage/RecentPost";
import PromoProducts from "../../promoProducts/PromoProducts";

const Post = () => {
  const dispatch = useDispatch();
  const ref = useRef();

  const { id } = useParams();
  const { posts, isloading, postStatus } = useSelector(
    (state) => state.postsReducer
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(false);
  const [postHeight, setPostHeight] = useState();

  // ---findg post element height
  const updateHeight = () => {
    if (ref.current) {
      setPostHeight(ref.current.offsetHeight);
    }
  };

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

  useEffect(() => {
    updateHeight();
  }, [currentIndex]);

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

  const remainingPosts = posts.filter((elem) => elem._id !== id);
  const recentPosts =
    remainingPosts.length > 3
      ? remainingPosts.slice(0, 3)
      : remainingPosts.slice(0, remainingPosts.length);

  const currentPost = posts[currentIndex];
  const { name, description, createdAt, picture } = currentPost;

  const subtitle = description.split(".")[0];
  const desc = description.split(".").slice(1).join("");
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
    <div className="post-page" ref={ref}>
      <div className="main-container">
        <aside className="recent-posts">
          <h3 className="recent-posts__title">Recent Posts</h3>

          {/* ---recent posts */}
          <RecentPost recentPosts={recentPosts} />
          {/*---- promo products */}
          <PromoProducts elemQuantity={postHeight > 1600 ? 2 : 1} />
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
              <div className="post-page__text">
                <ReactMarkdown>{desc}</ReactMarkdown>
              </div>
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
};

export default Post;
