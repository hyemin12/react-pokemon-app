import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getPokemonData } from "@/store/pokemons/pokemon.slice";
import { ArrowLeft } from "@/assets/icons/ArrowLeft";
import { GreaterThan } from "@/assets/icons/GreaterThan";
import { LessThan } from "@/assets/icons/LessThan";
import DamageModal from "@/components/damage-modal/DamageModal";
import LoaderPokeball from "@/components/LoaderPokeball";
import Section from "./Section";
import BaseStat from "./BaseStat";
import Info from "./Info";
import Type from "./Type";

const DetailPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, pokemonData } = useAppSelector(
    (state) => state.pokemonSlice,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { id: pokemonName } = useParams() as { id: string };

  useEffect(() => {
    dispatch(getPokemonData(pokemonName));
  }, [pokemonName]);

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData?.id}.png`;
  const bg = `bg-${pokemonData?.types?.[0]}`;

  if (isLoading) return <LoaderPokeball />;
  // if (!isLoading && !pokemonData) return <Navigate to='/notfound' />;

  if (!isLoading && pokemonData) {
    return (
      <div className="relative flex h-full w-full flex-col items-center  bg-gray-100  dark:bg-gray-800">
        <header
          className={`${bg} relative min-h-[33vh] w-full  rounded-bl-[4em] rounded-br-[4em] px-6 py-3`}
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-1 text-white">
              <ArrowLeft className="h-8 w-6 text-zinc-200 " />
              뒤로가기
            </Link>
            <p className="text-md font-bold text-zinc-200">
              #{pokemonData.id.toString().padStart(3, "00")}
            </p>
          </div>

          <div className="relative z-20 m-auto -mb-16 h-auto max-w-[15.5rem]">
            <img
              src={img}
              width="100%"
              height="auto"
              loading="lazy"
              alt={pokemonData.name}
              className={`h-full cursor-pointer object-contain`}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </header>
        <div className="w-full max-w-[550px] px-5 py-6">
          <h1 className=" text-center text-4xl font-bold capitalize tracking-[0.05em] text-slate-950 dark:text-white">
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
              <table className="m-auto w-full max-w-md">
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
            <p className="text-md max-w-[30rem]   text-center leading-4 text-slate-800 dark:text-zinc-200">
              {pokemonData.description}
            </p>
          </Section>

          <section className="my-8 flex flex-wrap justify-center">
            {pokemonData.sprites.map((url, index) => (
              <div className="duration-100	hover:translate-y-2">
                <img key={url} src={url} alt="sprite" />
              </div>
            ))}
          </section>
        </div>
        {pokemonData.prevPokemon && (
          <Link
            className="z-9 absolute left-3 top-[40%] -translate-y-1/2"
            to={`/pokemon/${pokemonData.prevPokemon}`}
          >
            <LessThan className="h-8 w-5 p-1" />
          </Link>
        )}
        {pokemonData.nextPokemon && (
          <Link
            className="z-9 absolute right-3 top-[40%] -translate-y-1/2"
            to={`/pokemon/${pokemonData.nextPokemon}`}
          >
            <GreaterThan className="h-8 w-5 p-1" />
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
