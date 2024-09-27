import "./latestFromBlog.scss";
import testImage from "../../../resources/img/home/featured-backpack.png";
import testImage2 from "../../../resources/img/home/classic-bag.jpg";

import Button from "../../buttons/Buttons";
const LatestFromBlog = () => {
  return (
    <>
      <section className="latestFromBlog ">
        <div className="main-container">
          <h2>Latest From the Blog</h2>

          <div className="latestFromBlog__container">
            <div className="latestFromBlog__text-content">
              <p className="latestFromBlog__date">August 28, 2017</p>
              <h3 className="latestFromBlog__title">
                We provide only branded goods - that's a part of our...
              </h3>
              <p className="latestFromBlog__description">
                Even if you are not the biggest fan of fashion, our shop can
                still offer you some special propositions.   What we sell are
                not just simple handbags; the products...
              </p>
              <Button
                className="yellow-stroke latestFromBlog__button"
                label="read more"
                onclick={() => console.log("!!!")}
              />
            </div>

            <div className="latestFromBlog__photo-content">
              <img src={testImage2} alt="latestFromBlog__photo-content" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestFromBlog;
