// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import apiClient from '../services/apiClient'; // We'll use our central API client

// // 1. Create the context object
// const AuthContext = createContext(null);

// // 2. Create a custom hook for easy access to the context
// export function useAuth() {
//   return useContext(AuthContext);
// }

// // 3. Create the Provider component that will wrap our application
// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(() => localStorage.getItem('token')); // Load token from storage on initial load
//   const [loading, setLoading] = useState(true); // To handle initial auth check
//   const navigate = useNavigate();

//   // This effect runs whenever the token changes or on initial app load
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (token) {
//         try {
//           // If a token exists, try to fetch the user's profile to validate it
//           const response = await apiClient.get('/api/users/me');
//           setUser(response.data);
//         } catch (error) {
//           // If the token is invalid or expired, clear it
//           console.error("Token is invalid or expired. Logging out.");
//           localStorage.removeItem('token');
//           setToken(null);
//           setUser(null);
//         }
//       }
//       // Finished checking, set loading to false
//       setLoading(false);
//     };
//     fetchUser();
//   }, [token]);

//   // Function to handle user login
//   const login = async (formData) => {
//     const response = await apiClient.post('/api/auth/login', formData, {
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     });
//     const { access_token } = response.data;
//     localStorage.setItem('token', access_token);
//     setToken(access_token); // This will trigger the useEffect to fetch the user
//   };

//   // Function to handle new user registration
//   const register = async (userData) => {
//     // This just creates the user. The user will then need to log in.
//     await apiClient.post('/api/auth/register', userData);
//   };

//   // Function to handle user logout
//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//     navigate('/login'); // Redirect to login page after logout
//   };

//   // The value that will be provided to all consuming components
//   const value = {
//     user,
//     isAuthenticated: !!token, // True if a token exists, false otherwise
//     loading,
//     login,
//     register,
//     logout,
//   };

//   // We render the children only after the initial loading check is complete
//   // to prevent UI flashes (e.g., showing "Login" for a split second to a logged-in user).
//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

