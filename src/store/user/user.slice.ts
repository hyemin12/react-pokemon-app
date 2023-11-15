import {
  deleteUserInfoSessionStorage,
  getUserInfoToSessionStorage,
  saveUserInfoToSessionStorage,
} from "@/storage/userInfoHandler";
import { createSlice } from "@reduxjs/toolkit";

export interface userSliceProps {
  displayName: string | null;
  photoURL: string | null;
}
const initialState: userSliceProps = {
  displayName: null,
  photoURL: null,
};

const storageUserInfo = getUserInfoToSessionStorage();

const userSlice = createSlice({
  name: "user",
  initialState: initialState || storageUserInfo,
  reducers: {
    logInUser: (state, { payload }) => {
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      saveUserInfoToSessionStorage(payload);
    },
    logOutUser: (state) => {
      state.displayName = null;
      state.photoURL = null;
      deleteUserInfoSessionStorage();
    },
  },
});

export const { logInUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
