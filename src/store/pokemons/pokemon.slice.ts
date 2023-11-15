import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/api/const";
import { DamageRelationOfPokemonType } from "@/types/DamageRelationOfPokemonTypes";
import { FormattedPokemonData } from "@/types/FormattedPokemonData";
import { PokemonData } from "@/types/PokemonData";
import {
  FlavorTextEntry,
  PokemonDescription,
} from "@/types/PokemonDescription";
import { PokemonDetail, Sprites, Stat } from "@/types/PokemonDetail";

interface pokemonSliceProps {
  isLoading: boolean;
  pokemonData: FormattedPokemonData | null;
  error: string | null;
}

interface NextAndPrevPokemon {
  prev: string | undefined;
  next: string | undefined;
}
const formatPokemonSprities = (sprites: Sprites) => {
  const newSprites = { ...sprites };

  return Object.values(newSprites).filter(
    (sprite) => typeof sprite === "string"
  ) as string[];
};

const formatPokemonStats = ([
  statHP,
  statATK,
  statDEP,
  statSATK,
  statSDEP,
  statSPD,
]: Stat[]) => [
  { name: "HP", baseStat: statHP.base_stat },
  { name: "ATK", baseStat: statATK.base_stat },
  { name: "DEP", baseStat: statDEP.base_stat },
  { name: "SPD", baseStat: statSPD.base_stat },
  { name: "SATK", baseStat: statSATK.base_stat },
  { name: "SDEP", baseStat: statSDEP.base_stat },
];

const getNextAndPrevPokemon = async (id: number) => {
  const urlPokemon = `${BASE_URL}?limit=1&offset=${id - 1}`;
  const { data: pokemonData } = await axios.get(urlPokemon);

  const nextResponse =
    pokemonData.next && (await axios.get<PokemonData>(pokemonData.next));
  const prevResponse =
    pokemonData.previous &&
    (await axios.get<PokemonData>(pokemonData.previous));

  return {
    next: nextResponse?.data?.results?.[0]?.name,
    prev: prevResponse?.data?.results?.[0]?.name,
  };
};

const getPokemonDescription = async (id: number): Promise<string> => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

  const { data: descriptions } = await axios.get<PokemonDescription>(url);

  const korDescriptions = descriptions?.flavor_text_entries
    ?.filter((text: FlavorTextEntry) => text?.language?.name === "ko")
    .map(({ flavor_text }: FlavorTextEntry) =>
      flavor_text.replace(/\r|\n|\f/g, " ")
    );

  const randomIndex = Math.floor(Math.random() * korDescriptions.length);

  return korDescriptions[randomIndex] as string;
};

export const getPokemonData = createAsyncThunk(
  "pokemon/getPokemonData",
  async (pokemonName: string, thunkAPI) => {
    try {
      const url = BASE_URL + pokemonName;
      const { data: pokemonData } = await axios.get<PokemonDetail>(url);
      if (pokemonData) {
        const { name, id, types, weight, height, stats, sprites } = pokemonData;

        const [{ type: representativeType }] = types;

        const nextAndPrevPokemon: NextAndPrevPokemon =
          await getNextAndPrevPokemon(id);

        const damageRelations = await Promise.all(
          types.map(async (i) => {
            const type = await axios.get<DamageRelationOfPokemonType>(
              i.type.url
            );
            return type.data.damage_relations;
          })
        );
        const formattedPokemonData: FormattedPokemonData = {
          id,
          name,
          types: types.map(({ type }) => type.name),
          prevPokemon: nextAndPrevPokemon.prev,
          nextPokemon: nextAndPrevPokemon.next,
          weight: weight / 10,
          height: height / 10,
          stats: formatPokemonStats(stats),
          damageRelations,
          sprites: formatPokemonSprities(sprites),
          description: await getPokemonDescription(id),
          representativeType: representativeType.name,
        };
        return formattedPokemonData;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(thunkAPI);
    }
  }
);

const initialState: pokemonSliceProps = {
  isLoading: false,
  pokemonData: null,
  error: null,
};
const pokemonSlice = createSlice({
  name: "pokemon-type",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPokemonData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPokemonData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.pokemonData = payload as FormattedPokemonData;
      })
      .addCase(getPokemonData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  },
});

export default pokemonSlice.reducer;
