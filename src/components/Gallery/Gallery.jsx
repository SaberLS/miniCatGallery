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
  }, [mapBreakPoints, screenSize.width]);

  const splitIntoColumns = useMemo(() => {
    const { columnsAmount } = getBreakPoint;
    return splitIntoParts(
      images,
      columnsAmount > images.length ? images.length : columnsAmount
    );
  }, [images, getBreakPoint]);

  const getDelay = useMemo(() => {
    if (columns.length > 0 && columns[0].length > 0)
      return ((columns.length - 1) * 10 + (columns[0].length - 1) * 50) * 10;
  }, [columns]);

  useEffect(() => {
    setFade(false);
    const newColumns = splitIntoColumns;

    const t = setTimeout(() => {
      setFade(true);
      setColumns(newColumns);
    }, getDelay + 300);

    return () => clearTimeout(t);
  }, [splitIntoColumns, getDelay]);

  return (
    <div className="gallery">
      {(() => {
        let delay = 0;
        return columns.map((column, i) => {
          delay = i * 10;
          return (
            <div key={i} className="column">
              {column.map((image, j) => (
                <GalleryImg
                  fadeTrigger={fade}
                  fadeDelay={(delay + j * 50) * 10}
                  key={image.id}
                  shareHeightWith={column.length}
                  onClick={image.onClick}
                  src={image.url}
                  alt={`random cat ${image.id}`}
                />
              ))}
            </div>
          );
        });
      })()}
    </div>
  );
}
