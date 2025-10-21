import axios from "axios";

// URL backend Railway
const API = axios.create({
  baseURL: "https://deploy-backend-login-production.up.railway.app/"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
