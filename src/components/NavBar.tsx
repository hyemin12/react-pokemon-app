import { useLocation, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { logout } from "@/api/Login";
import app from "@/firebase";
import Logo from "./Logo";
import LightDarkModeButton from "./LightDarkModeButton";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logOutUser } from "@/store/user/user.slice";

const NavBar = () => {
  const auth = getAuth(app);
  const userInfo = useAppSelector((state) => state.userSlice);
  const { pokemonData } = useAppSelector((state) => state.pokemonSlice);
  const representativeType = pokemonData?.representativeType;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logoutHandler = async () => {
    const response = await logout(auth);
    if (response === "fail") return;
    dispatch(logOutUser());
    navigate("/login");
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[100] flex h-[70px] shrink-0	 items-center justify-between px-[36px] tracking-[16px]      
      ${
        pathname.includes("pokemon") && representativeType
          ? `bg-${representativeType}`
          : "bg-[#b83e3a]"
      }
    
      `}
    >
      <Logo />
      <div className="flex items-center gap-5">
        <LightDarkModeButton />

        {pathname !== "/login" && userInfo ? (
          <div
            className="hover:opacity-1 peer relative flex h-[48px] w-[48px] cursor-pointer items-center justify-center duration-100 "
            onClick={logoutHandler}
          >
            {userInfo?.photoURL && (
              <img
                className="h-full w-full rounded-[50%]"
                alt="user photo"
                src={userInfo?.photoURL}
              />
            )}
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
