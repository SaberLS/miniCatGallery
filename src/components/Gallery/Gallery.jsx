import React, { useEffect, useMemo, useState } from "react";
import "./Gallery.css";
import useScreenSize from "../useScreenSize.mjs";
import GalleryImg from "../GalleryImg/GalleryImg";
import splitIntoParts from "../splitIntoParts.mjs";

export default function Gallery({ images, columnsAmount }) {
  const [columns, setColumns] = useState([]);
  const screenSize = useScreenSize();
  const [fade, setFade] = useState(true);

  const mapBreakPoints = useMemo(() => {
    return Object.keys(columnsAmount)
      .map((key) => {
        return { breakOn: Number(key), columnsAmount: columnsAmount[key] };
      })
      .sort((l, r) => r.breakOn - l.breakOn);
  }, [columnsAmount]);

  const getBreakPoint = useMemo(() => {
    const breakPoints = mapBreakPoints;
    let i = 0;
    for (i; i < breakPoints.length; ++i) {
      // console.log(breakPoints[i], screenSize.width);
      if (breakPoints[i].breakOn <= screenSize.width) {
        break;
      }
    }
    return breakPoints[i];
  }, [mapBreakPoints, screenSize]);

  const splitIntoColumns = useMemo(() => {
    const { columnsAmount } = getBreakPoint;
    return splitIntoParts(
      images,
      columnsAmount > images.length ? images.length : columnsAmount
    );
  }, [images, getBreakPoint]);

  useEffect(() => {
    setFade(false);
    const newColumns = splitIntoColumns;

    const t = setTimeout(() => {
      setFade(true);
      setColumns(newColumns);
    }, 350);

    return () => clearTimeout(t);
  }, [splitIntoColumns]);

  return (
    <div className={`gallery ${fade ? "fade-in" : "fade-out"}`}>
      {columns.map((column, i) => (
        <div key={i} className="column">
          {column.map((image, j) => (
            <GalleryImg
              key={image.id}
              shareHeightWith={column.length}
              onClick={image.onClick}
              src={image.url}
              alt={`random cat ${i}${j}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
