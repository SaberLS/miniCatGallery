import { useEffect, useReducer, useRef } from "react";
import { GalleryContext, GalleryDispatchContext } from "./GalleryContext.mjs";
import galleryReducer from "./GalleryReducer.mjs";
import useElementSize from "./useElementSize.mjs";

const initialGallery = {
  images: [],
  breakPoints: [
    [300, 3],
    [0, 2],
  ],
  columns: [],
  breakAt: 0,
};

export default function GalleryProvider({ children, images, breakPoints }) {
  const [gallery, dispatch] = useReducer(galleryReducer, initialGallery);

  const containerRef = useRef(null);
  const gallerySize = useElementSize(containerRef);

  useEffect(() => {
    dispatch({ type: "setSize", payload: gallerySize });
    dispatch({ type: "break" });
  }, [gallerySize]);

  useEffect(() => {
    dispatch({ type: "newImages", payload: images });
  }, [images]);

  useEffect(() => {
    dispatch({ type: "setColumns" });
  }, [gallery.images.length]);

  useEffect(() => {
    dispatch({ type: "setBreakPoints", payload: breakPoints });
  }, [breakPoints]);

  useEffect(() => {
    dispatch({ type: "break" });
  }, [gallery.breakPoints]);

  useEffect(() => {
    dispatch({ type: "setColumns" });
  }, [gallery.breakAt]);

  return (
    <GalleryContext.Provider value={gallery}>
      <GalleryDispatchContext.Provider value={dispatch}>
        <div ref={containerRef} className="gallery-container">
          {children}
        </div>
      </GalleryDispatchContext.Provider>
    </GalleryContext.Provider>
  );
}
