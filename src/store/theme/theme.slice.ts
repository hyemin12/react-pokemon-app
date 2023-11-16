import { createSlice } from "@reduxjs/toolkit";

const initialState: { themeColor: string } = {
  themeColor: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeThemeColor: (state, { payload }) => {
      state.themeColor = payload;
    },
  },
});
export const { changeThemeColor } = themeSlice.actions;
export default themeSlice.reducer;
