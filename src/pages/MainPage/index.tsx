import { useState, useEffect } from "react";
import axios from "axios";
import PokeCard from "./PokeCard";
import SearchBox from "../../components/autocomplete/SearchBox";
import { BASE_URL } from "../../api/const";
import { PokemonData, PokemonNameAndUrl } from "../../types/PokemonData";
import LoaderPokeball from "../../components/LoaderPokeball";
import Button from "../../components/Button";
import { useAppDispatch } from "@/hooks/redux";

const MainPage = () => {
  const dispatch = useAppDispatch();
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
    dispatch(fetchPokeData);
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
    displayedPokemons: PokemonNameAndUrl[] = [],
  ) => {
    const limit = displayedPokemons.length + limitNumber;
    const array = allPokemonsData.filter((_, idx) => idx + 1 <= limit);
    return array;
  };

  const pokemonGetMoreHandler = () => {
    const filteredPokemons = filterDisplayedPokemonData(
      allPokemons,
      displayedPokemons,
    );

    setDisplayedPokemon(filteredPokemons);
  };

  if (isLoading) return <LoaderPokeball />;

  return (
    <article className="min-h-main pt-6 dark:bg-gray-800">
      <header className="z-50 flex w-full flex-col gap-2 px-4">
        <SearchBox
          allPokemons={allPokemons}
          setDisplayedPokemons={setDisplayedPokemon}
        />
      </header>
      <section className="justify-content z-0 flex flex-col items-center overflow-auto pt-6">
        <div className="flex max-w-4xl flex-row flex-wrap items-center justify-center gap-[16px] px-2 ">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map(({ url, name }: PokemonNameAndUrl) => (
              <PokeCard url={url} name={name} key={url} />
            ))
          ) : (
            <h2 className="mb-1 text-lg font-medium text-slate-900">
              포켓몬이 없습니다
            </h2>
          )}
        </div>
      </section>
      {allPokemons.length > displayedPokemons.length &&
        displayedPokemons.length !== 1 && (
          <div className="peer mx-auto py-5">
            <Button
              etcClass={"mx-auto"}
              text={"더보기"}
              actions={pokemonGetMoreHandler}
            />
          </div>
        )}
    </article>
  );
};

export default MainPage;
