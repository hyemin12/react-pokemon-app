import { Outlet, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import "./App.css";
import GeneralLayout from "./components/GeneralLayout";
import { AuthContextProvier } from "./hooks/auth_context";
import { ThemeContextProvider } from "./hooks/theme_context";
import { PokemonContextProvider } from "./hooks/pokemon_context";

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
