import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className=" mt-[4px] p-0">
      <h1 className="uppercase font-PocketMonk  text-4xl text-primary tracking-tight leading-[40px]">
        pokedex
      </h1>
    </Link>
  );
};
export default Logo;
