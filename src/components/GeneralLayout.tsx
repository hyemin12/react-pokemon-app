import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import app from "../firebase";
import { useAuthDispatch, useAuthState } from "@/hooks/auth_context";
import { ThemeProps, useThemeContext } from "@/hooks/theme_context";
import NavBar from "./NavBar";
import Footer from "./Footer";

const GeneralLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const { theme } = useThemeContext() as ThemeProps;

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
        if (pathname === "/login") {
          navigate("/");
        }
      }
    });

    return () => authState();
  }, []);
  console.log();
  return (
    <>
      <NavBar />
      <div
        id="main"
        className={`${
          theme === "dark" ? "dark" : "light"
        } pt-[70px] min-h-main bg-gray-100  dark:bg-gray-800`}
        data-mode={theme}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default GeneralLayout;
