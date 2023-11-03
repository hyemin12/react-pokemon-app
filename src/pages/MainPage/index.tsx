import { useState, useEffect } from "react";
import axios from "axios";
import PokeCard from "../../components/PokeCard";
import SearchBox from "../../components/SearchBox";
import { BASE_URL } from "../../api/const";
import { PokemonData, PokemonNameAndUrl } from "../../types/PokemonData";
import LoaderPokeball from "../../components/LoaderPokeball";
import Button from "../../components/Button";

const MainPage = () => {
  // 모든 포켓몬 데이터
  const [allPokemons, setAllPokemons] = useState<PokemonNameAndUrl[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 실제로 보여주는 포켓몬 리스트
  const [displayedPokemons, setDisplayedPokemon] = useState<
    PokemonNameAndUrl[]
  >([]);

  const limitNumber = 20;
  const url = BASE_URL + "?limit=1008&offset=0";

  useEffect(() => {
    fetchPokeData();
  }, []);

  const fetchPokeData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<PokemonData>(url);

      const allPokemonsResponse = data.results;

      // 모든 포켓몬 저장
      setAllPokemons(allPokemonsResponse);

      //   첫 렌더 시 보여줄 리스트
      const filteredPokemons = filterDisplayedPokemonData(allPokemonsResponse);

      setDisplayedPokemon(filteredPokemons);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterDisplayedPokemonData = (
    allPokemonsData: PokemonNameAndUrl[],
    displayedPokemons: PokemonNameAndUrl[] = []
  ) => {
    const limit = displayedPokemons.length + limitNumber;
    const array = allPokemonsData.filter((_, idx) => idx + 1 <= limit);
    return array;
  };

  const pokemonGetMoreHandler = () => {
    const filteredPokemons = filterDisplayedPokemonData(
      allPokemons,
      displayedPokemons
    );

    setDisplayedPokemon(filteredPokemons);
  };

  if (isLoading) return <LoaderPokeball />;

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        <SearchBox
          allPokemons={allPokemons}
          setDisplayedPokemons={setDisplayedPokemon}
        />
      </header>
      <section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl ">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map(({ url, name }: PokemonNameAndUrl) => (
              <PokeCard url={url} name={name} key={url} />
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
          <div className="mx-auto my-5">
            <Button text={"더보기"} actions={pokemonGetMoreHandler} />
          </div>
        )}
    </article>
  );
};

export default MainPage;
