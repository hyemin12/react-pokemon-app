import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from "../firebase";
import Logo from "./Logo";
import { login, logout } from "../api/Login";
import { useAuthDispatch, useAuthState } from "../hooks/auth_context";
import { deleteUserInfoSessionStorage } from "../storage/userInfoHandler";

const NavBar = () => {
  const auth = getAuth(app);

  const { pathname } = useLocation();

  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const user = useAuthState();

  const [show, setShow] = useState(false);

  const authHandler = async () => {
    const loginResponse = await login(auth);
    if (!loginResponse) return console.error("로그인 실패!" + loginResponse);

    return dispatch({
      type: "LOGIN",
      user: {
        displayName: loginResponse?.displayName,
        photoURL: loginResponse?.photoURL,
      },
    });
  };

  const logoutHandler = async () => {
    await logout(auth);
    if (!"success_logout") return;
    dispatch({ type: "LOGOUT", user: null });
    return navigate("/login");
  };

  useEffect(() => {
    const listener = () => {
      window.screenY > 50 ? setShow(true) : setShow(true);
    };
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  });
  console.log(user);
  if (pathname === "/login")
    return (
      <nav
        className={`fixed top-0 left-0 right-0 h-[70px] flex justify-between shrink-0	 items-center px-[36px] tracking-[16px] z-[100]  ${
          show ? "bg-[#090b13]" : "bg-slate-700"
        }`}
      >
        <Logo />
      </nav>
    );
  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-[70px] flex justify-between shrink-0	 items-center px-[36px] tracking-[16px] z-[100]  ${
        show ? "bg-[#090b13]" : "bg-slate-700"
      }`}
    >
      <Logo />
      {!user ? (
        <a
          className="bg-blackRgba py-[8px] px-[16px] border-1 border-solid border-[#f9f9f9] rounded-[4px] text-white  uppercase tracking-widest hover:bg-primary hover:text-black border-transparent duration-200 ease-in cursor-pointer"
          onClick={authHandler}
        >
          로그인
        </a>
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
      )}
    </nav>
  );
};

export default NavBar;
