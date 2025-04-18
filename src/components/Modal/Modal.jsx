import React, { useState } from "react";
import "./Modal.css";

export default function Modal({ active, image, close }) {
  const [open, setOpen] = useState(true);

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
          className="modal-hero"
          src={image}
          alt="img"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  ) : (
    ""
  );
}
