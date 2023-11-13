import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LazyImg from "../../components/LazyImg";
import { PokemonCardData, PokemonNameAndUrl } from "../../types/PokemonData";
import { PokemonDetail } from "../../types/PokemonDetail";

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

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;

  return (
    <>
      {pokemon && (
        <Link
          to={"/pokemon/" + pokemon.name}
          className={`box-border rounded-lg ${border} w-[9rem] h-[9.5rem] z-0 ${bg} justify-between items-center grow hover:-translate-y-2 duration-300`}
        >
          <div
            className={`text-white h-[1.5rem] text-xs w-full pt-1 px-2  text-right rounded-t-lg`}
          >
            #{pokemon.id.toString().padStart(3, "00")}
          </div>
          <div className={`w-full f-6 flex items-center justify-center`}>
            <div
              className={`box-border relative flex w-full h-[6rem] basis justify-center items-center`}
            >
              <LazyImg src={img} alt={pokemon.name} />
            </div>
          </div>
          <h4
            className={`${bg} text-center text-sm text-zinc-100 h-[1.5rem] rounded-b-lg uppercase font-medium  pt-1`}
          >
            {pokemon.name}
          </h4>
        </Link>
      )}
    </>
  );
};

export default PokeCard;