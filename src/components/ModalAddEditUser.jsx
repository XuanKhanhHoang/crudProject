import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { creatUser, editUser } from "../services/UserServices";

import { ToastContainer, toast } from "react-toastify";
import { checkValidEmail } from "../utils/checkFormValid";
const Modal_AddEditUser = (props) => {
  const isAdd = props.modalInfo.UserModalInfo.isAdd;
  const isShow = props.modalInfo.UserModalInfo.isShow;
  const edittingUserData = props.editingUserData;
  const handleAddNewUser = props.handleAddNewUser;
  const setEditingUserData = props.setEditingUserData;

  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [email, setEmail] = useState("");
  const [validation, setValidate] = useState({
    email: undefined,
    firstName: undefined,
    lastName: undefined,
  });
  const [isWaiting, setIsWaiting] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const handleSubmit = async () => {
    if (isAdd) setIsCheck(true);
    if (
      name.lastName !== "" &&
      name.firstName !== "" &&
      checkValidEmail(email) &&
      isWaiting === false
    ) {
      setIsWaiting(true);
      if (isAdd) {
        const res = await creatUser(email, name.firstName, name.lastName);
        if (res.id) {
          handleAddNewUser({
            id: res.id,
            email: email,
            first_name: name.firstName,
            last_name: name.lastName,
          });
          toast.success("User created ", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          handleClose();
        } else {
          console.log(res);
          toast.error("Error ...", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        const res = await editUser(email, name.firstName, name.lastName);
        if (res.updatedAt) {
          await setEditingUserData({
            id: edittingUserData.id,
            email: email,
            first_name: name.firstName,
            last_name: name.lastName,
          });
          toast.success("User updated ", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          handleClose();
        } else {
          console.log(res);
          toast.error("Error ...", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }

      setIsWaiting(false);

      setIsCheck(false);
      setValidate({
        email: undefined,
        firstName: undefined,
        lastName: undefined,
      });
    }
  };
  const handleInputChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "firstName") {
      setName((pre) => ({ ...pre, firstName: event.target.value }));
    } else if (event.target.name === "lastName") {
      setName((pre) => ({
        ...pre,
        lastName: event.target.value,
      }));
    }
  };
  const validateInfoUser = () => {
    let emailInp = validation.email;
    let lastName = validation.lastName;
    let firstName = validation.firstName;
    if (checkValidEmail(email)) {
      emailInp = true;
    } else emailInp = false;
    if (name.firstName !== "") {
      firstName = true;
    } else firstName = false;
    if (name.lastName !== "") {
      lastName = true;
    } else lastName = false;
    setValidate({ email: emailInp, firstName, lastName });
  };

  const handleClose = () => {
    setEmail("");
    setName({ firstName: "", lastName: "" });
    // setEditingUserData({ id: null, email: "", first_name: "", last_name: "" });
    setIsCheck(false);
    props.modalInfo.handleUserModalShow({ isAdd: undefined, isShow: false });
  };
  useEffect(() => {
    if (isCheck) {
      validateInfoUser();
    }
  }, [email, name.firstName, name.lastName, isCheck]);
  useEffect(() => {
    if (!isAdd && isShow) {
      setEmail(edittingUserData.email);
      setName({
        firstName: edittingUserData.first_name,
        lastName: edittingUserData.last_name,
      });
      setEditingUserData(edittingUserData);
      setIsCheck(true);
    }
  }, [edittingUserData, isAdd, isShow]);
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
              {validation.email === false && (
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
                value={name.firstName}
                name="firstName"
                onChange={handleInputChange}
                style={{
                  border: validation.firstName === false && "2px solid #d98a8a",
                }}
              />
              {validation.firstName === false && (
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
                value={name.lastName}
                name="lastName"
                onChange={handleInputChange}
                style={{
                  border: validation.lastName === false && "2px solid #d98a8a",
                }}
              />
              {validation.lastName === false && (
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
            // disabled={!isValid}
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
      {/* <ToastContainer /> */}
    </>
  );
};

export default Modal_AddEditUser;
