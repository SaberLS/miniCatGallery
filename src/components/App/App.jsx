import { useState, useEffect } from "react";
import fetchCats from "../CatService.mjs";
import "./App.css";
import FetchButton from "../CatButton/CatButton";
import Gallery from "../Gallery/Gallery";
import preloadImage from "../preloadImage.mjs";
import Modal from "../Modal/Modal";

function App() {
  const [loading, setLoading] = useState(false);
  const [cats, setCats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalSrc, setModalSrc] = useState("");

  const modalTurnOn = (image) => {
    setShowModal(true);
    setModalSrc(image);
  };
  const modalTurnOff = () => {
    setShowModal(false);
    setModalSrc("");
  };

  async function getCats(catAmount) {
    setLoading(true);
    const newCats = await fetchCats(catAmount);

    // Get pictures with the highest quality
    newCats.sort((l, r) => r.height * r.width - l.height * r.width);

    const bestCats = newCats.slice(0, 6);
    await Promise.all(bestCats.map((cat) => preloadImage(cat)));

    setCats(
      bestCats.map((cat) => {
        return {
          ...cat,
          onClick: modalTurnOn,
        };
      })
    );
    // console.log({ bestCats });
    setLoading(false);
  }

  useEffect(() => {
    (() => getCats())();
  }, []);

  return (
    <>
      <Modal active={showModal} image={modalSrc} close={modalTurnOff} />
      <Gallery
        columnsWidth={{
          3000: 1500,
          2000: 1000,
          1000: 500,
          500: 250,
          400: 200,
          300: 150,
          0: 100,
        }}
        images={cats}
      ></Gallery>
      <FetchButton
        onClick={getCats}
        loading={loading}
        message={"Refresh Cats"}
      />
    </>
  );
}
export default App;
