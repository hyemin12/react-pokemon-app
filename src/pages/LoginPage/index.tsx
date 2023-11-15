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
    console.log(userRes);
    if (!userRes) return alert("로그인에 실패하였습니다.");
    const { displayName, photoURL } = userRes;
    dispatch(logInUser({ displayName, photoURL }));
    navigate("/");
  };

  return (
    <section className="bg-[#e0ddd2] min-h-main flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-4xl py-5 px-11 items-center">
        <div className="">
          <h2 className="font-bold text-5xl">Pokemon</h2>
          <p className="text-m mt-4 text-[#002D74]">포켓몬 사이트에 오신걸</p>
          <p className="text-m mb-6 text-[#002D74]">환영합니다.</p>
          <Button text="로그인 하기" actions={loginHandler} />
        </div>

        <div className="md:block hidden w-1/2">
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
