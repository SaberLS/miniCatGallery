import React, { useEffect, useState } from "react";
import "./Gallery.css";
import useScreenSize from "../useScreenSize.mjs";
import GalleryImg from "../GalleryImg/GalleryImg";

function splitIntoParts(arr, parts) {
  const result = [];

  const len = arr.length;
  const baseSize = Math.floor(len / parts);
  let extra = len % parts;
  let start = 0;

  for (let i = 0; i < parts; i++) {
    const size = baseSize + (extra > 0 ? 1 : 0);
    result.push(arr.slice(start, (start += size)));

    if (extra > 0) extra--;
  }

  console.log(result);
  return result;
}

export default function Gallery({ images, columnsWidth }) {
  const [columns, setColumns] = useState([]);
  const [widths, setWidths] = useState([]);
  const screenSize = useScreenSize();

  useEffect(() => {
    setWidths(
      Object.keys(columnsWidth)
        .map((key) => Number(key))
        .sort((l, r) => r - l)
    );
    console.log("setWidths");
  }, [columnsWidth]);

  useEffect(() => {
    let closest = Infinity;
    for (let i = 0; i < widths.length; ++i) {
      const current = widths[i];

      if (current <= screenSize.width) {
        closest = current;
        break;
      }
    }

    const columnsAmount =
      columnsWidth[closest] > images.length
        ? images.length
        : columnsWidth[closest];

    console.log({ columnsAmount, columnsWidth });

    setColumns(splitIntoParts(images, columnsAmount));
  }, [widths, screenSize]);

  return (
    <div className="gallery">
      {columns.map((column, i) => (
        <div key={i} className="column">
          {column.map((image, i) => (
            <GalleryImg
              key={image.id}
              shareHeightWith={column.length}
              onClick={image.onClick}
              src={image.url}
              alt={`${i}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
