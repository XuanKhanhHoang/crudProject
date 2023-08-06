import { toast } from "react-toastify";
import { userLogin } from "../../services/UserServices";

export const USER_LOGIN_FETCHING = "USER_LOGIN_FETCHING";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCESS";
export const USER_LOGOUT = "USER_LOGOUT";
export const handleLoginRedux = (email, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_LOGIN_FETCHING });
    let trimEmail = email.trim();
    let res = await userLogin(trimEmail, password);
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("email", trimEmail);
      toast.success("Login succesful ", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { account: { email: trimEmail, token: res.token } },
      });
    } else {
      let noftyText = "Error...";
      if (res.response)
        if (res.response.data)
          if (res.response.data.error)
            noftyText =
              res.response.data.error[0].toUpperCase() +
              res.response.data.error.slice(1);
      toast.error(noftyText, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({
        type: USER_LOGIN_ERROR,
      });
    }
  };
};
