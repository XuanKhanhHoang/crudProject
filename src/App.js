import "./App.scss";
import { ToastContainer } from "react-toastify";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import AppRouters from "./routes/AppRouters";
function App() {
  const { login } = useContext(UserContext);
  useEffect(() => {
    let email = localStorage.getItem("email");
    let token = localStorage.getItem("token");
    if (email && token) {
      login(email, token);
    }
  }, [login]);
  return (
    <div className="app-container">
      <AppRouters />
      <ToastContainer />
    </div>
  );
}

export default App;
