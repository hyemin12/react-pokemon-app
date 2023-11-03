import { AuthProps } from "../hooks/auth_context";

export const saveUserInfoToSessionStorage = (userInfo: AuthProps) => {
  sessionStorage.setItem("poke-app", JSON.stringify(userInfo));
};

export const getUserInfoToSessionStorage = () => {
  const storageUserInfo = sessionStorage.getItem("poke-app");
  return storageUserInfo ? JSON.parse(storageUserInfo) : null;
};

export const deleteUserInfoSessionStorage = () => {
  sessionStorage.removeItem("poke-app");
};
