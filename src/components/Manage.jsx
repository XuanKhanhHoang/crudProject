import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { deleteUser, fetchAllUsers } from "../services/UserServices";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Modal_AddEditUser from "./Modal_AddEditUser";
function Manage(props) {
  const pageOffset = 0;
  const [userList, setUserList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [UserModalInfo, handleUserModalShow] = useState({
    isAdd: true,
    isShow: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [editingUserData, setEditingUserData] = useState({});
  useEffect(() => {
    getUser(1);
  }, []);
  useEffect(() => {
    if (!UserModalInfo.isShow) {
      let item = userList.map((item) =>
        item.id == editingUserData.id ? editingUserData : item
      );
      setUserList(item);
    }
  }, [editingUserData]);
  const getUser = async (page) => {
    let res = await fetchAllUsers(page);
    if (res && res.data) {
      setUserList(res.data);
      setTotalPage(res.total_pages);
    } else {
      setIsError(true);
    }

    setIsLoading(false);
  };
  const handlePageChange = (props) => {
    getUser(+props.selected + 1);
  };
  const handleAddNewUser = (user) => {
    setUserList([user, ...userList]);
  };
  const handleEditUser = (user) => {
    setEditingUserData(user);
    handleUserModalShow({ isAdd: false, isShow: true });
  };
  const handleDeleteUser = async (user) => {
    let res = await deleteUser(user.id);
    if (res.status === 204) {
      let item = userList.filter((item) => item.id !== user.id);
      setUserList(item);
    }
  };
  return (
    <Container className="mt-2">
      <div className="d-flex justify-content-between mb-2">
        <span className="my-auto">List Users: </span>
        <Button
          variant="success"
          className=""
          onClick={() => handleUserModalShow({ isAdd: true, isShow: true })}
        >
          Add new User
        </Button>
      </div>
      <Modal_AddEditUser
        modalInfo={{
          UserModalInfo,
          handleUserModalShow,
        }}
        handleAddNewUser={handleAddNewUser}
        editingUserData={editingUserData}
        setEditingUserData={setEditingUserData}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.length > 0 &&
            userList.map((user, index) => {
              return (
                <tr key={`user+${index}`}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>
                    <div className="btnGroup-action">
                      <Button
                        variant="warning"
                        className="me-1 mb-1"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="mb-1"
                        onClick={() => handleDeleteUser(user)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {isLoading && (
        <span className="d-block text-center">
          {" "}
          Loading <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        </span>
      )}
      {isError && (
        <span className="d-block text-center"> Something wrong ....</span>
      )}
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link shadow-none"
        previousClassName="page-item "
        previousLinkClassName="page-link shadow-none"
        nextClassName="page-item"
        nextLinkClassName="page-link shadow-none"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={totalPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={pageOffset}
      />
    </Container>
  );
}

export default Manage;
