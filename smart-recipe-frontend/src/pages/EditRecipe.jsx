// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API, { setAuthToken } from "../api/api";

// export default function EditRecipe() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     cuisine: "",
//     dietary_type: "",
//     cook_time: "",
//     difficulty: "",
//     image_url: "",
//     ingredients: [],
//   });

//   const [newIngredient, setNewIngredient] = useState({ name: "", quantity: "" });

//   // Fetch recipe + ingredients
//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const res = await API.get(`/recipes/${id}`);
//         setFormData((prev) => ({ ...prev, ...res.data }));
//       } catch (err) {
//         console.error("Fetch recipe error:", err);
//       }
//     };

//     const fetchIngredients = async () => {
//       try {
//         const res = await API.get(`/ingredients/recipe/${id}`);
//         if (res.data.length > 0) setFormData((prev) => ({ ...prev, ingredients: res.data }));
//       } catch (err) {
//         console.error("Fetch ingredients error:", err);
//       }
//     };

//     fetchRecipe();
//     fetchIngredients();
//   }, [id]);

//   // Update recipe fields
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Update existing ingredient
//   const handleIngredientChange = (index, e) => {
//     const updatedIngredients = [...formData.ingredients];
//     updatedIngredients[index][e.target.name] = e.target.value;
//     setFormData({ ...formData, ingredients: updatedIngredients });
//   };

//   // Add ingredient to list
//   const addIngredientToList = () => {
//     if (!newIngredient.name || !newIngredient.quantity) return;
//     setFormData({
//       ...formData,
//       ingredients: [...formData.ingredients, { ...newIngredient }],
//     });
//     setNewIngredient({ name: "", quantity: "" });
//   };

//   // Remove ingredient
//   const removeIngredientField = (index) => {
//     const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
//     setFormData({ ...formData, ingredients: updatedIngredients });
//   };

//   // Submit updated recipe
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       setAuthToken(token);

//       // Update recipe details
//       await API.put(`/recipes/${id}`, {
//         title: formData.title,
//         description: formData.description,
//         cuisine: formData.cuisine,
//         dietary_type: formData.dietary_type,
//         cook_time: formData.cook_time,
//         difficulty: formData.difficulty,
//         image_url: formData.image_url,
//       });

//       // Update ingredients
//       for (let ing of formData.ingredients) {
//         if (ing.ingredient_id) {
//           // Existing ingredient → update
//           await API.put(`/ingredients/${ing.ingredient_id}`, {
//             recipe_id: id,
//             name: ing.name,
//             quantity: ing.quantity,
//           });
//         } else {
//           // New ingredient → add
//           await API.post("/ingredients", { recipe_id: id, ...ing });
//         }
//       }

//       alert("Recipe updated successfully!");
//       navigate(`/recipe/${id}`);
//     } catch (err) {
//       console.error("Update recipe error:", err);
//       alert("Failed to update recipe");
//     }
//   };

//   return (
//     <div className="p-6 flex justify-center items-start min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-lg"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Edit Recipe</h2>

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
//         <input
//           type="text"
//           name="cuisine"
//           placeholder="Cuisine"
//           value={formData.cuisine}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="dietary_type"
//           placeholder="Dietary Type"
//           value={formData.dietary_type}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         />
//         <input
//           type="number"
//           name="cook_time"
//           placeholder="Cook Time"
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
//               name="name"
//               placeholder="New Ingredient Name"
//               value={newIngredient.name}
//               onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
//               className="flex-1 p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="quantity"
//               placeholder="Quantity"
//               value={newIngredient.quantity}
//               onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
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
//           Update Recipe
//         </button>
//       </form>
//     </div>
//   );
// }
















// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API, { setAuthToken } from "../api/api";

// export default function EditRecipe() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     cuisine: "",
//     dietary_type: "",
//     cook_time: "",
//     difficulty: "",
//     image_url: "",
//     ingredients: [],
//       ingredients: [], // <-- we store ingredients here

//   });

