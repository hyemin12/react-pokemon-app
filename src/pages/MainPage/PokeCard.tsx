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
          className={`box-border rounded-lg ${border} z-0 h-[9.5rem] w-[9rem] ${bg} grow items-center justify-between duration-300 hover:-translate-y-2`}
        >
          <div
            className={`h-[1.5rem] w-full rounded-t-lg px-2 pt-1 text-right  text-xs text-white`}
          >
            #{pokemon.id.toString().padStart(3, "00")}
          </div>
          <div className={`f-6 flex w-full items-center justify-center`}>
            <div
              className={`basis relative box-border flex h-[6rem] w-full items-center justify-center`}
            >
              <LazyImg src={img} alt={pokemon.name} />
            </div>
          </div>
          <h4
            className={`${bg} h-[1.5rem] rounded-b-lg pt-1 text-center text-sm font-medium uppercase  text-zinc-100`}
          >
            {pokemon.name}
          </h4>
        </Link>
      )}
    </>
  );
};

export default PokeCard;
