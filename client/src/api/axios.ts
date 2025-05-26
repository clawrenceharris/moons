import axios from "axios";
const API_BASE = "https://moons-footwear-02391a391225.herokuapp.com/";
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

export default api;
