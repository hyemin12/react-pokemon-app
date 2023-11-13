import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import app from "../firebase";
import { useAuthDispatch, useAuthState } from "@/hooks/auth_context";
import { useThemeContext } from "@/hooks/theme_context";
import NavBar from "./NavBar";
import Footer from "./Footer";

const GeneralLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const userInfo = useAuthState();
  const { theme } = useThemeContext();

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
  console.log(userInfo);
  return (
    <>
      <NavBar />
      <div
        id="main"
        className={`${
          theme === "dark" ? "dark" : "light"
        } pt-[70px] min-h-main`}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default GeneralLayout;
