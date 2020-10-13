import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://burger-me-bf1b4.firebaseio.com/",
});

export default axiosInstance;
