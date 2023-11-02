export const saveUserDataToLocalStorage = (loggedUserData) => {
  localStorage.setItem("poke-app-user-data", JSON.stringify(loggedUserData));
};
export const getUserDataFromLocalStorage = () => {
  return localStorage.getItem("poke-app-user-data")
    ? JSON.parse(localStorage.getItem("poke-app-user-data"))
    : {};
};
export const removeUserDataToLocalStorage = () => {
  localStorage.removeItem("poke-app-user-data");
};
