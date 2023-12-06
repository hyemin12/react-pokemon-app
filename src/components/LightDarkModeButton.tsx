import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeThemeColor } from "@/store/theme/theme.slice";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const LightDarkModeButton = () => {
  const { themeColor } = useAppSelector((state) => state.themeSlice);
  const dispatch = useAppDispatch();
  const toggleChangeThemeColor = (color: string) => {
    console.log(color, themeColor);
    dispatch(changeThemeColor(color));
  };
  return (
    <button
      className={`
        flex
        h-[30px] w-[30px] items-center justify-center rounded-lg
          border-2 bg-transparent p-2 text-sm
      `}
    >
      {themeColor === "dark" ? (
        <MdDarkMode
          onClick={() => toggleChangeThemeColor("light")}
          className="text-lg text-white"
        />
      ) : (
        <MdLightMode
          onClick={() => toggleChangeThemeColor("dark")}
          className="text-lg text-white"
        />
      )}
    </button>
  );
};

export default LightDarkModeButton;
