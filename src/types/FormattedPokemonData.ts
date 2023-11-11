export interface FormattedPokemonData {
  id: number;
  name: string;
  weight: number;
  height: number;
  prevPokemon: string | undefined;
  nextPokemon: string | undefined;
  stats: Stat[];
  damageRelations: DamageRelation[];
  types: string[];
  sprites: string[];
  description: string;
}

export interface DamageRelation {
  double_damage_from: DoubleDamageFrom[];
  double_damage_to: DoubleDamageFrom[];
  half_damage_from: DoubleDamageFrom[];
  half_damage_to: DoubleDamageFrom[];
  no_damage_from: any[];
  no_damage_to: any[];
}

export interface DoubleDamageFrom {
  name: string;
  url: string;
}

export interface Stat {
  name: string;
  baseStat: number;
}
