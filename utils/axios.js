import axios from "axios";

const instance = axios.create({
  baseURL:"https://aravindkumarv-server.xyz"
  // baseURL: "http://localhost:3001/api/mylinkup",
});

export default instance;