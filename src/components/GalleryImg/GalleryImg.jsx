import React from "react";
import "./GalleryImg.css";
import useScreenSize from "../useScreenSize.mjs";

export default function GalleryImg({ src, alt, shareHeightWith }) {
  return (
    <img
      className="gallery-img"
      src={src}
      alt={alt}
      style={{
        maxHeight: 100 / shareHeightWith + "%",
      }}
    />
  );
}
