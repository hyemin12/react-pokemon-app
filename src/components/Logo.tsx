import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className=" mt-[4px] p-0">
      <h1 className="font-PocketMonk text-4xl  uppercase leading-[40px] tracking-tight text-white">
        pokedex
      </h1>
    </Link>
  );
};
export default Logo;
