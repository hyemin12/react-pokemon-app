import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Lottie from "react-lottie-player";
import { login } from "@/api/Login";
import app from "@/firebase";
import Button from "@/components/Button";
import { useAppDispatch } from "@/hooks/redux";
import { logInUser } from "@/store/user/user.slice";
import animationJSON from "@/assets/image/pokemonAnimation.json";

const LoginPage = () => {
  const auth = getAuth(app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginHandler = async () => {
    const userRes = await login(auth);
    if (!userRes) return alert("로그인에 실패하였습니다.");
    const { displayName, photoURL } = userRes;
    dispatch(logInUser({ displayName, photoURL }));
    navigate("/");
  };

  return (
    <section className="flex min-h-main items-center justify-center bg-[#e0ddd2]  dark:bg-gray-800 ">
      <div className="flex max-w-4xl flex-col-reverse items-center justify-center rounded-2xl bg-gray-100  px-11 py-5 text-center shadow-lg dark:bg-gray-600 md:flex-row  md:justify-start md:text-left">
        <div className="text-gray-800 dark:text-white">
          <h2 className="text-5xl font-bold ">Pokemon</h2>
          <p className="text-m mt-4 ">포켓몬 사이트에 오신걸</p>
          <p className="text-m mb-6 ">환영합니다.</p>
          <Button
            text="로그인 하기"
            actions={loginHandler}
            etcClass={"w-full md:w-32"}
          />
        </div>

        <div className="mb-2 w-full md:mb-0 md:w-1/2 ">
          <Lottie
            play
            loop
            animationData={animationJSON}
            style={{ width: "320px" }}
          />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
