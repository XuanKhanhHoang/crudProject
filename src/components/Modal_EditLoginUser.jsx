import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { creatUser } from "../services/UserServices";
const Modal_EditLoginUser = (props) => {
  const isAdd = props.modalInfo.UserModalIsShow.isAdd;
  const isShow = props.modalInfo.UserModalIsShow.isShow;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState({ frstName: "", lstName: "" });
  const [email, setEmail] = useState("");
  const [validation, setValidate] = useState({
    email: undefined,
    frstN: undefined,
    lstN: undefined,
  });
  const [isWaiting, setIsWaiting] = useState(false);
  const handleClose = () => {
    props.modalInfo.handleUserModalShow({ isAdd: "", isShow: false });
  };
  const validateInfoUser = () => {
    let rx = /\S+@\S+\.\S+/;
    let emailInp = validation.email;
    let lstN = validation.lstN;
    let frstN = validation.frstN;
    if (email !== "" && rx.test(email)) {
      emailInp = true;
    } else emailInp = false;
    if (name.frstName !== "") {
      frstN = true;
    } else frstN = false;
    if (name.lstName !== "") {
      lstN = true;
    } else lstN = false;
    setValidate({ email: emailInp, frstN, lstN });
  };
  const handleInputChange = (event) => {
    setIsSubmitted(false);
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "firstName") {
      setName({
        firstName: event.target.value,
        lastName: name.lastName,
      });
    } else if (event.target.name === "lastName") {
      setName({
        firstName: name.firstName,
        lastName: event.target.value,
      });
    }
    isValid =
      isSubmitted &&
      validation.email === true &&
      validation.firstName === true &&
      validation.lastName === true;
  };
  const handleSubmit = async () => {
    setIsSubmitted(true);
    if (
      validation.email === true &&
      validation.frstN === true &&
      validation.lstN === true &&
      isWaiting === false
    ) {
      console.log(validation);
      setIsWaiting(true);
      const res = await creatUser(email, name.frstName, name.lstName);
      if (res.id) {
        setIsWaiting(false);
        handleClose();
        console.log(res);
      } else console.log("err");
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      validateInfoUser();
    }
  }, [isSubmitted, email, name.firstName, name.lastName]);
  let isValid = true;
  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isAdd ? <>Add</> : <>Edit</>} User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@email.com"
                value={email}
                name="email"
                onChange={handleInputChange}
                style={{
                  border: validation.email === false && "2px solid #d98a8a",
                }}
              />
              {validation.email == false && (
                <div
                  className="col-12 "
                  style={{
                    fontSize: "15px",
                    color: "#d98a8a",
                  }}
                >
                  Email invalid
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Fist Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your First name"
                value={name.frstName}
                name="firstName"
                onChange={handleInputChange}
                style={{
                  border: validation.frstN === false && "2px solid #d98a8a",
                }}
              />
              {validation.frstN == false && (
                <div
                  className="col-12 "
                  style={{
                    fontSize: "15px",
                    color: "#d98a8a",
                  }}
                >
                  First name is empty
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Last name"
                value={name.lstName}
                name="lastName"
                onChange={handleInputChange}
                style={{
                  border: validation.lstN === false && "2px solid #d98a8a",
                }}
              />
              {validation.lstN == false && (
                <div
                  className="col-12 "
                  style={{
                    fontSize: "15px",
                    color: "#d98a8a",
                  }}
                >
                  Last name is empty
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            aria-label="Close modal"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            aria-label="Submit form"
            disabled={!isValid}
          >
            {isWaiting ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : isAdd ? (
              <>Creat User</>
            ) : (
              <>Confirm</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modal_EditLoginUser;
