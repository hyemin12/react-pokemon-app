import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/api/const";
import { PokemonData } from "@/types/PokemonData";

interface PokemonReducerProps {
  isLoading: boolean;
  allPokemons: PokemonData[];
  filteredPokemons: PokemonData[];
  error: null | string;
}

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPokemons",
  async (_, thunkAPI) => {
    try {
      const url = BASE_URL + "?limit=1008&offset=0";
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error loading Pokemon Data");
    }
  }
);

const initialState: PokemonReducerProps = {
  isLoading: false,
  allPokemons: [],
  filteredPokemons: [],
  error: null,
};

export const pokemonListSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allPokemons = payload;
      })
      .addCase(fetchPokemons.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  },
});

export default pokemonListSlice.reducer;
