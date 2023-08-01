import React, { useEffect } from "react";
import { Col, Container, FormCheck, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { checkValidEmail } from "../utils/checkFormValid";
import { userLogin } from "../services/UserServices";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validInfo, setValidInfo] = useState({
    email: undefined,
    password: undefined,
  });
  const [check, setCheck] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    if (event.target.name === "loginEmailInp") {
      setEmail(event.target.value);
    } else if (event.target.name === "loginPasswordlInp") {
      setPassword(event.target.value);
    }
    // setCheck(true);
  };
  const handleSubmitLogin = async () => {
    setCheck(true);
    console.log(isWaiting);
    if (checkValidEmail(email) && password != "" && isWaiting == false) {
      setIsWaiting(true);
      let res = await userLogin(email, password);
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("email", email);
        toast.success(
          "Login succesful ",
          {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          },
          { onclose: navigate("/manage") }
        );

        setIsWaiting(false);
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

        setIsWaiting(false);
      }
    }
  };
  useEffect(() => {
    if (check)
      setValidInfo({
        email: checkValidEmail(email),
        password: password != "",
      });
  }, [email, password, check]);
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/manage");
  }, []);
  return (
    <>
      <Container className="mt-3 ">
        <Form style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
            <Form.Label column className="text-center text-md-start" sm={3}>
              Email address
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="email"
                name="loginEmailInp"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter email"
                style={{
                  border:
                    check && validInfo.email == false && "2px solid #d98a8a",
                }}
              />
            </Col>
            {check && validInfo.email == false && (
              <div
                className="col-12 text-center"
                style={{
                  fontSize: "15px",
                  color: "#d98a8a",
                }}
              >
                Email invalid
              </div>
            )}
            <Form.Text className="text-muted">
              Correct email is : <span>eve.holt@reqres.in</span>
            </Form.Text>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
            <Form.Label className=" text-center text-md-start" column sm={3}>
              Password
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="password"
                placeholder="Password"
                name="loginPasswordlInp"
                value={password}
                onChange={handleInputChange}
                style={{
                  border:
                    check && validInfo.password == false && "2px solid #d98a8a",
                }}
              />
            </Col>
            {check && validInfo.password == false && (
              <div
                className="col-12 text-center"
                style={{
                  fontSize: "15px",
                  color: "#d98a8a",
                }}
              >
                Password is blank
              </div>
            )}
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex justify-content-center"
            controlId="formBasicCheckbox"
          >
            <label
              className="form-check-label me-3 text-center"
              htmlFor="rememberMeLoginCkBox"
            >
              Remember Me :
            </label>
            <input
              className="form-check-input"
              id="rememberMeLoginCkBox"
              type="checkbox"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            id="loginBtnSubmit"
            onClick={handleSubmitLogin}
            // disabled={isWaiting}
          >
            {isWaiting ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : (
              <>Submit</>
            )}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Login;
