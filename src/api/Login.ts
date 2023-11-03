import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const login = (auth: Auth) => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      return result.user;
    })
    .catch((error) => console.error(error));
};

export const logout = (auth: Auth) => {
  return signOut(auth)
    .then(() => {
      return "success";
    })
    .catch((error) => {
      alert(error.message);
    });
};
