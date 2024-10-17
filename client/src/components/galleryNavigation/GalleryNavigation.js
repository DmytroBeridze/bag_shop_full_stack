import "./galleryNavigation.scss";

import Button from "../buttons/Buttons";

const GalleryNavigation = ({
  firstIndex,
  lastIndex,
  stringNbr,
  arr,
  quantity,
  prevPage,
  nextPage,
}) => {
  return (
    <div className="gallery-nav">
      <Button
        className="grey-stroke__black-hover"
        label="prev"
        disabled={firstIndex === 0}
        onclick={() => prevPage()}
      />

      <div style={{ color: "#9fa3a7" }}>{`${stringNbr}/${Math.ceil(
        arr.length / quantity
      )}`}</div>

      <Button
        className="grey-stroke__black-hover"
        label="next"
        disabled={lastIndex >= arr.length}
        onclick={() => nextPage()}
      />
    </div>
  );
};

export default GalleryNavigation;
