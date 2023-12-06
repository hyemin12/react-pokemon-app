import { useCallback, useState } from "react";
import { PokemonNameAndUrl } from "../../types/PokemonData";
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
    null,
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
    [searchTerm],
  );

  return (
    <div className="relative z-50">
      <div className="relative m-auto mb-3 h-10 w-full rounded-lg md:w-[30.5rem]">
        <form
          className="flex items-center justify-center"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={searchTermOnChange}
            className="h-10 w-full rounded-2xl bg-white px-2 py-1 text-center  text-lg text-slate-900  dark:bg-[hsl(214,13%,47%)] dark:text-gray-300 md:w-[30.5rem]"
            required
          />
          <button
            type="submit"
            className="absolute right-0 h-10 w-[3rem] rounded-r-2xl bg-slate-900 px-2 py-1 text-center text-xs text-slate-300 hover:bg-slate-700"
          >
            검색
          </button>
        </form>
        {validationMessage && (
          <span className="text-sm text-rose-500">{validationMessage}</span>
        )}
      </div>
      {equalNameCheck(searchTerm).length > 0 && (
        <div
          className={`absolute bottom-0 flex h-0 w-full translate-y-2 flex-col items-center justify-center`}
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
