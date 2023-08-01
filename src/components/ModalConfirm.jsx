import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../services/UserServices";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";

const ModalConfirm = (props) => {
  const { title, content, modalHandleShow, handleUser, userList, setUserList } =
    props;
  const user = handleUser.user;
  const [isWaiting, setIsWaiting] = useState(false);
  const handleClose = async () => {
    await handleUser.handleUser({});
    modalHandleShow.handleModalShow(false);
  };
  const handleSubmit = async () => {
    setIsWaiting(true);
    let res = await deleteUser(user.id);
    if (res.status === 204) {
      let item = userList.filter((item) => item.id !== user.id);
      setUserList(item);
      toast.success("User deleted", {
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
      toast.error("Erorr...", {
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
    setIsWaiting(false);
  };
  return (
    <>
      <Modal show={modalHandleShow.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isWaiting ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : (
              <>Confirm</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ModalConfirm;
