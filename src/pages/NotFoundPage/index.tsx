import Lottie from "react-lottie-player";
import NotfoundImg from "@/assets/image/not-found.png";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const moveToHome = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen max-w-[1000px] mx-auto">
      <div className="w-[400px] mb-4">
        <img src={NotfoundImg} alt="페이지를 찾을 수 없습니다." />
      </div>

      <h1 className="text-4xl font-bold mb-2">
        죄송합니다. 페이지를 찾을 수 없습니다.
      </h1>

      <p className="text-xl mb-6">
        존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의 주소가
        변경,삭제되어 찾을 수 없습니다.
      </p>
      <Button
        text={"메인으로 돌아가기"}
        actions={moveToHome}
        etcClass={"w-[150px]"}
      />
    </div>
  );
};

export default NotFoundPage;
