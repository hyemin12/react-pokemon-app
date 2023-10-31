import { useState, useEffect } from "react";
import axios from "axios";
import PokeCard from "../../components/PokeCard";
import AutoComplete from "../../components/AutoComplete";
import { BASE_URL } from "../../api/const";

const MainPage = () => {
  // 모든 포켓몬 데이터
  const [allPokemons, setAllPokemons] = useState([]);
  // 실제로 보여주는 포켓몬 리스트
  const [displayedPokemons, setDisplayedPokemon] = useState([]);

  const limitNumber = 20;
  const url = BASE_URL + "?limit=1008&offset=0";

  const filterDisplayedPokemonData = (
    allPokemonsData,
    displayedPokemons = []
  ) => {
    const limit = displayedPokemons.length + limitNumber;
    const array = allPokemonsData.filter((_, idx) => idx + 1 <= limit);
    return array;
  };

  const fetchPokeData = async () => {
    try {
      const { data } = await axios.get(url);

      const allPokemonsResponse = data.results;

      // 모든 포켓몬 저장
      setAllPokemons(allPokemonsResponse);

      //   첫 렌더 시 보여줄 리스트
      const filteredPokemons = filterDisplayedPokemonData(allPokemonsResponse);

      setDisplayedPokemon(filteredPokemons);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokeData(true);
  }, []);

  const pokemonGetMoreHandler = () => {
    const filteredPokemons = filterDisplayedPokemonData(
      allPokemons,
      displayedPokemons
    );

    setDisplayedPokemon(filteredPokemons);
  };

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        <AutoComplete
          allPokemons={allPokemons}
          setDisplayedPokemons={setDisplayedPokemon}
        />
      </header>
      <section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map(({ url, name }) => (
              <PokeCard url={url} name={name} key={name} />
            ))
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">
              포켓몬이 없습니다
            </h2>
          )}
        </div>
      </section>
      {allPokemons.length > displayedPokemons.length &&
        displayedPokemons.length !== 1 && (
          <div className="text-center">
            <button
              onClick={pokemonGetMoreHandler}
              className="bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white"
            >
              더보기
            </button>
          </div>
        )}
    </article>
  );
};

export default MainPage;
