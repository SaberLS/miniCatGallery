import React from "react";
import "./CatButton.css";
import Loader from "./Loader";

export default function CatButton({ onClick, message, loading }) {
  return (
    <button
      className="cat-btn"
      disabled={loading}
      type="button"
      onClick={() => onClick()}
    >
      {loading ? <Loader /> : message}
    </button>
  );
}
