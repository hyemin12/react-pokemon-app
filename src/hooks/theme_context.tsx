import { createContext, useState, useContext } from "react";

interface ThemeContextProps {
  children: React.ReactNode;
}

export interface ThemeProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}
const ThemeContext = createContext<ThemeProps | null>(null);

export function ThemeContextProvider({ children }: ThemeContextProps) {
  const [theme, setTheme] = useState("dark");
  const value = { theme, setTheme };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
export function useThemeContext() {
  return useContext(ThemeContext);
}
