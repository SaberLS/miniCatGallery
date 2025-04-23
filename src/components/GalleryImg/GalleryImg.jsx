import React, { useEffect, useState } from "react";
import "./GalleryImg.css";
import { useGallery } from "../../Contexts/GalleryContext.mjs";
import preloadImg from "../preloadImage.mjs";

export default function GalleryImg({ imageIndex, alt, siblings, onClick }) {
  const { images } = useGallery();
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloadSrc = async () => {
      try {
        await preloadImg(images[imageIndex]);
        setLoading(true);
        setTimeout(() => {
          setSrc(images[imageIndex].url);
          setLoading(false);
        }, 320);
      } catch (error) {
        console.error("Something went wrong with image", error);
      }
    };

    preloadSrc();
  }, [images[imageIndex].url]);

  return (
    <img
      className={`gallery-img ${loading ? "" : "fade-in"}`}
      src={src}
      alt={alt}
      style={{
        maxHeight: 100 / siblings + "%",
      }}
      onClick={() => onClick()}
    />
  );
}
