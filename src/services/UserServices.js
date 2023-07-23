import instance from "./custominze_axios";
import axios from "./custominze_axios";

const fetchAllUsers = async (page) => {
  return axios.get(`/api/users?page=${page}`);
};
const creatUser = (email, firstName, lastName) => {
  const user = { name: firstName + " " + lastName, job: "unset" };
  return axios.post(`/api/users`, user);
};
const editUser = (mail, firstName, lastName) => {
  const user = { name: firstName + " " + lastName, job: "unset" };
  return axios.put(`/api/users/2`, user);
};
const deleteUser = (id) => {
  return axios.delete("/api/users/2", id);
};
export { fetchAllUsers, creatUser, editUser, deleteUser };
