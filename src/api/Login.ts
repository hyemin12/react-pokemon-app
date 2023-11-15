import {
  Auth,
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const login = async (auth: Auth) => {
  const response = await setPersistence(auth, browserSessionPersistence).then(
    () => {
      return signInWithPopup(auth, provider)
        .then((result) => {
          return result.user;
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
    }
  );
  return response ? response : null;
};

export const logout = (auth: Auth) => {
  return signOut(auth)
    .then(() => {
      return "success";
    })
    .catch((error) => {
      console.error(error);
      return "fail";
    });
};
