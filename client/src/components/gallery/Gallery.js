import "./Gallery.scss";

import GalleryCard from "./GalleryCard";

const Gallery = () => {
  return (
    <section className="gallery">
      <div className="main-container">
        <div className="gallery__gallery">
          <GalleryCard />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
