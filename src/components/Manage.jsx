import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserServices";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Modal_EditLoginUser from "./Modal_EditLoginUser";
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
  useEffect(() => {
    getUser(1);
  }, []);
  const getUser = async (page) => {
    let res = await fetchAllUsers(page);
    // console.log(res);
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
  const handleShowAddNewUserModal = () => {
    handleUserModalShow({ isAdd: true, isShow: true });
  };
  const handleAddNewUser = (user) => {
    setUserList([user, ...userList]);
  };
  const handleEditUser = () => {
    handleUserModalShow({ isAdd: false, isShow: true });
  };
  const handleDeleteUser = () => {};
  return (
    <Container className="mt-2">
      <div className="d-flex justify-content-between mb-2">
        <span className="my-auto">List Users: </span>
        <Button
          variant="success"
          className=""
          onClick={handleShowAddNewUserModal}
        >
          Add new User
        </Button>
      </div>
      <Modal_EditLoginUser
        modalInfo={{
          UserModalInfo,
          handleUserModalShow,
        }}
        handleAddNewUser={handleAddNewUser}
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
                        onClick={handleEditUser}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="mb-1"
                        onClick={handleDeleteUser}
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
