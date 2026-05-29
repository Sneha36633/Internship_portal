import axios from "axios";

// set your backend URL here
console.log("API URL =", import.meta.env.VITE_API_URL);

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
// Authentication endpoints
export const login = (data) => API.post("/api/auth/login", data);
export const register = (data) => API.post("/api/auth/register", data);

// Internship endpoints
export const getInternships = () => API.get("/api/internships");
export const getInternshipById = (id) => API.get(`/api/internships/${id}`);

// Skills endpoints
export const getSkills = () => API.get("/api/skills");

// Companies endpoints
export const getCompanies = () => API.get("/api/companies");

// Users endpoints
export const getUserProfile = () => API.get("/api/users/me");

export default API;
