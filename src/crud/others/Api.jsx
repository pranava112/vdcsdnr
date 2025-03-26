import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8080/api/vignan", // ✅ Ensure it matches the Spring Boot backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;