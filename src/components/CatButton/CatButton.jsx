import React from "react";
import "./CatButton.css";
import Loader from "./Loader/Loader";

export default function CatButton({ onClick, message, loading, styles }) {
  return (
    <button
      className="cat-btn"
      disabled={loading}
      type="button"
      style={styles}
      onClick={() => onClick()}
    >
      {loading ? <Loader /> : message}
    </button>
  );
}
