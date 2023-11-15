import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getPokemonData } from "@/store/pokemons/pokemon.slice";
import { ArrowLeft } from "@/assets/ArrowLeft";
import { GreaterThan } from "@/assets/GreaterThan";
import { LessThan } from "@/assets/LessThan";
import DamageModal from "@/components/DamageModal";
import LoaderPokeball from "@/components/LoaderPokeball";
import Section from "./Section";
import BaseStat from "./BaseStat";
import Info from "./Info";
import Type from "./Type";

const DetailPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, pokemonData } = useAppSelector(
    (state) => state.pokemonSlice
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { id: pokemonName } = useParams() as { id: string };

  useEffect(() => {
    dispatch(getPokemonData(pokemonName));
  }, [pokemonName]);

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData?.id}.png`;
  const bg = `bg-${pokemonData?.types?.[0]}`;

  if (isLoading) return <LoaderPokeball />;
  if (!isLoading && !pokemonData) return <div>NotFound</div>;

  if (!isLoading && pokemonData) {
    return (
      <div className="flex items-center flex-col w-full h-full bg-gray-100  dark:bg-gray-800  relative">
        <header
          className={`${bg} w-full h-[35vh] relative  rounded-bl-[4em] rounded-br-[4em] px-6 py-3`}
        >
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-1 text-white">
              <ArrowLeft className="w-6 h-8 text-zinc-200 " />
              뒤로가기
            </Link>
            <p className="text-zinc-200 font-bold text-md">
              #{pokemonData.id.toString().padStart(3, "00")}
            </p>
          </div>

          <div className="relative h-auto max-w-[15.5rem] z-20 -mb-16 m-auto">
            <img
              src={img}
              width="100%"
              height="auto"
              loading="lazy"
              alt={pokemonData.name}
              className={`object-contain h-full cursor-pointer`}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </header>
        <div className="w-full px-5 py-6 max-w-[550px]">
          <h1 className=" text-center font-bold text-4xl capitalize tracking-[0.05em] text-slate-950 dark:text-white">
            {pokemonData.name}
          </h1>

          <section className="flex items-center justify-center gap-4">
            {/* 포켓몬 타입 */}
          </section>
          <Section title="" width="w-full">
            <div className="flex gap-5">
              {pokemonData.types.map((type) => (
                <Type key={type} type={type} />
              ))}
            </div>
          </Section>
          <Section title="" width="max-w-[250px]">
            <div className="flex w-full text-center">
              <Info title={"weigth"} text={pokemonData.weight + "kg"} />
              <Info title={"height"} text={pokemonData.height + "m"} />
            </div>
          </Section>
          <Section title="기본 능력치" width="w-full">
            <div className="w-full">
              <table className="w-full max-w-md m-auto">
                <tbody>
                  {pokemonData.stats.map(({ name, baseStat }) => (
                    <BaseStat
                      key={name}
                      valueStat={baseStat}
                      nameStat={name}
                      type={pokemonData.types[0]}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
          <Section title="설명" width="w-full">
            <p className="text-md leading-4   max-w-[30rem] text-center text-slate-800 dark:text-zinc-200">
              {pokemonData.description}
            </p>
          </Section>

          <section className="flex my-8 flex-wrap justify-center">
            {pokemonData.sprites.map((url, index) => (
              <div className="hover:translate-y-2	duration-100">
                <img key={url} src={url} alt="sprite" />
              </div>
            ))}
          </section>
        </div>
        {pokemonData.prevPokemon && (
          <Link
            className="absolute top-[40%] -translate-y-1/2 z-50 left-3"
            to={`/pokemon/${pokemonData.prevPokemon}`}
          >
            <LessThan className="w-5 h-8 p-1" />
          </Link>
        )}
        {pokemonData.nextPokemon && (
          <Link
            className="absolute top-[40%] -translate-y-1/2 z-50 right-3"
            to={`/pokemon/${pokemonData.nextPokemon}`}
          >
            <GreaterThan className="w-5 h-8 p-1" />
          </Link>
        )}
        {isModalOpen && (
          <DamageModal
            damages={pokemonData?.damageRelations}
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
