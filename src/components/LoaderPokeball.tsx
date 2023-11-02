import { Pokeball } from "../assets/Pokeball";

const LoaderPokeball = () => {
  return (
    <div className="absolute h-auto w-auto top-1/2 -translate-x-1/2 left-1/2 z-50">
      <Pokeball className=" w-16 h-16 animate-spin " />
    </div>
  );
};

export default LoaderPokeball;
