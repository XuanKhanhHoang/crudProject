import "./App.scss";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import AppRouters from "./routes/AppRouters";
import { useDispatch } from "react-redux";
import { USER_LOGIN_SUCCESS } from "./redux/actions/userAction";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let email = localStorage.getItem("email");
    let token = localStorage.getItem("token");
    if (email && token) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { account: { email: email, token: token } },
      });
    }
  }, []);
  return (
    <div className="app-container">
      <AppRouters />
      <ToastContainer />
    </div>
  );
}

export default App;
