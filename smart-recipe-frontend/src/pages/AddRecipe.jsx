// // import React, { useState } from "react";
// // import API, { setAuthToken } from "../api/api";
// // import { useNavigate } from "react-router-dom";

// // export default function AddRecipe() {
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     description: "",
// //     cuisine: "",
// //     dietary_type: "",
// //     cook_time: "",
// //     difficulty: "",
// //     image_url: "",
// //   });

// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const token = localStorage.getItem("token");
// //       setAuthToken(token);
// //       await API.post("/recipes", formData);
// //       alert("Recipe added successfully!");
// //       navigate("/"); // Redirect to Home
// //     } catch (err) {
// //       console.error(err);
// //       alert(err.response?.data?.message || "Failed to add recipe");
// //     }
// //   };

// //   return (
// //     <div className="p-6 flex justify-center items-start min-h-screen bg-gray-100">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-8 rounded shadow-md w-full max-w-lg"
// //       >
// //         <h2 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h2>
// //         <input
// //           type="text"
// //           name="title"
// //           placeholder="Recipe Title"
// //           value={formData.title}
// //           onChange={handleChange}
// //           className="w-full mb-4 p-3 border rounded"
// //           required
// //         />
// //         <textarea
// //           name="description"
// //           placeholder="Description"
// //           value={formData.description}
// //           onChange={handleChange}
// //           className="w-full mb-4 p-3 border rounded"
// //           required
// //         />
// //         <input
// //           type="text"
// //           name="cuisine"
// //           placeholder="Cuisine (e.g., Indian, Italian)"
// //           value={formData.cuisine}
// //           onChange={handleChange}
// //           className="w-full mb-4 p-3 border rounded"
// //           required
// //         />
// //         <input
// //           type="text"
// //           name="dietary_type"
// //           placeholder="Dietary Type (e.g., Vegan, Veg)"
// //           value={formData.dietary_type}
// //           onChange={handleChange}
// //           className="w-full mb-4 p-3 border rounded"
// //           required
// //         />
// //         <input
// //           type="number"
// //           name="cook_time"
// //           placeholder="Cook Time (minutes)"
// //           value={formData.cook_time}
// //           onChange={handleChange}
// //           className="w-full mb-4 p-3 border rounded"
// //           required
// //         />
// //         <select
// //           name="difficulty"
// //           value={formData.difficulty}
// //           onChange={handleChange}
// //           className="w-full mb-4 p-3 border rounded"
// //           required
// //         >
// //           <option value="">Select Difficulty</option>
// //           <option value="Easy">Easy</option>
// //           <option value="Medium">Medium</option>
// //           <option value="Hard">Hard</option>
// //         </select>
// //         <input
// //           type="text"
// //           name="image_url"
// //           placeholder="Image URL (optional)"
// //           value={formData.image_url}
// //           onChange={handleChange}
// //           className="w-full mb-6 p-3 border rounded"
// //         />
// //         <button
// //           type="submit"
// //           className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
// //         >
// //           Add Recipe
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }












// //new schema

// import React, { useState, useEffect } from "react";
// import API, { setAuthToken } from "../api/api";
// import { useNavigate } from "react-router-dom";

// export default function AddRecipe() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     cuisine_id: "",
//     cook_time: "",
//     difficulty: "",
//     image_url: "",
//     ingredients: [], // Array of { name, quantity }
//   });

//   const [newIngredient, setNewIngredient] = useState({ name: "", quantity: "" });
//   const [cuisines, setCuisines] = useState([]);

//   // Fetch cuisines
//   useEffect(() => {
//     const fetchCuisines = async () => {
//       try {
//         const res = await API.get("/cuisines");
//         setCuisines(res.data);
//       } catch (err) {
//         console.error("Fetch cuisines error:", err);
//       }
//     };
//     fetchCuisines();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleIngredientChange = (index, e) => {
//     const updated = [...formData.ingredients];
//     updated[index][e.target.name] = e.target.value;
//     setFormData({ ...formData, ingredients: updated });
//   };

//   const addIngredientToList = () => {
//     if (!newIngredient.name || !newIngredient.quantity) return;
//     setFormData({
//       ...formData,
//       ingredients: [...formData.ingredients, { ...newIngredient }],
//     });
//     setNewIngredient({ name: "", quantity: "" });
//   };

