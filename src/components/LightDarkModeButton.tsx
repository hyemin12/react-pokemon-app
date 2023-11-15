import { useAppDispatch } from "@/hooks/redux";
import { changeThemeColor } from "@/store/theme/theme.slice";
import { MdLightMode, MdDarkMode } from "react-icons/md";
const theme = "dark";

const LightDarkModeButton = () => {
  const dispatch = useAppDispatch();
  const toggleChangeThemeColor = (color: string) => {
    dispatch(changeThemeColor(color));
  };
  return (
    <button
      className={`
        bg-transparent
        w-[30px] h-[30px] flex justify-center items-center
          border-2 rounded-lg text-sm p-2
      `}
    >
      {theme === "dark" ? (
        <MdDarkMode
          onClick={() => toggleChangeThemeColor("light")}
          className="text-white text-lg"
        />
      ) : (
        <MdLightMode
          onClick={() => toggleChangeThemeColor("dark")}
          className="text-white text-lg"
        />
      )}
    </button>
  );
};

export default LightDarkModeButton;
