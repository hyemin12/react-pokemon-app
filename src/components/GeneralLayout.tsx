import { useContext, useEffect, useState } from "react";
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {
  AuthProps,
  useAuthDispatch,
  useAuthState,
} from "../hooks/auth_context";
import { saveUserInfoToSessionStorage } from "../storage/userInfoHandler";

const GeneralLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const userInfo = useAuthState();

  const auth = getAuth(app);

  useEffect(() => {
    // 로그인 여부 확인 후 페이지 이동
    const authState = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else if (user) {
        dispatch({
          type: "LOGIN",
          user: {
            displayName: user?.displayName,
            photoURL: user?.photoURL,
          },
        });
        !userInfo
          ? saveUserInfoToSessionStorage({
              displayName: user?.displayName,
              photoURL: user?.photoURL,
            })
          : null;
        if (pathname === "/login") {
          navigate("/");
        }
      }
    });

    return () => authState();
  }, []);

  if (!userInfo && pathname !== "/login") return null;

  return (
    <>
      <NavBar />
      <div id="main" className="pt-[70px] min-h-main ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default GeneralLayout;
