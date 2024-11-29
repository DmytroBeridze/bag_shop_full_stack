import "./collections.scss";

import { useSelector } from "react-redux";

import CollectionCard from "./CollectionCard";
import Preloader from "../preloader/Preloader";

const Collections = () => {
  const { goods, isloading, status } = useSelector(
    (state) => state.galleryReducer
  );

  const collectionElements = (arr) => {
    //   ----shuffling
    const shuffling = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    if (arr.length) {
      const elements = ["bags", "backpacks", "handbags", "wallets"];

      const filteredElements = elements.map((elem) => {
        const filteredByType = shuffling(
          arr.filter((item) => item.mainType === elem)
        );

        return { ...filteredByType[0], dataLength: filteredByType.length };
      });
      return filteredElements;
    }
  };

  const productsByType = collectionElements(goods);

  if (isloading || goods.length === 0) {
    return (
      <div style={{ paddingTop: "213px" }}>
        <Preloader />
      </div>
    );
  }
  if (status) {
    return (
      <div style={{ paddingTop: "150px", height: "100vh" }}>
        <h5 className="text-center mt-5 mb-5 text-danger">Loading error...</h5>
      </div>
    );
  }

  return (
    <section className="collection">
      <h1 className="collection__title">Collections</h1>
      <ul className="collection__list">
        {productsByType &&
          productsByType.map(({ _id, ...param }) => {
            return (
              <li key={_id}>
                <CollectionCard id={_id} {...param} />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default Collections;
