import { createContext, useState, useContext } from "react";

interface PokemonContextProps {
  children: React.ReactNode;
}

export interface PokemonProps {
  pokemonType: string;
  setPokemonType: React.Dispatch<React.SetStateAction<string>>;
}

export const PokemonContext = createContext<PokemonProps | null>(null);

export function PokemonContextProvider({ children }: PokemonContextProps) {
  const [pokemonType, setPokemonType] = useState("");
  const value = { pokemonType, setPokemonType };
  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
}
export function usePokemonContext() {
  return useContext(PokemonContext);
}
