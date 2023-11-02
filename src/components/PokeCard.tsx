import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LazyImg from "./LazyImg";
import { PokemonCardData, PokemonNameAndUrl } from "../types/PokemonData";
import { PokemonDetail } from "../types/PokemonDetail";

const PokeCard = ({ url }: PokemonNameAndUrl) => {
  const [pokemon, setPokemon] = useState<PokemonCardData>();
  const fetchPokeDetailData = async () => {
    try {
      const response = await axios.get(url);
      const pokemonData = formatPokemonData(response.data);

      setPokemon(pokemonData);
    } catch (error) {
      console.error(error);
    }
  };

  const formatPokemonData = (params: PokemonDetail) => {
    const { id, types, name } = params;

    const pokeData: PokemonCardData = {
      id,
      name,
      type: types[0].type.name,
    };
    return pokeData;
  };

  useEffect(() => {
    fetchPokeDetailData();
  }, []);

  const bg = "bg-" + pokemon?.type;
  const border = "border-" + pokemon?.type;
  const text = "text-" + pokemon?.type;

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;

  return (
    <>
      {pokemon && (
        <Link
          to={"/pokemon/" + pokemon.name}
          className={`box-border rounded-lg ${border} w-[8.5rem] h-[8.5rem] z-0 bg-slate-800 justify-between items-center grow`}
        >
          <div
            className={`${text} h-[1.5rem] text-xs w-full pt-1 px-2  text-right rounded-t-lg`}
          >
            #{pokemon.id.toString().padStart(3, "00")}
          </div>
          <div className={`w-full f-6 flex items-center justify-center`}>
            <div
              className={`box-border relative flex w-full h-[5.5rem] basis justify-center items-center`}
            >
              <LazyImg src={img} alt={pokemon.name} />
            </div>
          </div>
          <div
            className={`${bg} text-center text-xs text-zinc-100 h-[1.5rem] rounded-b-lg uppercase font-medium  pt-1`}
          >
            {pokemon.name}
          </div>
        </Link>
      )}
    </>
  );
};

export default PokeCard;
