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
  // const [representativeType] = pokemonData?.types;

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
      className={`fixed top-0 left-0 right-0 h-[70px] flex justify-between shrink-0	 items-center px-[36px] tracking-[16px] z-[100]      
      ${
        pathname.includes("pokemon") && representativeType
          ? `bg-${representativeType}`
          : "bg-[#b83e3a]"
      }
    
      `}
    >
      <Logo />
      <div className="flex gap-5 items-center">
        <LightDarkModeButton />

        {pathname !== "/login" && userInfo ? (
          <div
            className="relative flex items-center justify-center w-[48px] h-[48px] hover:opacity-1 duration-100 peer cursor-pointer "
            onClick={logoutHandler}
          >
            {userInfo?.photoURL && (
              <img
                className="w-full h-full rounded-[50%]"
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
