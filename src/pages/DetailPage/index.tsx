import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/const";
import { Loading } from "../../assets/Loading";
import { Balance } from "../../assets/Balance";
import { Vector } from "../../assets/Vector";
import { ArrowLeft } from "../../assets/ArrowLeft";
import { GreaterThan } from "../../assets/GreaterThan";
import { LessThan } from "../../assets/LessThan";
import Type from "../../components/Type";
import BaseStat from "../../components/BaseStat";
import DamageModal from "../../components/DamageModal";
import { FormattedPokemonData } from "../../types/FormattedPokemonData";
import {
  Ability,
  PokemonDetail,
  Sprites,
  Stat,
} from "../../types/PokemonDetail";
import {
  DamageRelationOfPokemonType,
  Pokemon,
} from "../../types/DamageRelationOfPokemonTypes";
import {
  FlavorTextEntry,
  PokemonDescription,
} from "../../types/PokemonDescription";
import { PokemonData } from "../../types/PokemonData";

interface NextAndPrevPokemon {
  next: string | undefined;
  prev: string | undefined;
}

const DetailPage = () => {
  const [pokemon, setPokemon] = useState<FormattedPokemonData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { id: pokemonName } = useParams() as { id: string };

  const url = BASE_URL + pokemonName;

  useEffect(() => {
    setIsLoading(true);
    fetchPokemonData();
  }, [pokemonName]);

  const fetchPokemonData = async () => {
    try {
      const { data: pokemonData } = await axios.get<PokemonDetail>(url);

      if (pokemonData) {
        const { name, id, types, weight, height, abilities, stats, sprites } =
          pokemonData;

        const nextAndPrevPokemon: NextAndPrevPokemon =
          await getNextAndPrevPokemon(id);

        const damageRelations = await Promise.all(
          types.map(async (i) => {
            const type = await axios.get<DamageRelationOfPokemonType>(
              i.type.url
            );
            return type.data.damage_relations;
          })
        );
        const formattedPokemonData: FormattedPokemonData = {
          id,
          name,
          types: types.map(({ type }) => type.name),
          prevPokemon: nextAndPrevPokemon.prev,
          nextPokemon: nextAndPrevPokemon.next,
          weight: weight / 10,
          height: height / 10,
          abilities: formatPokemonAbilities(abilities),
          stats: formatPokemonStats(stats),
          damageRelations,
          sprites: formatPokemonSprities(sprites),
          description: await getPokemonDescription(id),
        };
        setPokemon(formattedPokemonData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const formatPokemonSprities = (sprites: Sprites) => {
    const newSprites = { ...sprites };

    return Object.values(newSprites).filter(
      (sprite) => typeof sprite === "string"
    ) as string[];
  };
  const formatPokemonAbilities = (abilities: Ability[]) => {
    return abilities
      .filter((_, idx) => idx < 2)
      .map((obj: Ability) => obj?.ability.name.replaceAll("-", " "));
  };

  const formatPokemonStats = ([
    statHP,
    statATK,
    statDEP,
    statSATK,
    statSDEP,
    statSPD,
  ]: Stat[]) => [
    { name: "Hit Points", baseStat: statHP.base_stat },
    { name: "Attack", baseStat: statATK.base_stat },
    { name: "Defense", baseStat: statDEP.base_stat },
    { name: "Special Attack", baseStat: statSATK.base_stat },
    { name: "Special Defense", baseStat: statSDEP.base_stat },
    { name: "Speed", baseStat: statSPD.base_stat },
  ];

  const getNextAndPrevPokemon = async (id: number) => {
    const urlPokemon = `${BASE_URL}?limit=1&offset=${id - 1}`;
    const { data: pokemonData } = await axios.get(urlPokemon);

    const nextResponse =
      pokemonData.next && (await axios.get<PokemonData>(pokemonData.next));
    const prevResponse =
      pokemonData.previous &&
      (await axios.get<PokemonData>(pokemonData.previous));

    return {
      next: nextResponse?.data?.results?.[0]?.name,
      prev: prevResponse?.data?.results?.[0]?.name,
    };
  };

  const getPokemonDescription = async (id: number): Promise<string> => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

    const { data: descriptions } = await axios.get<PokemonDescription>(url);

    const korDescriptions = descriptions?.flavor_text_entries
      ?.filter((text: FlavorTextEntry) => text?.language?.name === "ko")
      .map(({ flavor_text }: FlavorTextEntry) =>
        flavor_text.replace(/\r|\n|\f/g, " ")
      );

    const randomIndex = Math.floor(Math.random() * korDescriptions.length);

    return korDescriptions[randomIndex] as string;
  };

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;
  const bg = `bg-${pokemon?.types?.[0]}`;
  const text = "text-" + pokemon?.types?.[0];

  if (isLoading)
    return (
      <div className="absolute h-auto w-auto top-1/3 -translate-x-1/2 left-1/2 z-50">
        <Loading className="w-12 h-12 z-50 animate-spin text-slate-900" />
      </div>
    );
  if (!isLoading && !pokemon) return <div>NotFound</div>;

  if (!isLoading && pokemon) {
    return (
      <article className="flex items-center gap-1 flex-col w-full">
        <div
          className={`${bg} w-full h-full flex flex-col z-0 items-center justify-end relative overflow-hidden`}
        >
          {pokemon.prevPokemon && (
            <Link
              className="absolute top-[40%] -translate-y-1/2 z-50 left-1"
              to={`/pokemon/${pokemon.prevPokemon}`}
            >
              <LessThan className="w-5 h-8 p-1" />
            </Link>
          )}

          {pokemon.nextPokemon && (
            <Link
              className="absolute top-[40%] -translate-y-1/2 z-50 right-1"
              to={`/pokemon/${pokemon.nextPokemon}`}
            >
              <GreaterThan className="w-5 h-8 p-1" />
            </Link>
          )}

          <section className="w-full flex flex-col z-20 items-center justify-end relative h-full">
            <div className="absolute z-30 top-6 flex items-center w-full justify-between px-2">
              <div className="flex items-center gap-1">
                <Link to="/">
                  <ArrowLeft className="w-6 h-8 text-zinc-200" />
                </Link>
                <h1 className="text-zinc-200 font-bold text-2xl capitalize pokemon-font tracking-[0.25em]">
                  {pokemon.name}
                </h1>
              </div>
              <div className="text-zinc-200 font-bold text-md">
                #{pokemon.id.toString().padStart(3, "00")}
              </div>
            </div>

            <div className="relative h-auto max-w-[15.5rem] z-20 mt-6 -mb-16">
              <img
                src={img}
                width="100%"
                height="auto"
                loading="lazy"
                alt={pokemon.name}
                className={`object-contain h-full cursor-pointer`}
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </section>

          <section className="w-full min-h-[65%] h-full bg-gray-800 z-10 pt-14 flex flex-col items-center gap-3 px-5 pb-4">
            <div className="flex items-center justify-center gap-4">
              {/* 포켓몬 타입 */}
              {pokemon.types.map((type) => (
                <Type key={type} type={type} />
              ))}
            </div>

            <h2 className={`text-base font-semibold ${text}`}>정보</h2>

            <div className="flex w-full items-center justify-between max-w-[400px] text-center">
              <div className="w-full">
                <h4 className="text-[0.5rem] text-zinc-100">Weight</h4>
                <div className="text-sm flex mt-1 gap-2 justify-center  text-zinc-200">
                  <Balance />
                  {pokemon.weight}kg
                </div>
              </div>
              <div className="w-full">
                <h4 className="text-[0.5rem] text-zinc-100">Weight</h4>
                <div className="text-sm flex mt-1 gap-2 justify-center  text-zinc-200">
                  <Vector />
                  {pokemon.height}m
                </div>
              </div>
              <div className="w-full">
                <h4 className="text-[0.5rem] text-zinc-100">Weight</h4>
                {pokemon.abilities.map((ability) => (
                  <div
                    key={ability}
                    className="text-[0.5rem] text-zinc-100 capitalize"
                  >
                    {" "}
                    {ability}
                  </div>
                ))}
              </div>
            </div>

            <h2 className={`text-base font-semibold ${text}`}>기본 능력치</h2>
            <div className="w-full">
              <table className="w-full max-w-md m-auto">
                <tbody>
                  {pokemon.stats.map((stat) => (
                    <BaseStat
                      key={stat.name}
                      valueStat={stat.baseStat}
                      nameStat={stat.name}
                      type={pokemon.types[0]}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className={`text-base font-semibold ${text}`}>설명</h2>
            <p className="text-md leading-4  text-zinc-200 max-w-[30rem] text-center">
              {pokemon.description}
            </p>

            <div className="flex my-8 flex-wrap justify-center">
              {pokemon.sprites.map((url, index) => (
                <img key={index} src={url} alt="sprite" />
              ))}
            </div>
          </section>
        </div>
        {isModalOpen && (
          <DamageModal
            damages={pokemon?.damageRelations}
            open={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </article>
    );
  }
  return null;
};
export default DetailPage;
