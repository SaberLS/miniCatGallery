import { useState, useEffect } from "react";
import fetchCats from "../CatService.mjs";
import "./App.css";
import FetchButton from "../CatButton/CatButton";
import Gallery from "../Gallery/Gallery";
import preloadImage from "../preloadImage.mjs";

function App() {
  const [loading, setLoading] = useState(false);
  const [cats, setCats] = useState([]);

  async function getCats(catAmount) {
    setLoading(true);
    const newCats = await fetchCats(catAmount);

    // Get pictures with the highest quality
    newCats.sort((l, r) => r.height * r.width - l.height * r.width);

    const bestCats = newCats.slice(0, 6);
    await Promise.all(bestCats.map((cat) => preloadImage(cat)));

    setCats(bestCats);
    // console.log({ bestCats });
    setLoading(false);
  }

  useEffect(() => {
    getCats();
  }, []);

  return (
    <>
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
