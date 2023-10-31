import { useState, useEffect } from "react";
import axios from "axios";
import PokeCard from "../../components/PokeCard";

const MainPage = () => {
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
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        Input form
      </header>
      <section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {pokemons.length > 0 ? (
            pokemons.map(({ url, name }) => (
              <PokeCard url={url} name={name} key={name} />
            ))
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">
              포켓몬이 없습니다
            </h2>
          )}
        </div>
      </section>
    </article>
  );
};

export default MainPage;
