import { Routes, Route, Outlet } from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Navigation";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
