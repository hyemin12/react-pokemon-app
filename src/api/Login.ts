import { useAuthDispatch } from "@/hooks/auth_context";
import { deleteUserInfoSessionStorage } from "@/storage/userInfoHandler";
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
      deleteUserInfoSessionStorage();
      return "success_logout";
    })
    .catch((error) => {
      alert(error.message);
    });
};
