import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import "./App.css";
import DetailPage from "./pages/DetailPage";
import GeneralLayout from "./components/GeneralLayout";

function App() {
  const routerData = [
    { id: 0, path: "/", element: <MainPage /> },
    { id: 1, path: "/pokemon/:id", element: <DetailPage /> },
  ];

  return (
    <div className="App">
      <Routes>
        {routerData.map(({ id, path, element }) => (
          <Route
            path={path}
            element={<GeneralLayout>{element}</GeneralLayout>}
            key={id}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