//   const [newIngredient, setNewIngredient] = useState({ name: "", quantity: "" });

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const res = await API.get(`/recipes/${id}`);
//         setFormData((prev) => ({ ...prev, ...res.data }));
//       } catch (err) {
//         console.error("Fetch recipe error:", err);
//       }
//     };

//     const fetchIngredients = async () => {
//       try {
//         const res = await API.get(`/ingredients/recipe/${id}`);
//         setFormData((prev) => ({ ...prev, ingredients: res.data }));
//       } catch (err) {
//         console.error("Fetch ingredients error:", err);
//       }
//     };

//     fetchRecipe();
//     fetchIngredients();
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleIngredientChange = (index, e) => {
//     const updatedIngredients = [...formData.ingredients];
//     updatedIngredients[index][e.target.name] = e.target.value;
//     setFormData({ ...formData, ingredients: updatedIngredients });
//   };

//   const addIngredientToList = () => {
//     if (!newIngredient.name || !newIngredient.quantity) return;
//     setFormData({
//       ...formData,
//       ingredients: [
//         ...formData.ingredients,
//         { name: newIngredient.name, quantity: newIngredient.quantity },
//       ],
//     });
//     setNewIngredient({ name: "", quantity: "" });
//   };

//   const removeIngredientField = (index) => {
//     const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
//     setFormData({ ...formData, ingredients: updatedIngredients });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const token = localStorage.getItem("token");
//     setAuthToken(token);

//     await API.put(`/recipes/${id}`, {
//       title: formData.title,
//       description: formData.description,
//       cuisine: formData.cuisine,
//       dietary_type: formData.dietary_type,
//       cook_time: formData.cook_time,
//       difficulty: formData.difficulty,
//       image_url: formData.image_url,
//         ingredients: formData.ingredients, // <-- we store ingredients here

//     });

//     for (let ing of formData.ingredients) {
//       let ingredient_id = ing.ingredient_id;

//       // If it's a new ingredient
//       if (!ingredient_id) {
//         try {
//           const res = await API.post("/ingredients/create", { name: ing.name });
//           ingredient_id = res.data.ingredient_id;
//         } catch (err) {
//           // If ingredient already exists, fetch it
//           if (err.response?.error?.code === "ER_DUP_ENTRY") {
//             const allIngredients = await API.get("/ingredients");
//             const existing = allIngredients.data.find(i => i.name === ing.name);
//             ingredient_id = existing.ingredient_id;
//           } else {
//             throw err;
//           }
//         }
//       }

//       // Now link to recipe
//       await API.post("/ingredients/add-to-recipe", {
//         recipe_id: id,
//         ingredient_id,
//         quantity: ing.quantity,
//       });
//     }

//     alert("Recipe updated successfully!");
//     navigate(`/recipe/${id}`);
//   } catch (err) {
//     console.error("Update recipe error:", err);
//     alert("Failed to update recipe");
//   }
// };


//   return (
//     <div className="p-6 flex justify-center items-start min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-lg"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Edit Recipe</h2>

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

//         <input
//           type="text"
//           name="cuisine"
//           placeholder="Cuisine"
//           value={formData.cuisine}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         />

//         <input
//           type="text"
//           name="dietary_type"
//           placeholder="Dietary Type"
//           value={formData.dietary_type}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         />

//         <input
//           type="number"
//           name="cook_time"
//           placeholder="Cook Time"
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
//               name="name"
//               placeholder="New Ingredient Name"
//               value={newIngredient.name}
//               onChange={(e) =>
//                 setNewIngredient({ ...newIngredient, name: e.target.value })
//               }
//               className="flex-1 p-2 border rounded"
//             />

//             <input
//               type="text"
//               name="quantity"
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
//           Update Recipe
//         </button>
//       </form>
//     </div>
//   );
// }







// //new code with json ingredients

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API, { setAuthToken } from "../api/api";

// export default function EditRecipe() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     cuisine: "",
//     dietary_type: "",
//     cook_time: "",
//     difficulty: "",
//     image_url: "",
//     ingredients: [], // <-- ingredients stored directly
//   });

//   const [newIngredient, setNewIngredient] = useState({ name: "", quantity: "" });

//   // Fetch recipe on mount
//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const res = await API.get(`/recipes/${id}`);
//         // Ensure ingredients is an array
//         setFormData({
//           ...res.data,
//           ingredients: res.data.ingredients || [],
//         });
//       } catch (err) {
//         console.error("Fetch recipe error:", err);
//         alert("Failed to fetch recipe");
//       }
//     };
//     fetchRecipe();
//   }, [id]);

//   // Handle recipe input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle ingredient edits
//   const handleIngredientChange = (index, e) => {
//     const updated = [...formData.ingredients];
//     updated[index][e.target.name] = e.target.value;
//     setFormData({ ...formData, ingredients: updated });
//   };

//   // Add new ingredient to list
//   const addIngredientToList = () => {
//     if (!newIngredient.name || !newIngredient.quantity) return;
//     setFormData({
//       ...formData,
//       ingredients: [...formData.ingredients, { ...newIngredient }],
//     });
//     setNewIngredient({ name: "", quantity: "" });
//   };

//   // Remove ingredient
//   const removeIngredientField = (index) => {
//     const updated = formData.ingredients.filter((_, i) => i !== index);
//     setFormData({ ...formData, ingredients: updated });
//   };

//   // Submit recipe update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       setAuthToken(token);

//       await API.put(`/recipes/${id}`, {
//         ...formData, // includes ingredients array
//       });

//       alert("Recipe updated successfully!");
//       navigate(`/recipe/${id}`);
//     } catch (err) {
//       console.error("Update recipe error:", err);
//       alert("Failed to update recipe");
//     }
//   };

//   return (
//     <div className="p-6 flex justify-center items-start min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-lg"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Edit Recipe</h2>

//         {/* Recipe Fields */}
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
//         <input
//           type="text"
//           name="cuisine"
//           placeholder="Cuisine"
//           value={formData.cuisine}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="dietary_type"
//           placeholder="Dietary Type"
//           value={formData.dietary_type}
//           onChange={handleChange}
//           className="w-full mb-4 p-3 border rounded"
//           required
//         />
//         <input
//           type="number"
//           name="cook_time"
//           placeholder="Cook Time"
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
//           Update Recipe
//         </button>
//       </form>
//     </div>
//   );
// }







// //new schema


// import React, { useState, useEffect } from "react";
// import API, { setAuthToken } from "../api/api";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function AddRecipe() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const existingRecipe = location.state?.recipe; // Recipe passed from Edit button

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     cuisine_id: "",
//     cook_time: "",
//     difficulty: "",
//     image_url: "",
//     ingredients: [], // Array of { ingredient_id, name, quantity, unit_id }
//   });

//   const [newIngredient, setNewIngredient] = useState({
//     name: "",
//     quantity: "",
//     unit_id: "",
//   });

//   const [cuisines, setCuisines] = useState([]);
//   const [units, setUnits] = useState([]);

//   // Pre-fill form if editing
//   useEffect(() => {
//     if (existingRecipe) {
//       setFormData({
//         ...existingRecipe,
//         cuisine_id: existingRecipe.cuisine_id || "",
//         ingredients: existingRecipe.ingredients.map((ing) => ({
//           ingredient_id: ing.ingredient_id,
//           name: ing.ingredient_name,
//           quantity: ing.quantity,
//           unit_id: ing.unit_id,
//         })),
//       });
//     }
//   }, [existingRecipe]);

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

//       if (existingRecipe) {
//         // Update existing recipe
//         await API.put(`/recipes/${existingRecipe.recipe_id}`, formData);
//         alert("Recipe updated successfully!");
//         navigate(`/recipe/${existingRecipe.recipe_id}`);
//       } else {
//         // Add new recipe
//         const res = await API.post("/recipes", formData);
//         alert("Recipe added successfully!");
//         navigate(`/recipe/${res.data.recipe_id}`);
//       }
//     } catch (err) {
//       console.error("Recipe error:", err);
//       alert(err.response?.data?.message || "Failed to save recipe");
//     }
//   };

//   return (
//     <div className="p-6 flex justify-center items-start min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           {existingRecipe ? "Edit Recipe" : "Add New Recipe"}
//         </h2>

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
//                 value={ing.name}
//                 readOnly
//                 className="flex-1 p-2 border rounded bg-gray-100"
//               />
//               <input
//                 type="text"
//                 name="quantity"
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
//               placeholder="Ingredient Name"
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
//           {existingRecipe ? "Update Recipe" : "Add Recipe"}
//         </button>
//       </form>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API, { setAuthToken } from "../api/api";

// export default function EditRecipe() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     cuisine_id: "",
//     cook_time: "",
//     difficulty: "",
//     image_url: "",
//     ingredients: [], // { ingredient_id, quantity, unit_id }
//   });

//   const [newIngredient, setNewIngredient] = useState({
//     ingredient_id: "",
//     quantity: "",
//     unit_id: "",
//   });

//   const [cuisines, setCuisines] = useState([]);
//   const [allIngredients, setAllIngredients] = useState([]);
//   const [allUnits, setAllUnits] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [recipeRes, cuisinesRes, ingredientsRes, unitsRes] = await Promise.all([
//           API.get(`/recipes/${id}`),
//           API.get("/cuisines"),
//           API.get("/ingredients"),
//           API.get("/units"),
//         ]);

//         setFormData({
//           ...recipeRes.data,
//           cuisine_id: recipeRes.data.cuisine_id || "",
//           ingredients: recipeRes.data.ingredients.map((ing) => ({
//             ingredient_id: ing.ingredient_id,
//             quantity: ing.quantity,
//             unit_id: ing.unit_id || 1, // Default unit_id if not provided
//           })),
//         });

//         setCuisines(cuisinesRes.data);
//         setAllIngredients(ingredientsRes.data);
//         setAllUnits(unitsRes.data);
//       } catch (err) {
//         console.error("Fetch data error:", err);
//         alert("Failed to fetch recipe or supporting data");
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleIngredientChange = (index, e) => {
//     const updated = [...formData.ingredients];
//     updated[index][e.target.name] = e.target.value;
//     setFormData({ ...formData, ingredients: updated });
//   };

//   const addIngredientToList = () => {
//     if (!newIngredient.ingredient_id || !newIngredient.quantity || !newIngredient.unit_id) {
//       return alert("Please select ingredient, quantity, and unit");
//     }

//     setFormData({
//       ...formData,
//       ingredients: [...formData.ingredients, { ...newIngredient }],
//     });

//     setNewIngredient({ ingredient_id: "", quantity: "", unit_id: "" });
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

//       await API.put(`/recipes/${id}`, formData);

//       alert("Recipe updated successfully!");
//       navigate(`/recipe/${id}`);
//     } catch (err) {
//       console.error("Update recipe error:", err);
//       alert(err.response?.data?.message || "Failed to update recipe");
//     }
//   };

//   return (
//     <div className="p-6 flex justify-center items-start min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Edit Recipe</h2>

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

//         <h3 className="text-xl font-semibold mb-2">Ingredients</h3>

//         {formData.ingredients.map((ing, index) => (
//           <div key={index} className="flex gap-2 mb-2">
//             <select
//               name="ingredient_id"
//               value={ing.ingredient_id}
//               onChange={(e) => handleIngredientChange(index, e)}
//               className="flex-1 p-2 border rounded"
//               required
//             >
//               <option value="">Select Ingredient</option>
//               {allIngredients.map((ingOpt) => (
//                 <option key={ingOpt.ingredient_id} value={ingOpt.ingredient_id}>
//                   {ingOpt.name}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="number"
//               name="quantity"
//               placeholder="Quantity"
//               value={ing.quantity}
//               onChange={(e) => handleIngredientChange(index, e)}
//               className="flex-1 p-2 border rounded"
//               required
//             />

//             <select
//               name="unit_id"
//               value={ing.unit_id}
//               onChange={(e) => handleIngredientChange(index, e)}
//               className="flex-1 p-2 border rounded"
//               required
//             >
//               <option value="">Select Unit</option>
//               {allUnits.map((unit) => (
//                 <option key={unit.unit_id} value={unit.unit_id}>
//                   {unit.name}
//                 </option>
//               ))}
//             </select>

//             <button
//               type="button"
//               onClick={() => removeIngredientField(index)}
//               className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
//             >
//               X
//             </button>
//           </div>
//         ))}

//         <div className="flex gap-2 mt-2">
//           <select
//             value={newIngredient.ingredient_id}
//             onChange={(e) =>
//               setNewIngredient({ ...newIngredient, ingredient_id: e.target.value })
//             }
//             className="flex-1 p-2 border rounded"
//           >
//             <option value="">Select Ingredient</option>
//             {allIngredients.map((ingOpt) => (
//               <option key={ingOpt.ingredient_id} value={ingOpt.ingredient_id}>
//                 {ingOpt.name}
//               </option>
//             ))}
//           </select>

//           <input
//             type="number"
//             placeholder="Quantity"
//             value={newIngredient.quantity}
//             onChange={(e) =>
//               setNewIngredient({ ...newIngredient, quantity: e.target.value })
//             }
//             className="flex-1 p-2 border rounded"
//           />

//           <select
//             value={newIngredient.unit_id}
//             onChange={(e) =>
//               setNewIngredient({ ...newIngredient, unit_id: e.target.value })
//             }
//             className="flex-1 p-2 border rounded"
//           >
//             <option value="">Select Unit</option>
//             {allUnits.map((unit) => (
//               <option key={unit.unit_id} value={unit.unit_id}>
//                 {unit.name}
//               </option>
//             ))}
//           </select>

//           <button
//             type="button"
//             onClick={addIngredientToList}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Add
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
//         >
//           Update Recipe
//         </button>
//       </form>
//     </div>
//   );
// }








//new verison working properly


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../api/api";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cuisine_id: "",
    cook_time: "",
    difficulty: "",
    image_url: "",
    ingredients: [], // { ingredient_id, ingredient_name, quantity, unit_id }
  });

  const [newIngredient, setNewIngredient] = useState({
    ingredient_name: "",
    quantity: "",
    unit_id: "",
  });

  const [cuisines, setCuisines] = useState([]);
  const [allUnits, setAllUnits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipeRes, cuisinesRes, unitsRes] = await Promise.all([
          API.get(`/recipes/${id}`),
          API.get("/cuisines"),
          API.get("/units"),
        ]);

        // Map ingredients to include ingredient_name and unit_id
        const ingredients = recipeRes.data.ingredients.map((ing) => ({
          ingredient_id: ing.ingredient_id,
          ingredient_name: ing.ingredient_name , // autofill existing name
          quantity: ing.quantity,
          unit_id: ing.ingredient_unit_id , // autofill existing unit
        }));

        setFormData({
          ...recipeRes.data,
          cuisine_id: recipeRes.data.cuisine_id || "",
          ingredients: ingredients,
        });

        setCuisines(cuisinesRes.data);
        setAllUnits(unitsRes.data);
      } catch (err) {
        console.error("Fetch data error:", err);
        alert("Failed to fetch recipe or supporting data");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, e) => {
    const updated = [...formData.ingredients];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, ingredients: updated });
  };

  const addIngredientToList = () => {
    if (!newIngredient.ingredient_name || !newIngredient.quantity || !newIngredient.unit_id) {
      return alert("Please enter ingredient name, quantity, and unit");
    }

    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { ...newIngredient, ingredient_id: null }],
    });

    setNewIngredient({ ingredient_name: "", quantity: "", unit_id: "" });
  };

  const removeIngredientField = (index) => {
    const updated = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: updated });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    setAuthToken(token);

    // 1️⃣ Separate new ingredients (typed manually) from existing
    const newIngredients = formData.ingredients.filter((ing) => !ing.ingredient_id);
    const existingIngredients = formData.ingredients.filter((ing) => ing.ingredient_id);

    // 2️⃣ Create new ingredients in backend
    const createdIngredients = [];
    for (const ing of newIngredients) {
      // Make API call to create ingredient
      const res = await API.post("/ingredients", { name: ing.ingredient_name });
      createdIngredients.push({
        ...ing,
        ingredient_id: res.data.ingredient_id, // assign real id
      });
    }

    // 3️⃣ Combine existing + newly created ingredients
    const allIngredients = [...existingIngredients, ...createdIngredients];

    // 4️⃣ Prepare payload for recipe update
    const payload = {
      ...formData,
      ingredients: allIngredients.map((ing) => ({
        ingredient_id: ing.ingredient_id,
        quantity: ing.quantity,
        unit_id: ing.unit_id,
      })),
    };

    // 5️⃣ Update recipe
    await API.put(`/recipes/${id}`, payload);

    alert("Recipe updated successfully!");
    navigate(`/recipe/${id}`);
  } catch (err) {
    console.error("Update recipe error:", err);
    alert(err.response?.data?.message || "Failed to update recipe");
  }
};


  return (
    <div className="p-6 flex justify-center items-start min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Recipe</h2>

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

        <h3 className="text-xl font-semibold mb-2">Ingredients</h3>

        {formData.ingredients.map((ing, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              name="ingredient_name"
              value={ing.ingredient_name}
              onChange={(e) => handleIngredientChange(index, e)}
              placeholder="Ingredient Name"
              className="flex-1 p-2 border rounded"
              required
            />

            <input
              type="number"
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
              {allUnits.map((unit) => (
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

        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Ingredient Name"
            value={newIngredient.ingredient_name}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, ingredient_name: e.target.value })
            }
            className="flex-1 p-2 border rounded"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={newIngredient.quantity}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, quantity: e.target.value })
            }
            className="flex-1 p-2 border rounded"
          />

          <select
            value={newIngredient.unit_id}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, unit_id: e.target.value })
            }
            className="flex-1 p-2 border rounded"
          >
            <option value="">Select Unit</option>
            {allUnits.map((unit) => (
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 mt-4"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
}








// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API, { setAuthToken } from "../api/api";

// export default function EditRecipe() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     cuisine_id: "",
//     cook_time: "",
//     difficulty: "",
//     image_url: "",
//     ingredients: [], // { ingredient_id, ingredient_name, quantity, unit_id }
//   });

//   const [newIngredient, setNewIngredient] = useState({
//     ingredient_name: "",
//     quantity: "",
//     unit_id: "",
//   });

//   const [cuisines, setCuisines] = useState([]);
//   const [allIngredients, setAllIngredients] = useState([]);
//   const [allUnits, setAllUnits] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [recipeRes, cuisinesRes, ingredientsRes, unitsRes] = await Promise.all([
//           API.get(`/recipes/${id}`),
//           API.get("/cuisines"),
//           API.get("/ingredients"),
//           API.get("/units"),
//         ]);

//         // Prefill existing ingredients
//         setFormData({
//           ...recipeRes.data,
//           cuisine_id: recipeRes.data.cuisine_id || "",
//           ingredients: recipeRes.data.ingredients.map((ing) => ({
//             ingredient_id: ing.ingredient_id,
//             ingredient_name: ing.name, // store name for display
//             quantity: ing.quantity,
//             unit_id: ing.unit_id || 1,
//           })),
//         });

//         setCuisines(cuisinesRes.data);
//         setAllIngredients(ingredientsRes.data);
//         setAllUnits(unitsRes.data);
//       } catch (err) {
//         console.error("Fetch data error:", err);
//         alert("Failed to fetch recipe or supporting data");
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleIngredientChange = (index, e) => {
//     const updated = [...formData.ingredients];
//     const { name, value } = e.target;
//     updated[index][name] = value;
//     setFormData({ ...formData, ingredients: updated });
//   };

//   const addIngredientToList = () => {
//     if (!newIngredient.ingredient_name || !newIngredient.quantity || !newIngredient.unit_id) {
//       return alert("Please enter ingredient name, quantity, and unit");
//     }

//     setFormData({
//       ...formData,
//       ingredients: [...formData.ingredients, { ...newIngredient }],
//     });

//     setNewIngredient({ ingredient_name: "", quantity: "", unit_id: "" });
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

//       // Separate new ingredients (typed manually) vs existing
//       const newIngredients = formData.ingredients.filter((ing) => !ing.ingredient_id);
//       const existingIngredients = formData.ingredients.filter((ing) => ing.ingredient_id);

//       // Create new ingredients in backend
//       const createdIngredients = [];
//       for (const ing of newIngredients) {
//         const res = await API.post("/ingredients", { name: ing.ingredient_name });
//         createdIngredients.push({
//           ...ing,
//           ingredient_id: res.data.ingredient_id,
//         });
//       }

//       const allIngredientsForUpdate = [...existingIngredients, ...createdIngredients];

//       const payload = {
//         ...formData,
//         ingredients: allIngredientsForUpdate.map((ing) => ({
//           ingredient_id: ing.ingredient_id,
//           quantity: ing.quantity,
//           unit_id: ing.unit_id,
//         })),
//       };

//       await API.put(`/recipes/${id}`, payload);

//       alert("Recipe updated successfully!");
//       navigate(`/recipe/${id}`);
//     } catch (err) {
//       console.error("Update recipe error:", err);
//       alert(err.response?.data?.message || "Failed to update recipe");
//     }
//   };

//   return (
//     <div className="p-6 flex justify-center items-start min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Edit Recipe</h2>

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

//         <h3 className="text-xl font-semibold mb-2">Ingredients</h3>

//         {formData.ingredients.map((ing, index) => (
//   <div key={index} className="flex gap-2 mb-2">
//     <select
//       name="ingredient_id"
//       value={ing.ingredient_id}
//       onChange={(e) => handleIngredientChange(index, e)}
//       className="flex-1 p-2 border rounded"
//       required
//     >
//       <option value="">Select Ingredient</option>
//       {allIngredients.map((ingOpt) => (
//         <option key={ingOpt.ingredient_id} value={ingOpt.ingredient_id}>
//           {ingOpt.name}
//         </option>
//       ))}
//     </select>
//     <input
//       type="number"
//       name="quantity"
//       placeholder="Quantity"
//       value={ing.quantity}
//       onChange={(e) => handleIngredientChange(index, e)}
//       className="flex-1 p-2 border rounded"
//       required
//     />
//     <select
//       name="unit_id"
//       value={ing.unit_id}
//       onChange={(e) => handleIngredientChange(index, e)}
//       className="flex-1 p-2 border rounded"
//       required
//     >
//       <option value="">Select Unit</option>
//       {allUnits.map((unit) => (
//         <option key={unit.unit_id} value={unit.unit_id}>
//           {unit.name}
//         </option>
//       ))}
//     </select>
//     <button
//       type="button"
//       onClick={() => removeIngredientField(index)}
//       className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
//     >
//       X
//     </button>
//   </div>
// ))}


//         <div className="flex gap-2 mt-2">
//   <input
//     type="text"
//     placeholder="New Ingredient Name"
//     value={newIngredient.ingredient_name}
//     onChange={(e) =>
//       setNewIngredient({ ...newIngredient, ingredient_name: e.target.value })
//     }
//     className="flex-1 p-2 border rounded"
//   />
//   <input
//     type="number"
//     placeholder="Quantity"
//     value={newIngredient.quantity}
//     onChange={(e) =>
//       setNewIngredient({ ...newIngredient, quantity: e.target.value })
//     }
//     className="flex-1 p-2 border rounded"
//   />
//   <select
//     value={newIngredient.unit_id}
//     onChange={(e) =>
//       setNewIngredient({ ...newIngredient, unit_id: e.target.value })
//     }
//     className="flex-1 p-2 border rounded"
//   >
//     <option value="">Select Unit</option>
//     {allUnits.map((unit) => (
//       <option key={unit.unit_id} value={unit.unit_id}>
//         {unit.name}
//       </option>
//     ))}
//   </select>
//   <button
//     type="button"
//     onClick={addIngredientToList}
//     className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//   >
//     Add
//   </button>
// </div>


//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 mt-4"
//         >
//           Update Recipe
//         </button>
//       </form>
//     </div>
//   );
// }










