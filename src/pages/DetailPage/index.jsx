import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/const";

const DetailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);
  const { id: pokemonName } = useParams();

  const url = BASE_URL + pokemonName;

  const fetchPokemonData = async () => {
    try {
      const { data: pokemonData } = await axios.get(url);
      if (pokemonData) {
        const { name, id, types, weight, height, abilities, stats } =
          pokemonData;

        const nextAndPrevPokemon = await getNextAndPrevPokemon(id);

        const damamageRelations = await Promise.all(
          types.map(async (i) => {
            const type = await axios.get(i.type.url);
            return type.data.damage_relations;
          })
        );
        const formattedPokemonData = {
          id,
          name,
          types: types.map(({ type }) => type.name),
          prevPokemon: nextAndPrevPokemon.prev,
          nextPokemon: nextAndPrevPokemon.next,
          weight: 10 / weight,
          height: 10 / height,
          abilities: formatPokemonAbilities(abilities),
          stats: formatPokemonStats(stats),
          damamageRelations,
        };
        setPokemon(formattedPokemonData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPokemonAbilities = (abilities) => {
    return abilities
      .filter((_, idx) => idx < 2)
      .map((obj) => obj?.ability.name.replaceAll("-", " "));
  };

  const formatPokemonStats = ([
    statHP,
    statATK,
    statDEP,
    statSATK,
    statSDEP,
    statSPD,
  ]) => [
    { name: "Hit Points", baseStat: statHP.base_stat },
    { name: "Attack", baseStat: statATK.base_stat },
    { name: "Defense", baseStat: statDEP.base_stat },
    { name: "Special Attack", baseStat: statSATK.base_stat },
    { name: "Special Defense", baseStat: statSDEP.base_stat },
    { name: "Speed", baseStat: statSPD.base_stat },
  ];

  const getNextAndPrevPokemon = async (id) => {
    const urlPokemon = `${BASE_URL}?limit=1&offset=${id - 1}`;
    const { data: pokemonData } = await axios.get(urlPokemon);

    const nextResponse =
      pokemonData.next && (await axios.get(pokemonData.next));
    const prevResponse =
      pokemonData.previous && (await axios.get(pokemonData.previous));

    return {
      next: nextResponse?.data?.results?.[0]?.name,
      prev: prevResponse?.data?.results?.[0]?.name,
    };
  };
  useEffect(() => {
    fetchPokemonData();
  }, [pokemonName]);

  // 이전 다음 포켓몬 정보 가져오기

  return <div>detailPage</div>;
};
export default DetailPage;
