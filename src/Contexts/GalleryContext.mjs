import { createContext, useContext } from "react";

export const GalleryContext = createContext(null);

export const GalleryDispatchContext = createContext(null);


export function useGallery() {
  return useContext(GalleryContext);
}

export function useGalleryDispatch() {
  return useContext(GalleryDispatchContext);
}
