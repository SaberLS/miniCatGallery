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

export default function Gallery({ images, columnsAmount }) {
  const [columns, setColumns] = useState([]);
  const [breakPoints, setBreakPoints] = useState([]);
  const screenSize = useScreenSize();

  useEffect(() => {
    setBreakPoints(
      Object.keys(columnsAmount)
        .map((key) => Number(key))
        .sort((l, r) => r - l)
    );
    console.log("setBreakPoints");
  }, [columnsAmount]);

  useEffect(() => {
    let closest = columnsAmount[0];
    for (let i = 1; i < breakPoints.length; ++i) {
      const current = breakPoints[i];

      if (current <= screenSize.width) {
        closest = current;
        break;
      }
    }

    console.log(closest);
    console.log({ images, columnsAmount });

    const columnsToShow =
      columnsAmount[closest] > images.length
        ? images.length
        : columnsAmount[closest];

    console.log({ columnsToShow, columnsAmount });

    setColumns(splitIntoParts(images, columnsToShow));
  }, [screenSize, breakPoints]);

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
