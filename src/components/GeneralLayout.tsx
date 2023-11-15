import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import app from "@/firebase";
import { logInUser } from "@/store/user/user.slice";
import NavBar from "./NavBar";
import Footer from "./Footer";

const GeneralLayout = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { displayName } = useAppSelector((state) => state.userSlice);
  const { themeColor } = useAppSelector((state) => state.themeSlice);

  useEffect(() => {
    const authState = onAuthStateChanged(auth, (user) => {
      if (!user) return navigate("/login");
      if (user && pathname === "/login") return navigate("/");
      if (displayName === null) {
        const { displayName, photoURL } = user;
        dispatch(logInUser({ displayName, photoURL }));
      }
    });
    return () => authState;
  }, []);
  return (
    <>
      <NavBar />
      <div
        id="main"
        className={`${
          themeColor === "dark" ? "dark" : "light"
        } pt-[70px] min-h-main bg-gray-100  dark:bg-gray-800`}
        data-mode={themeColor}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default GeneralLayout;
