import React from "react";
import "./GalleryImg.css";

export default function GalleryImg({ src, alt, shareHeightWith, onClick }) {
  return (
    <img
      className="gallery-img"
      src={src}
      alt={alt}
      style={{
        maxHeight: 100 / shareHeightWith + "%",
      }}
      onClick={() => onClick(src)}
    />
  );
}
