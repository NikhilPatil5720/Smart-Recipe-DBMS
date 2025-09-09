import React, { useState } from "react";
import API, { setAuthToken } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AddRecipe() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cuisine: "",
    dietary_type: "",
    cook_time: "",
    difficulty: "",
    image_url: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      await API.post("/recipes", formData);
      alert("Recipe added successfully!");
      navigate("/"); // Redirect to Home
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add recipe");
    }
  };

  return (
    <div className="p-6 flex justify-center items-start min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h2>
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine (e.g., Indian, Italian)"
          value={formData.cuisine}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="text"
          name="dietary_type"
          placeholder="Dietary Type (e.g., Vegan, Veg)"
          value={formData.dietary_type}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="number"
          name="cook_time"
          placeholder="Cook Time (minutes)"
          value={formData.cook_time}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <input
          type="text"
          name="image_url"
          placeholder="Image URL (optional)"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}
