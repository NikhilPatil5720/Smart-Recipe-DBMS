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




// //working version
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
//       // Send login request
//       const res = await API.post("/auth/login", formData);

//       // Extract token from backend response
//       const token = res.data.token;

//       if (!token) {
//         alert("Login failed: No token returned");
//         return;
//       }

//       // Save token in localStorage
//       localStorage.setItem("token", token);

//       // Set token for all future axios requests
//       setAuthToken(token);

//       alert("Login successful!");
//       navigate("/"); // Redirect to Home page
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full mb-6 p-3 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }






//login with validation

// import React, { useState } from "react";
// import API, { setAuthToken } from "../api/api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const errs = {};
//     if (!formData.email) errs.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email format";

//     if (!formData.password) errs.password = "Password is required";
//     else if (formData.password.length < 6) errs.password = "Password must be at least 6 characters";

//     setErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const res = await API.post("/auth/login", formData);
//       const token = res.data.token;
//       const user = res.data.user;

//       if (!token || !user) {
//         alert("Login failed: incomplete response");
//         return;
//       }

//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       setAuthToken(token);

//       alert("Login successful!");
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full mb-1 p-3 border rounded"
//         />
//         {errors.email && <p className="text-red-500 mb-2">{errors.email}</p>}

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full mb-1 p-3 border rounded"
//         />
//         {errors.password && <p className="text-red-500 mb-2">{errors.password}</p>}

//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 mt-4"
//         >
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
  const [errors, setErrors] = useState({}); // store validation errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    // If no errors, return true
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before sending request
    if (!validate()) return;

    try {
      const res = await API.post("/auth/login", formData);

      const token = res.data.token;
      const user = res.data.user;

      if (!token || !user) {
        alert("Login failed: incomplete response from server");
        return;
      }

      localStorage.setItem("token", token);
      setAuthToken(token);

      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful!");
      navigate("/");
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
          className="w-full mb-2 p-3 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-2 p-3 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password}</p>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
}
