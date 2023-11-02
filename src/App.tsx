import { Outlet, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import "./App.css";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <>
      <NavBar />
      <div id="main" className="pt-[70px] mb-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="pokemon/:id" element={<DetailPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
