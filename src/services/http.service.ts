import axios, { AxiosInstance } from "axios";

const ACCESS_TOKEN = localStorage.getItem("accessToken");

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    Authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : "NO_AUTHORIZATION",
  },
});

export default apiClient;
