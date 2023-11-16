import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import GeneralLayout from "./components/GeneralLayout";
import store from "./store";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<GeneralLayout />}>
            <Route index element={<MainPage />} />
            <Route path="pokemon/:id" element={<DetailPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
