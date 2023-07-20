import instance from "./custominze_axios";
import axios from "./custominze_axios";

const fetchAllUsers = (page) => {
  return axios.get(`/api/users?page=${page}`);
};
const creatUser = (email, firstName, lastName) => {
  const user = { name: firstName + " " + lastName, job: "unset" };
  return axios.post(`/api/users`, user);
};
export { fetchAllUsers, creatUser };
