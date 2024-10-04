import "./post.scss";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Moment from "react-moment";

import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import Button from "../../buttons/Buttons";
import ResentPost from "../../catalogPage/ResentPost";
import pageUp from "../../../features/PageUp";

const Post = () => {
  const { id } = useParams();
  const { posts } = useSelector((state) => state.postsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [id]);

  useEffect(() => {
    pageUp();
  }, []);

  if (posts.length !== 0) {
    const recentPosts = posts.filter((elem) => elem._id !== id).slice(0, 3);
    const currentPost = posts.find((elem) => elem._id === id);
    const { name, description, createdAt, picture } = currentPost;

    const subtitle = description.split(".")[0];
    const desc = description.split(".").slice(1);
    const imageUrl = `http://localhost:3002/${picture[0]}`;

    return (
      <div className="post-page">
        <div className="main-container">
          <aside className="recent-posts">
            <h3 className="recent-posts__title">Recent Posts</h3>
            <ul>
              {recentPosts.map(({ _id, ...params }) => {
                console.log(params);
                return (
                  <li key={_id}>
                    <ResentPost id={_id} {...params} />
                  </li>
                );
              })}
            </ul>
          </aside>

          <main className="post-page__content">
            <article className="post-page__post">
              <header className="post-page__header">
                <div
                  className="post-page__header-image"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  <h2>{name}</h2>
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
              <Button label="preview post" className="main-yellow" />
              <Button label="next post" className="main-yellow" />
            </nav>
          </main>
        </div>
      </div>
    );
  }
};

export default Post;
