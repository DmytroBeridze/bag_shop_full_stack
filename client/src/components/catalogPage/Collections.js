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

  //   !----моє рішення
  //   const collectionElements = (arr) => {
  //     //   ----shuffling
  //     const shuffling = (arr) => {
  //       for (let i = arr.length - 1; i > 0; i--) {
  //         let j = Math.floor(Math.random() * (i + 1));
  //         [arr[i], arr[j]] = [arr[j], arr[i]];
  //       }
  //       return arr;
  //     };

  //     if (arr.length) {
  //       let elements = [];

  //       //   -----products by type
  //       const bags = shuffling(arr.filter((elem) => elem.mainType === "bags"));

  //       const backpacks = shuffling(
  //         arr.filter((elem) => elem.mainType === "backpacks")
  //       );
  //       const handbags = shuffling(
  //         arr.filter((elem) => elem.mainType === "handbags")
  //       );
  //       const wallets = shuffling(
  //         arr.filter((elem) => elem.mainType === "wallets")
  //       );

  //       //   ---added array length parameter
  //       elements = [
  //         ...elements,
  //         { ...bags[0], dataLength: bags.length },
  //         { ...backpacks[0], dataLength: backpacks.length },
  //         { ...handbags[0], dataLength: handbags.length },
  //         { ...wallets[0], dataLength: wallets.length },
  //       ];

  //       return elements;
  //     }
  //   };
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
