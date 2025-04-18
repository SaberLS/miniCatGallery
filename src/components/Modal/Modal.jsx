import React, { useState } from "react";
import "./Modal.css";

export default function Modal({ active, image, close }) {
  const [open, setOpen] = useState(true);

  return active ? (
    <div className="modal-conatiner">
      <div
        className={`modal ${open ? "" : "close"}`}
        onClick={() => {
          console.log("click");
          document.body.classList.add("no-scroll");
          setOpen(false);
          setTimeout(() => {
            close();
            setOpen(true);
            document.body.classList.remove("no-scroll");
          }, 300);
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
