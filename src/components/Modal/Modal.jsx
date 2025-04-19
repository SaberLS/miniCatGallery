import React, { useEffect, useRef, useState } from "react";
import "./Modal.css";
import CatButton from "../CatButton/CatButton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Modal({ active, image, images, close }) {
  const [open, setOpen] = useState(true);
  const [current, setCurrent] = useState(0);
  const [shoowIn, setShoowIn] = useState(false);
  const timeoutID = useRef();

  useEffect(() => {}, [image, images]);

  const move = (length, by = 0, current = 0) => {
    if (by === 0) return current;

    const newID = current + by;

    if (newID < 0) return length - 1;
    return newID % length;
  };

  const left = () => {
    clearTimeout(timeoutID.current);
    setShoowIn(false);

    timeoutID.current = setTimeout(() => {
      setCurrent(move(images.length, -1, current));
      setShoowIn(true);
    }, 350);
  };

  const right = () => {
    clearTimeout(timeoutID.current);
    setShoowIn(false);

    timeoutID.current = setTimeout(() => {
      setCurrent(move(images.length, 1, current));
      setShoowIn(true);
    }, 350);
  };

  return active ? (
    <div className="modal-conatiner">
      <div
        className={`modal ${open ? "" : "close"}`}
        onClick={() => {
          setOpen(false);
          setTimeout(() => {
            close();
            setOpen(true);
          }, 350);
        }}
      >
        <img
          className={`modal-hero ${shoowIn ? "shoowIn" : "shoowOut"}`}
          src={images[current]?.url}
          alt={`random cat ${images[current]?.id}`}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="modal-btns" onClick={(e) => e.stopPropagation()}>
          <CatButton message={<FaArrowLeft />} onClick={left} />
          <CatButton message={<FaArrowRight />} onClick={right} />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
