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
import LoaderPokeball from "../../components/LoaderPokeball";
import Info from "./Info";
import Section from "./Section";

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

  const formatPokemonStats = ([
    statHP,
    statATK,
    statDEP,
    statSATK,
    statSDEP,
    statSPD,
  ]: Stat[]) => [
    { name: "HP", baseStat: statHP.base_stat },
    { name: "ATK", baseStat: statATK.base_stat },
    { name: "DEP", baseStat: statDEP.base_stat },
    { name: "SPD", baseStat: statSPD.base_stat },
    { name: "SATK", baseStat: statSATK.base_stat },
    { name: "SDEP", baseStat: statSDEP.base_stat },
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

  if (isLoading) return <LoaderPokeball />;
  if (!isLoading && !pokemon) return <div>NotFound</div>;

  if (!isLoading && pokemon) {
    return (
      <div className="flex items-center flex-col w-full h-full bg-gray-800 relative">
        <header
          className={`${bg} w-full h-[40vh] relative  rounded-bl-[4em] rounded-br-[4em] px-6 py-3`}
        >
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-1 text-white">
              <ArrowLeft className="w-6 h-8 text-zinc-200 " />
              뒤로가기
            </Link>
            <p className="text-zinc-200 font-bold text-md">
              #{pokemon.id.toString().padStart(3, "00")}
            </p>
          </div>

          <div className="relative h-auto max-w-[15.5rem] z-20 -mb-16 m-auto">
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
        </header>
        <div className="w-full px-5 py-6 max-w-[550px]">
          <h1 className="text-white text-center font-bold text-4xl capitalize tracking-[0.05em]">
            {pokemon.name}
          </h1>

          <section className="flex items-center justify-center gap-4">
            {/* 포켓몬 타입 */}
          </section>
          <Section title="" width="w-full">
            {pokemon.types.map((type) => (
              <Type key={type} type={type} />
            ))}
          </Section>
          <Section title="" width="max-w-[250px]">
            <div className="flex w-full text-center">
              <Info title={"weigth"} text={pokemon.weight + "kg"} />
              <Info title={"height"} text={pokemon.height + "m"} />
            </div>
          </Section>
          <Section title="기본 능력치" width="w-full">
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
          </Section>
          <Section title="설명" width="w-full">
            <p className="text-md leading-4  text-zinc-200 max-w-[30rem] text-center">
              {pokemon.description}
            </p>
          </Section>

          <section className="flex my-8 flex-wrap justify-center">
            {pokemon.sprites.map((url, index) => (
              <div className="hover:translate-y-2	duration-100">
                <img key={index} src={url} alt="sprite" />
              </div>
            ))}
          </section>
        </div>
        {pokemon.prevPokemon && (
          <Link
            className="absolute top-[40%] -translate-y-1/2 z-50 left-3"
            to={`/pokemon/${pokemon.prevPokemon}`}
          >
            <LessThan className="w-5 h-8 p-1" />
          </Link>
        )}
        {pokemon.nextPokemon && (
          <Link
            className="absolute top-[40%] -translate-y-1/2 z-50 right-3"
            to={`/pokemon/${pokemon.nextPokemon}`}
          >
            <GreaterThan className="w-5 h-8 p-1" />
          </Link>
        )}
        {isModalOpen && (
          <DamageModal
            damages={pokemon?.damageRelations}
            open={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    );
  }
  return null;
};
export default DetailPage;
