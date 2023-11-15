import { configureStore } from "@reduxjs/toolkit";
import pokemonListSlice from "./pokemons/pokemons.slice";
import pokemonSlice from "./pokemons/pokemon.slice";
import userSlice from "./user/user.slice";
import themeSlice from "./theme/theme.slice";

const store = configureStore({
  reducer: { pokemonListSlice, userSlice, themeSlice, pokemonSlice },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
