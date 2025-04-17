import { useState, useEffect } from "react";
import fetchCats from "../CatService.mjs";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FetchButton from "../CatButton/CatButton";

function App() {
  const [loading, setLoading] = useState(false);
  const [cats, setCats] = useState([]);

  async function getCats(catAmount) {
    setLoading(true);
    setCats(await fetchCats(catAmount));
    setLoading(false);
  }

  useEffect(() => {
    getCats();
  }, []);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <FetchButton
          onClick={getCats}
          loading={loading}
          message={"Refresh Cats"}
        />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
