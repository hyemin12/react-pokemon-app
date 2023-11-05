import { useCallback, useState } from "react";
import { PokemonNameAndUrl } from "../types/PokemonData";
import AutoComplete from "./AutoComplete";

interface AutoCompleteProps {
  allPokemons: PokemonNameAndUrl[];
  setDisplayedPokemons: React.Dispatch<
    React.SetStateAction<PokemonNameAndUrl[]>
  >;
}

// 자동 완성 기능 (프론트에서 먼저 모든 포켓몬의 데이터를 가지고 있어야 함)
const SearchBox = ({
  allPokemons,
  setDisplayedPokemons,
}: AutoCompleteProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  const pokemonNamesFilter = (query: string) => {
    const value = query.toLowerCase();
    return value ? allPokemons.filter((e) => e.name.includes(value)) : [];
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    const query = searchTerm.trim();
    const searchResult = pokemonNamesFilter(query);
    setDisplayedPokemons(searchResult);
    setSearchTerm("");
  };

  const equalNameCheck = (query: string) => {
    const filteredArray = pokemonNamesFilter(query);

    return filteredArray[0]?.name === query ? [] : filteredArray;
  };

  const equalNameClick = (query: string) => {
    setSearchTerm(query);
  };

  const searchTermOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const reg = /^[a-zA-Z]*$/;
      if (reg.test(value)) {
        setSearchTerm(value);
        setValidationMessage(null);
      } else {
        setValidationMessage("영문만 입력 가능합니다.");
      }
    },
    [searchTerm]
  );

  return (
    <div className="relative z-50">
      <div className="relative  w-[30.5rem] h-10 rounded-lg m-auto mb-3">
        <form
          className="flex justify-center items-center"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={searchTermOnChange}
            className="text-lg w-[30.5rem] h-10 px-2 py-1 bg-[hsl(214,13%,47%)] rounded-2xl  text-gray-300 text-center"
            required
          />
          <button
            type="submit"
            className="text-xs bg-slate-900  text-slate-300 w-[3rem] h-10 px-2 py-1 rounded-r-2xl text-center absolute right-0 hover:bg-slate-700"
          >
            검색
          </button>
        </form>
        {validationMessage && (
          <span className="text-rose-500 text-sm">{validationMessage}</span>
        )}
      </div>
      {equalNameCheck(searchTerm).length > 0 && (
        <div
          className={`w-full flex bottom-0 h-0 flex-col absolute justify-center items-center translate-y-2`}
        >
          <AutoComplete
            searchTerm={searchTerm}
            equalNameCheck={equalNameCheck}
            equalNameClick={equalNameClick}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBox;
