import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PokeCard from "./components/PokeCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0";
  const [pokemons, setPokemons] = useState([]);

  const fetchPokeData = async () => {
    try {
      const response = await axios.get(url);

      setPokemons(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokeData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
