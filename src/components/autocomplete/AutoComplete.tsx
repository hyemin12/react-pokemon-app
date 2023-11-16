import { PokemonNameAndUrl } from "../../types/PokemonData";

interface AutoCompleteProps {
  searchTerm: string;
  equalNameCheck: (query: string) => PokemonNameAndUrl[];
  equalNameClick: (query: string) => void;
}

const AutoComplete = ({
  searchTerm,
  equalNameCheck,
  equalNameClick,
}: AutoCompleteProps) => {
  return (
    <>
      <div
        className={`w-0 h-0 bottom-0 border-x-transparent border-x-8 border-b-[12px] border-b-white dark:border-b-gray-700 -translate-y-1/2`}
      ></div>
      <ul
        className={`w-full max-h-[150px] py-1 bg-white  dark:bg-gray-700 rounded-lg absolute top-0 overflow-auto scrollbar-none`}
      >
        {equalNameCheck(searchTerm).map((e, i) => (
          <li key={`button-${i}`}>
            <button
              onClick={() => {
                equalNameClick(e.name);
              }}
              className={`text-base w-full dark:hover:bg-gray-600 hover:bg-gray-300 p-[2px] text-gray-800 dark:text-gray-100`}
            >
              {e.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default AutoComplete;
