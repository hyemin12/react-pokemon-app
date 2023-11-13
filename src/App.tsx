import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import GeneralLayout from "./components/GeneralLayout";
import { AuthContextProvier } from "./hooks/auth_context";
import { ThemeContextProvider } from "./hooks/theme_context";
import { PokemonContextProvider } from "./hooks/pokemon_context";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthContextProvier>
        <ThemeContextProvider>
          <PokemonContextProvider>
            <Routes>
              <Route path="/" element={<GeneralLayout />}>
                <Route index element={<MainPage />} />
                <Route path="pokemon/:id" element={<DetailPage />} />
                <Route path="login" element={<LoginPage />} />
              </Route>
            </Routes>
          </PokemonContextProvider>
        </ThemeContextProvider>
      </AuthContextProvier>
    </div>
  );
}

export default App;
