import { ThemeProps, useThemeContext } from "@/hooks/theme_context";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const LightDarkModeButton = () => {
  const { theme, setTheme } = useThemeContext() as ThemeProps;
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
          onClick={() => setTheme("light")}
          className="text-white text-lg"
        />
      ) : (
        <MdLightMode
          onClick={() => setTheme("dark")}
          className="text-white text-lg"
        />
      )}
    </button>
  );
};

export default LightDarkModeButton;
