import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { login, logout } from "@/api/Login";
import { useAuthState } from "@/hooks/auth_context";
import app from "@/firebase";
import Logo from "./Logo";
import { useThemeContext } from "@/hooks/theme_context";
import LightDarkModeButton from "./LightDarkModeButton";

const NavBar = () => {
  const auth = getAuth(app);
  const { pathname } = useLocation();
  const user = useAuthState();
  const navBarRef = useRef<HTMLElement>(null);
  const { theme, setTheme } = useThemeContext();

  const loginHandler = async () => {
    await login(auth);
  };

  const logoutHandler = async () => {
    await logout(auth);
  };

  useEffect(() => {
    const listener = () => {
      if (window.screenY > 50) {
        navBarRef.current?.classList.remove("bg-slate-700");
        navBarRef.current?.classList.add("bg-[#b83e3a]");
      }
    };

    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, []);

  return (
    <nav
      ref={navBarRef}
      className={`fixed top-0 left-0 right-0 h-[70px] flex justify-between shrink-0	 items-center px-[36px] tracking-[16px] z-[100]  bg-slate-700
      `}
    >
      <Logo />
      <div className="flex gap-5 items-center">
        <LightDarkModeButton />

        {pathname !== "/login" ? (
          !user ? (
            <button
              className="bg-blackRgba py-[8px] px-[16px] border-1 border-solid border-[#f9f9f9] rounded-[4px] text-white  uppercase tracking-widest hover:bg-primary hover:text-black border-transparent duration-200 ease-in cursor-pointer"
              onClick={loginHandler}
            >
              로그인
            </button>
          ) : (
            <div
              className="relative flex items-center justify-center w-[48px] h-[48px] hover:opacity-1 duration-100 peer cursor-pointer "
              onClick={logoutHandler}
            >
              {user?.photoURL && (
                <img
                  className="w-full h-full rounded-[50%]"
                  alt="user photo"
                  src={user?.photoURL}
                />
              )}
            </div>
          )
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
