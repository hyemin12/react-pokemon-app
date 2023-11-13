import { useNavigate } from "react-router-dom";
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useAuthDispatch } from "@/hooks/auth_context";

const provider = new GoogleAuthProvider();

export const login = (auth: Auth) => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  return signInWithPopup(auth, provider)
    .then((result) => {
      dispatch({ type: "LOGIN", user: result.user });
      return navigate("/");
    })
    .catch((error) => error && alert("로그인에 실패하였습니다."));
};

export const logout = (auth: Auth) => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  return signOut(auth)
    .then(() => {
      dispatch({ type: "LOGOUT", user: null });
      return navigate("/login");
    })
    .catch((error) => {
      alert(error.message);
    });
};