//   const removeIngredientField = (index) => {
//     const updated = formData.ingredients.filter((_, i) => i !== index);
//     setFormData({ ...formData, ingredients: updated });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       setAuthToken(token);

//       await API.post("/recipes", formData);
//       alert("Recipe added successfully!");
//       navigate("/"); // Redirect to Home
//     } catch (err) {
//       console.error("Add recipe error:", err);
//       alert(err.response?.data?.message || "Failed to add recipe");
//     }
//   };

//   return (
//     <div className="p-6 flex justify-center items-start min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-lg"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h2>

//         <input
//           type="text"
//           name="title"
//           placeholder="Recipe Title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         />

//         <select
//           name="cuisine_id"
//           value={formData.cuisine_id}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         >
//           <option value="">Select Cuisine</option>
//           {cuisines.map((c) => (
//             <option key={c.cuisine_id} value={c.cuisine_id}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="number"
//           name="cook_time"
//           placeholder="Cook Time (minutes)"
//           value={formData.cook_time}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         />

//         <select
//           name="difficulty"
//           value={formData.difficulty}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         >
//           <option value="">Select Difficulty</option>
//           <option value="Easy">Easy</option>
//           <option value="Medium">Medium</option>
//           <option value="Hard">Hard</option>
//         </select>

//         <input
//           type="text"
//           name="image_url"
//           placeholder="Image URL (optional)"
//           value={formData.image_url}
//           onChange={handleChange}
//           className="w-full mb-6 p-3 border rounded"
//         />

//         {/* Ingredients Section */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
//           {formData.ingredients.map((ing, index) => (
//             <div key={index} className="flex gap-2 mb-2">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Ingredient Name"
//                 value={ing.name}
//                 onChange={(e) => handleIngredientChange(index, e)}
//                 className="flex-1 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="quantity"
//                 placeholder="Quantity"
//                 value={ing.quantity}
//                 onChange={(e) => handleIngredientChange(index, e)}
//                 className="flex-1 p-2 border rounded"
//                 required
//               />
//               {formData.ingredients.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeIngredientField(index)}
//                   className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
//                 >
//                   X
//                 </button>
//               )}
//             </div>
//           ))}

//           {/* New Ingredient Inline Add */}
//           <div className="flex gap-2 mt-2">
//             <input
//               type="text"
//               placeholder="New Ingredient Name"
//               value={newIngredient.name}
//               onChange={(e) =>
//                 setNewIngredient({ ...newIngredient, name: e.target.value })
//               }
//               className="flex-1 p-2 border rounded"
//             />
//             <input
//               type="text"
//               placeholder="Quantity"
//               value={newIngredient.quantity}
//               onChange={(e) =>
//                 setNewIngredient({ ...newIngredient, quantity: e.target.value })
//               }
//               className="flex-1 p-2 border rounded"
//             />
//             <button
//               type="button"
//               onClick={addIngredientToList}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//               Add
//             </button>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
//         >
//           Add Recipe
//         </button>
//       </form>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import API, { setAuthToken } from "../api/api";
// import { useNavigate } from "react-router-dom";

// export default function AddRecipe() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     cuisine_id: "",
//     cook_time: "",
//     difficulty: "",
//     image_url: "",
//     ingredients: [], // Array of { name, quantity, unit_id }
//   });

//   const [newIngredient, setNewIngredient] = useState({
//     name: "",
//     quantity: "",
//     unit_id: "",
//   });

//   const [cuisines, setCuisines] = useState([]);
//   const [units, setUnits] = useState([]);

