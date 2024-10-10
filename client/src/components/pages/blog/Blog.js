import "./blog.scss";
import imgPlaceholder from "../../../resources/img/blog/blog-img-placeholder.jpg";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Moment from "react-moment";

import { getAllPosts } from "../../adminPanel/addPostsForm/postSlice";
import Button from "../../buttons/Buttons";
import RecentPost from "../../blogPage/RecentPost";
import pageUp from "../../../features/PageUp";
import Preloader from "../../preloader/Preloader";
import CustomScrollToTop from "../../../features/CustomScrollToTop";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, isloading, postStatus } = useSelector(
    (state) => state.postsReducer
  );
  const recentPosts = posts.slice(0, 3);

  const [transition, setTransition] = useState(false);

  const [stringNbr, setStringNbr] = useState(1);
  const [step, setStep] = useState(3);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(step);
  const [dataSort, setDataSort] = useState(1);

  const sortedByDateArr = [...posts].sort((a, b) => {
    const date1 = new Date(a.createdAt);
    const date2 = new Date(b.createdAt);

    return dataSort == 1 ? date2 - date1 : date1 - date2;
  });

  const sortedArray = sortedByDateArr.slice(firstIndex, lastIndex);

  const displayBtns = sortedArray.length < posts.length ? true : false;

  const nextPage = () => {
    if (lastIndex < posts.length) {
      setTransition(true);
      setStringNbr((stringNbr) => stringNbr + 1);

      setTimeout(() => {
        setFirstIndex(lastIndex);
        setLastIndex(Math.min(lastIndex + step, posts.length));

        setTransition(false);
      }, 500);
    }
  };

  const prevPage = () => {
    if (firstIndex > 0) {
      setTransition(true);
      setStringNbr((stringNbr) => stringNbr - 1);

      setTimeout(() => {
        setLastIndex(firstIndex);
        setFirstIndex(Math.max(firstIndex - step, 0));

        setTransition(false);
      }, 500);
    }
  };

  const onChangeQuantityPostsToPage = (e) => {
    setStep(Number(e.target.value));
    setFirstIndex(0);
    setStringNbr(1);
  };
  const onChangeDisplayPostsYoDate = (e) => {
    setDataSort(Number(e.target.value));
    setFirstIndex(0);
    setLastIndex(step);
    setStringNbr(1);
  };

  // ! ---Моє рішення
  // const nextPage = () => {

  //   if (firstIndex < posts.length - step) {
  //     setStringNbr((stringNbr) => stringNbr + 1);

  //     setFirstIndex(lastIndex);
  //     setLastIndex((lastIndex) => lastIndex + step);
  //   }
  // };
  // const prevPage = () => {
  //   if (firstIndex >= step) {
  //     setStringNbr((stringNbr) => stringNbr - 1);

  //     setFirstIndex(lastIndex - step * 2);
  //     setLastIndex((lastIndex) => lastIndex - step);
  //   }
  // };

  useEffect(() => {
    setFirstIndex(0);
    setLastIndex(step);
  }, [step]);

  useEffect(() => {
    dispatch(getAllPosts());
    pageUp();
  }, [dispatch]);

  useEffect(() => {
    pageUp();
  }, [firstIndex, lastIndex]);

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
          <div className="blog__header">
            <h1>Blog</h1>
            <div className="blog__sort">
              <button
                className="blog__show-all"
                onClick={() => {
                  setStep(posts.length);
                  setFirstIndex(0);
                }}
              >
                all
              </button>

              <select
                className="blog__select form-select "
                aria-label="Small select example"
                value={step}
                onChange={(e) => onChangeQuantityPostsToPage(e)}
              >
                <option value="" hidden>
                  qantity per page
                </option>
                <option value="3">3 per page</option>
                <option value="4">4 per page</option>
                <option value="5">5 per page</option>
                <option value="6">6 per page</option>
                <option value="8">8 per page</option>
              </select>

              <select
                className="blog__select form-select "
                aria-label="Small select example"
                onChange={(e) => onChangeDisplayPostsYoDate(e)}
              >
                <option value="" hidden>
                  sort by date
                </option>
                <option value="1">new first</option>
                <option value="2"> old first</option>
              </select>
            </div>
          </div>

          <div>
            {sortedArray.map(
              ({ picture, name, createdAt, description, _id }) => {
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
                    transition={transition}
                    imageUrl={imageUrl}
                    name={name}
                    createdAt={createdAt}
                    desc={desc}
                    id={_id}
                    navigate={navigate}
                    displayBtns={displayBtns}
                  />
                );
              }
            )}
          </div>

          {displayBtns && (
            <div className="blog__nav">
              <Button
                className="grey-stroke__black-hover"
                label="prev"
                disabled={firstIndex === 0}
                onclick={() => prevPage()}
              />

              <div style={{ color: "#9fa3a7" }}>{`${stringNbr}/${Math.ceil(
                posts.length / step
              )}`}</div>

              <Button
                className="grey-stroke__black-hover"
                label="next"
                disabled={lastIndex === posts.length}
                onclick={() => nextPage()}
              />
            </div>
          )}
        </main>
      </div>

      <CustomScrollToTop />
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
  const truncateText = (name, length = 200) => {
    return name.length >= 200 ? name.slice(0, length) + "..." : name;
  };

  return (
    // <main className="blog__content">
    <article className={`post ${transition ? "loading" : ""}`}>
      <header className="post__header">
        <div
          className="post__header-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <p className="post__meta">
          <span className="post__date">
            <Moment format="dddd, MMMM DD, YYYY">{createdAt}</Moment>
          </span>
        </p>
      </header>

      <section className="post__body">
        <NavLink to={`/blog/${id}`}>
          <h2>{truncateText(name)}</h2>
          {/* <h2>{name.length >= 200 ? name.slice(0, 200) + "..." : name}</h2> */}
        </NavLink>
        <p className="post__text">{desc}</p>
      </section>
      <Button
        className="main-yellow post__read-more"
        label="read more"
        onclick={() => navigate(`/blog/${id}`)}
      />
    </article>
    // </main>
  );
};

export default Blog;
