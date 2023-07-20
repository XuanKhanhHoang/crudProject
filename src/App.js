import { Routes, Route, Outlet } from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;
