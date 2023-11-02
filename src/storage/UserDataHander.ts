import { User } from "firebase/auth";

export const saveUserDataToLocalStorage = (loggedUserData: User | null) => {
  localStorage.setItem("poke-app-user-data", JSON.stringify(loggedUserData));
};
export const getUserDataFromLocalStorage = () => {
  const userDataFormStorage = localStorage.getItem("poke-app-user-data");
  return userDataFormStorage ? JSON.parse(userDataFormStorage) : null;
};
export const removeUserDataToLocalStorage = () => {
  localStorage.removeItem("poke-app-user-data");
};