//   // Fetch cuisines and units
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [cuisinesRes, unitsRes] = await Promise.all([
//           API.get("/cuisines"),
//           API.get("/units"),
//         ]);
//         setCuisines(cuisinesRes.data);
//         setUnits(unitsRes.data);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleIngredientChange = (index, e) => {
//     const updated = [...formData.ingredients];
//     updated[index][e.target.name] = e.target.value;
//     setFormData({ ...formData, ingredients: updated });
//   };

//   const addIngredientToList = () => {
//     if (!newIngredient.name || !newIngredient.quantity || !newIngredient.unit_id) {
//       return alert("Please enter ingredient name, quantity, and unit");
//     }
//     setFormData({
//       ...formData,
//       ingredients: [...formData.ingredients, { ...newIngredient }],
//     });
//     setNewIngredient({ name: "", quantity: "", unit_id: "" });
//   };

//   const removeIngredientField = (index) => {
//     const updated = formData.ingredients.filter((_, i) => i !== index);
//     setFormData({ ...formData, ingredients: updated });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.ingredients.length) return alert("Add at least one ingredient");

//     try {
//       const token = localStorage.getItem("token");
//       setAuthToken(token);

//       // Send the full recipe with ingredients (backend handles creating missing ingredients)
//       await API.post("/recipes", formData);
//       alert("Recipe added successfully!");
//       navigate("/"); // Redirect to Home
//     } catch (err) {
//       console.error("Add recipe error:", err);
//       alert(err.response?.data?.message || "Failed to add recipe");
//     }
//   };

//   return (
//     <div className="p-6 flex justify-center items-start min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h2>

//         {/* Recipe Details */}
//         <input
//           type="text"
//           name="title"
//           placeholder="Recipe Title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         />
//         <select
//           name="cuisine_id"
//           value={formData.cuisine_id}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         >
//           <option value="">Select Cuisine</option>
//           {cuisines.map((c) => (
//             <option key={c.cuisine_id} value={c.cuisine_id}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="number"
//           name="cook_time"
//           placeholder="Cook Time (minutes)"
//           value={formData.cook_time}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         />
//         <select
//           name="difficulty"
//           value={formData.difficulty}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         >
//           <option value="">Select Difficulty</option>
//           <option value="Easy">Easy</option>
//           <option value="Medium">Medium</option>
//           <option value="Hard">Hard</option>
//         </select>
//         <input
//           type="text"
//           name="image_url"
//           placeholder="Image URL (optional)"
//           value={formData.image_url}
//           onChange={handleChange}
//           className="w-full mb-6 p-3 border rounded"
//         />

//         {/* Ingredients Section */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold mb-2">Ingredients</h3>

//           {formData.ingredients.map((ing, index) => (
//             <div key={index} className="flex gap-2 mb-2">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Ingredient Name"
//                 value={ing.name}
//                 onChange={(e) => handleIngredientChange(index, e)}
//                 className="flex-1 p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="quantity"
//                 placeholder="Quantity"
//                 value={ing.quantity}
//                 onChange={(e) => handleIngredientChange(index, e)}
//                 className="flex-1 p-2 border rounded"
//                 required
//               />
//               <select
//                 name="unit_id"
//                 value={ing.unit_id}
//                 onChange={(e) => handleIngredientChange(index, e)}
//                 className="flex-1 p-2 border rounded"
//                 required
//               >
//                 <option value="">Select Unit</option>
//                 {units.map((unit) => (
//                   <option key={unit.unit_id} value={unit.unit_id}>
//                     {unit.name}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 type="button"
//                 onClick={() => removeIngredientField(index)}
//                 className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
//               >
//                 X
//               </button>
//             </div>
//           ))}

//           {/* New Ingredient Inline Add */}
//           <div className="flex gap-2 mt-2">
//             <input
//               type="text"
//               placeholder="New Ingredient Name"
//               value={newIngredient.name}
//               onChange={(e) =>
//                 setNewIngredient({ ...newIngredient, name: e.target.value })
//               }
//               className="flex-1 p-2 border rounded"
//             />
//             <input
//               type="text"
//               placeholder="Quantity"
//               value={newIngredient.quantity}
//               onChange={(e) =>
//                 setNewIngredient({ ...newIngredient, quantity: e.target.value })
//               }
//               className="flex-1 p-2 border rounded"
//             />
//             <select
//               value={newIngredient.unit_id}
//               onChange={(e) =>
//                 setNewIngredient({ ...newIngredient, unit_id: e.target.value })
//               }
//               className="flex-1 p-2 border rounded"
//             >
//               <option value="">Select Unit</option>
//               {units.map((unit) => (
//                 <option key={unit.unit_id} value={unit.unit_id}>
//                   {unit.name}
//                 </option>
//               ))}
//             </select>
//             <button
//               type="button"
//               onClick={addIngredientToList}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//               Add
//             </button>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
//         >
//           Add Recipe
//         </button>
//       </form>
//     </div>
//   );
// }













import React, { useState, useEffect } from "react";
import API, { setAuthToken } from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddRecipe() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we have a recipe passed from edit
  const existingRecipe = location.state?.recipe;

  const [formData, setFormData] = useState({
    title: existingRecipe?.title || "",
    description: existingRecipe?.description || "",
    cuisine_id: existingRecipe?.cuisine_id || "",
    cook_time: existingRecipe?.cook_time || "",
    difficulty: existingRecipe?.difficulty || "",
    image_url: existingRecipe?.image_url || "",
    ingredients: existingRecipe?.ingredients || [], // Array of { name, quantity, unit_id, ingredient_id }
  });

  const [newIngredient, setNewIngredient] = useState({ name: "", quantity: "", unit_id: "" });
  const [cuisines, setCuisines] = useState([]);
  const [units, setUnits] = useState([]);

  // Fetch cuisines and units
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cuisinesRes, unitsRes] = await Promise.all([
          API.get("/cuisines"),
          API.get("/units"),
        ]);
        setCuisines(cuisinesRes.data);
        setUnits(unitsRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, e) => {
    const updated = [...formData.ingredients];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, ingredients: updated });
  };

  const addIngredientToList = () => {
    if (!newIngredient.name || !newIngredient.quantity || !newIngredient.unit_id) {
      return alert("Please enter ingredient name, quantity, and unit");
    }

    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { ...newIngredient }],
    });
    setNewIngredient({ name: "", quantity: "", unit_id: "" });
  };

  const removeIngredientField = (index) => {
    const updated = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.ingredients.length) return alert("Add at least one ingredient");

    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);

      if (existingRecipe) {
        // Edit recipe
        await API.put(`/recipes/${existingRecipe.recipe_id}`, formData);
        alert("Recipe updated successfully!");
      } else {
        // Add new recipe
        await API.post("/recipes", formData);
        alert("Recipe added successfully!");
      }

      navigate("/");
    } catch (err) {
      console.error("Recipe error:", err);
      alert(err.response?.data?.message || "Failed to save recipe");
    }
  };

  return (
    <div className="p-6 flex justify-center items-start min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {existingRecipe ? "Edit Recipe" : "Add New Recipe"}
        </h2>

        {/* Recipe Details */}
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
        <select
          name="cuisine_id"
          value={formData.cuisine_id}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        >
          <option value="">Select Cuisine</option>
          {cuisines.map((c) => (
            <option key={c.cuisine_id} value={c.cuisine_id}>
              {c.name}
            </option>
          ))}
        </select>
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

        {/* Ingredients Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Ingredients</h3>

          {formData.ingredients.map((ing, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                name="name"
                placeholder="Ingredient Name"
                value={ing.name}
                onChange={(e) => handleIngredientChange(index, e)}
                className="flex-1 p-2 border rounded"
                required
              />
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                value={ing.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                className="flex-1 p-2 border rounded"
                required
              />
              <select
                name="unit_id"
                value={ing.unit_id}
                onChange={(e) => handleIngredientChange(index, e)}
                className="flex-1 p-2 border rounded"
                required
              >
                <option value="">Select Unit</option>
                {units.map((unit) => (
                  <option key={unit.unit_id} value={unit.unit_id}>
                    {unit.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeIngredientField(index)}
                className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
              >
                X
              </button>
            </div>
          ))}

          {/* New Ingredient Inline Add */}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="New Ingredient Name"
              value={newIngredient.name}
              onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
              className="flex-1 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Quantity"
              value={newIngredient.quantity}
              onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
              className="flex-1 p-2 border rounded"
            />
            <select
              value={newIngredient.unit_id}
              onChange={(e) => setNewIngredient({ ...newIngredient, unit_id: e.target.value })}
              className="flex-1 p-2 border rounded"
            >
              <option value="">Select Unit</option>
              {units.map((unit) => (
                <option key={unit.unit_id} value={unit.unit_id}>
                  {unit.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addIngredientToList}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
        >
          {existingRecipe ? "Update Recipe" : "Add Recipe"}
        </button>
      </form>
    </div>
  );
}
