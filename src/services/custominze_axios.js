import axios from "axios";
const instance = axios.create({
  baseURL: "https://reqres.in",
  timeout: 5000,
});

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.config.method === "delete") return response;
    else return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error);
    return error;
  }
);
export default instance;
