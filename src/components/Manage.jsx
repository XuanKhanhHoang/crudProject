import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserServices";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Modal_AddEditUser from "./ModalAddEditUser";
import ModalConfirm from "./ModalConfirm";
import { useNavigate, useParams } from "react-router-dom";
function Manage(props) {
  const [userList, setUserList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [UserModalInfo, handleUserModalShow] = useState({
    isAdd: true,
    isShow: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [editingUserData, setEditingUserData] = useState({});
  const [deleteModalIsShow, setDeleteModalIsShow] = useState(false);
  const navigate = useNavigate();
  const { page } = useParams();
  useEffect(() => {
    if (page === undefined) navigate("./1");
  }, []);
  useEffect(() => {
    let tempPage = page;
    if (!page) tempPage = 1;
    document.getElementById("seachingManage").value = "";
    getUser(tempPage);
  }, [page]);
  useEffect(() => {
    if (!UserModalInfo.isShow) {
      let item = userList.map((item) =>
        item.id === editingUserData.id ? editingUserData : item
      );
      setUserList(item);
    }
  }, [editingUserData, UserModalInfo.isShow]);
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
    navigate(`/manage/${+props.selected + 1}`);
  };
  const handleAddNewUser = (user) => {
    setUserList([user, ...userList]);
  };
  const handleEditUser = (user) => {
    setEditingUserData(user);
    handleUserModalShow({ isAdd: false, isShow: true });
  };
  const handleDeleteUser = async (user) => {
    setEditingUserData(user);
    setDeleteModalIsShow(true);
  };
  const handleSearchUser = (event) => {
    let waitingSearch;
    clearTimeout(waitingSearch);
    waitingSearch = setTimeout(() => {
      let res;
      let keyword = event.target.value;
      if (keyword != "") {
        res = userList.filter((user) => user.email.includes(keyword));
        setUserList(res);
      } else {
        getUser(page);
      }
    }, 500);
  };
  return (
    <Container className="mt-2">
      <Modal_AddEditUser
        modalInfo={{
          UserModalInfo,
          handleUserModalShow,
        }}
        handleAddNewUser={handleAddNewUser}
        editingUserData={editingUserData}
        setEditingUserData={setEditingUserData}
      />
      <ModalConfirm
        title={"Delete user "}
        content={`Delete user have id is ${editingUserData.id}`}
        modalHandleShow={{
          show: deleteModalIsShow,
          handleModalShow: setDeleteModalIsShow,
        }}
        handleUser={{ user: editingUserData, handleUser: setEditingUserData }}
        userList={userList}
        setUserList={setUserList}
      />{" "}
      <div className="col-12 col-sm-6">
        <input
          className="form-control "
          type="text"
          placeholder="Seaching by email here ..."
          id="seachingManage"
          onChange={handleSearchUser}
        ></input>
      </div>
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>
              <div className="">
                <span>First Name</span>{" "}
                <i class="fa-solid fa-arrow-up-z-a "></i>
              </div>
            </th>
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
        initialPage={page - 1}
      />
    </Container>
  );
}

export default Manage;
