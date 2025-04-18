import { useState, useEffect } from "react";
import fetchCats from "../CatService.mjs";
import "./App.css";
import FetchButton from "../CatButton/CatButton";
import Gallery from "../Gallery/Gallery";
import preloadImage from "../preloadImage.mjs";
import Modal from "../Modal/Modal";

const columns = {
  3000: 6,
  2000: 3,
  300: 2,
  0: 1,
};

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

    if (newCats.length === 0) return 0;

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
    getCats();
  }, []);

  return (
    <>
      <Modal active={showModal} image={modalSrc} close={modalTurnOff} />
      <Gallery columnsAmount={columns} images={cats}></Gallery>
      <FetchButton
        onClick={() => getCats()}
        loading={loading}
        message={"Refresh Cats"}
      />
    </>
  );
}
export default App;
