// import React, { useState } from "react";
// import API, { setAuthToken } from "../api/api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", formData);
//       const token = res.data.token;
//       localStorage.setItem("token", token);
//       setAuthToken(token);
//       alert("Login successful!");
//       navigate("/");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full mb-6 p-3 border rounded"
//           required
//         />
//         <button type="submit" className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }



import React, { useState } from "react";
import API, { setAuthToken } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request
      const res = await API.post("/auth/login", formData);

      // Extract token from backend response
      const token = res.data.token;

      if (!token) {
        alert("Login failed: No token returned");
        return;
      }

      // Save token in localStorage
      localStorage.setItem("token", token);

      // Set token for all future axios requests
      setAuthToken(token);

      alert("Login successful!");
      navigate("/"); // Redirect to Home page
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
