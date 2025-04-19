import React from "react";
import "./GalleryImg.css";

export default function GalleryImg({
  src,
  alt,
  shareHeightWith,
  onClick,
  fadeTrigger,
  fadeDelay,
}) {
  return (
    <img
      className={`gallery-img ${fadeTrigger ? "fade-in" : "fade-out"}`}
      src={src}
      alt={alt}
      style={{
        maxHeight: 100 / shareHeightWith + "%",
        animationDelay: `${fadeDelay}ms`,
      }}
      onClick={() => onClick()}
    />
  );
}
