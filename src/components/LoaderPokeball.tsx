import { Pokeball } from "../assets/icons/Pokeball";

const LoaderPokeball = () => {
  return (
    <div className="min-h-main w-full bg-gray-100  dark:bg-gray-800">
      <div className="absolute left-1/2 top-1/2 z-50 h-auto w-auto -translate-x-1/2">
        <Pokeball className=" h-16 w-16 animate-spin " />
      </div>
    </div>
  );
};

export default LoaderPokeball;
