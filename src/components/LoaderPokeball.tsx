import { Pokeball } from "../assets/icons/Pokeball";

const LoaderPokeball = () => {
  return (
    <div className='w-full min-h-main bg-gray-100  dark:bg-gray-800'>
      <div className='absolute h-auto w-auto top-1/2 -translate-x-1/2 left-1/2 z-50'>
        <Pokeball className=' w-16 h-16 animate-spin ' />
      </div>
    </div>
  );
};

export default LoaderPokeball;
