import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import NotfoundImg from "@/assets/image/not-found.png";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const moveToHome = () => {
    navigate("/");
  };
  return (
    <div className="mx-auto flex min-h-main w-full max-w-[1000px]  flex-col items-center justify-center px-7 text-center  text-gray-800 dark:text-white">
      <div className="mb-4 w-[400px] ">
        <img src={NotfoundImg} alt="페이지를 찾을 수 없습니다." />
      </div>

      <h1 className="mb-2 w-full text-3xl font-bold md:text-4xl ">
        죄송합니다. 페이지를 찾을 수 없습니다.
      </h1>

      <p className=" mb-6 text-xl ">
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
