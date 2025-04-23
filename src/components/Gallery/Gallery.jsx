import React from "react";
import "./Gallery.css";

import GalleryImg from "../GalleryImg/GalleryImg";
import { useGallery } from "../../Contexts/GalleryContext.mjs";

export default function Gallery() {
  const { columns, images } = useGallery();

  return (
    <div className="gallery">
      {columns.map((column, i) => {
        return (
          <div key={i} className="column">
            {column.map((imageIndex) => (
              <GalleryImg
                key={imageIndex}
                imageIndex={imageIndex}
                siblings={column.length}
                onClick={images[imageIndex].onClick}
                alt={`random cat ${images[imageIndex].id}`}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
