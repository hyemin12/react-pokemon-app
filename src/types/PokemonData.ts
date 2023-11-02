export interface PokemonData {
  count: number;
  nextPokemon: string | null;
  prevPokemon: string | null;
  results: PokemonNameAndUrl[];
}

export interface PokemonNameAndUrl {
  name: string;
  url: string;
}

export interface PokemonCardData {
  id: number;
  type: string;
  name: string;
}
