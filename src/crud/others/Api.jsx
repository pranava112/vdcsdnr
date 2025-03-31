import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8080/api/vignan", // ✅ Ensure it matches the Spring Boot backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: intercept the response to handle errors globally
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error: ", error);
    return Promise.reject(error);
  }
);

export default Api;
