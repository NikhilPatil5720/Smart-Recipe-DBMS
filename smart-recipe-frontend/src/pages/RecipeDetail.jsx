// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API, { setAuthToken } from "../api/api";

// export default function RecipeDetail() {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const res = await API.get(`/recipes/${id}`); // Backend route for single recipe
//         setRecipe(res.data);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to fetch recipe");
//       }
//     };
//     fetchRecipe();
//   }, [id]);

//   const handleFavorite = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You must be logged in to add favorites");
//       return;
//     }

//     setAuthToken(token); // sets Authorization header globally

//     await API.post(`/favorites/${id}`); // id = recipe_id
//     alert("Added to favorites!");
//   } catch (err) {
//     console.error(err);
//     alert(err.response?.data?.message || "Failed to add favorite");
//   }
// };


//   if (!recipe) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
//       <div className="bg-white p-6 rounded shadow-md">
//         <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
//         <img
//           src={recipe.image_url || "https://via.placeholder.com/600x400"}
//           alt={recipe.title}
//           className="w-full h-80 object-cover rounded mb-4"
//         />
//         <p className="mb-2"><strong>Cuisine:</strong> {recipe.cuisine}</p>
//         <p className="mb-2"><strong>Diet:</strong> {recipe.dietary_type}</p>
//         <p className="mb-2"><strong>Cook Time:</strong> {recipe.cook_time} mins</p>
//         <p className="mb-4"><strong>Difficulty:</strong> {recipe.difficulty}</p>
//         <p className="mb-4">{recipe.description}</p>
//         <button
//           onClick={handleFavorite}
//           className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//         >
//           Add to Favorites
//         </button>

//         <h2 className="text-2xl font-bold mt-6 mb-2">Ingredients</h2>
//         <ul className="list-disc list-inside mb-4">
//           {recipe.ingredients?.map((ing) => (
//             <li key={ing.ingredient_id}>
//               {ing.name} - {ing.quantity}
//             </li>
//           ))}
//         </ul>

//         <h2 className="text-2xl font-bold mt-4 mb-2">Steps</h2>
//         <ol className="list-decimal list-inside">
//           {recipe.steps?.map((step) => (
//             <li key={step.step_id}>{step.instruction}</li>
//           ))}
//         </ol>
//       </div>
//     </div>
//   );
// }














// // edit and delete buttons and functionality aded

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API, { setAuthToken } from "../api/api";

// export default function RecipeDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [recipe, setRecipe] = useState(null);

//   // Fetch recipe details including ingredients and steps
//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const res = await API.get(`/recipes/${id}`);
//         setRecipe(res.data);
//       } catch (err) {
//         console.error("Fetch recipe error:", err);
//         alert("Failed to fetch recipe");
//       }
//     };
//     fetchRecipe();
//   }, [id]);

//   // Handle adding to favorites
//   const handleFavorite = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to add favorites");
//         return;
//       }
//       setAuthToken(token);
//       await API.post(`/favorites`, { recipe_id: id });
//       alert("Added to favorites!");
//     } catch (err) {
//       console.error("Add favorite error:", err);
//       alert(err.response?.data?.message || "Failed to add favorite");
//     }
//   };

//   // Handle delete recipe
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this recipe?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       setAuthToken(token);
//       await API.delete(`/recipes/${id}`);
//       alert("Recipe deleted successfully!");
//       navigate("/");
//     } catch (err) {
//       console.error("Delete recipe error:", err);
//       alert("Failed to delete recipe");
//     }
//   };

//   // Navigate to edit recipe page
//   const handleEdit = () => {
//     navigate(`/edit-recipe/${id}`);
//   };

//   if (!recipe) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
//       <div className="bg-white p-6 rounded shadow-md">
//         {/* Recipe Info */}
//         <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
//         <img
//           src={recipe.image_url || "https://via.placeholder.com/600x400"}
//           alt={recipe.title}
//           className="w-full h-80 object-cover rounded mb-4"
//         />
//         <p className="mb-2"><strong>Cuisine:</strong> {recipe.cuisine}</p>
//         <p className="mb-2"><strong>Diet:</strong> {recipe.dietary_type}</p>
//         <p className="mb-2"><strong>Cook Time:</strong> {recipe.cook_time} mins</p>
//         <p className="mb-2"><strong>Difficulty:</strong> {recipe.difficulty}</p>
//         <p className="mb-4">{recipe.description}</p>

//         {/* Buttons */}
//         <div className="flex gap-4 mb-6">
//           <button
//             onClick={handleFavorite}
//             className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//           >
//             Add to Favorites
//           </button>
//           <button
//             onClick={handleEdit}
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//           >
//             Edit Recipe
//           </button>
//           <button
//             onClick={handleDelete}
//             className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
//           >
//             Delete Recipe
//           </button>
//         </div>

//         {/* Ingredients */}
//         <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
//         {recipe.ingredients && recipe.ingredients.length > 0 ? (
//           <ul className="list-disc list-inside mb-4">
//             {recipe.ingredients.map((ing) => (
//               <li key={ing.ingredient_id}>
//                 {ing.name} - {ing.quantity}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No ingredients added yet.</p>
//         )}

//         {/* Steps */}
//         <h2 className="text-2xl font-bold mt-4 mb-2">Steps</h2>
//         {recipe.steps && recipe.steps.length > 0 ? (
//           <ol className="list-decimal list-inside mb-4">
//             {recipe.steps.map((step) => (
//               <li key={step.step_id}>{step.instruction}</li>
//             ))}
//           </ol>
//         ) : (
//           <p>No steps added yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }











// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API, { setAuthToken } from "../api/api";

// export default function RecipeDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [recipe, setRecipe] = useState(null);
//   const [ingredients, setIngredients] = useState([]);
//   const [steps, setSteps] = useState([]);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const res = await API.get(`/recipes/${id}`);
//         setRecipe(res.data);
//         setSteps(res.data.steps || []);
//       } catch (err) {
//         console.error("Fetch recipe error:", err);
//         alert("Failed to fetch recipe");
//       }
//     };

//     const fetchIngredients = async () => {
//       try {
//         const res = await API.get(`/ingredients/recipe/${id}`);
//         setIngredients(res.data);
//       } catch (err) {
//         console.error("Fetch ingredients error:", err);
//       }
//     };

//     fetchRecipe();
//     fetchIngredients();
//   }, [id]);

//   const handleFavorite = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to add favorites");
//         return;
//       }
//       setAuthToken(token);
//       await API.post(`/favorites`, { recipe_id: id });
//       alert("Added to favorites!");
//     } catch (err) {
//       console.error("Add favorite error:", err);
//       alert(err.response?.data?.message || "Failed to add favorite");
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this recipe?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       setAuthToken(token);
//       await API.delete(`/recipes/${id}`);
//       alert("Recipe deleted successfully!");
//       navigate("/");
//     } catch (err) {
//       console.error("Delete recipe error:", err);
//       alert("Failed to delete recipe");
//     }
//   };

//   const handleEdit = () => {
//     navigate(`/edit-recipe/${id}`);
//   };

//   if (!recipe) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
//       <div className="bg-white p-6 rounded shadow-md">
//         <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
//         <img
//           src={recipe.image_url || "https://via.placeholder.com/600x400"}
//           alt={recipe.title}
//           className="w-full h-80 object-cover rounded mb-4"
//         />
//         <p className="mb-2"><strong>Cuisine:</strong> {recipe.cuisine}</p>
//         <p className="mb-2"><strong>Diet:</strong> {recipe.dietary_type}</p>
//         <p className="mb-2"><strong>Cook Time:</strong> {recipe.cook_time} mins</p>
//         <p className="mb-2"><strong>Difficulty:</strong> {recipe.difficulty}</p>
//         <p className="mb-4">{recipe.description}</p>

//         <div className="flex gap-4 mb-6">
//           <button onClick={handleFavorite} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
//             Add to Favorites
//           </button>
//           <button onClick={handleEdit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//             Edit Recipe
//           </button>
//           <button onClick={handleDelete} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
//             Delete Recipe
//           </button>
//         </div>

//         <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
//         {ingredients.length > 0 ? (
//           <ul className="list-disc list-inside mb-4">
//             {ingredients.map((ing) => (
//               <li key={ing.ingredient_id}>
//                 {ing.name} - {ing.quantity}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No ingredients added yet.</p>
//         )}

//         <h2 className="text-2xl font-bold mt-4 mb-2">Steps</h2>
//         {steps.length > 0 ? (
//           <ol className="list-decimal list-inside mb-4">
//             {steps.map((step) => (
//               <li key={step.step_id}>{step.instruction}</li>
//             ))}
//           </ol>
//         ) : (
//           <p>No steps added yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }







// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API, { setAuthToken } from "../api/api";

// export default function RecipeDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [recipe, setRecipe] = useState(null);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const res = await API.get(`/recipes/${id}`);
//         setRecipe(res.data);
//       } catch (err) {
//         console.error("Fetch recipe error:", err);
//         alert("Failed to fetch recipe");
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   const handleFavorite = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to add favorites");
//         return;
//       }
//       setAuthToken(token);
//       await API.post(`/favorites`, { recipe_id: id });
//       alert("Added to favorites!");
//     } catch (err) {
//       console.error("Add favorite error:", err);
//       alert(err.response?.data?.message || "Failed to add favorite");
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this recipe?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       setAuthToken(token);
//       await API.delete(`/recipes/${id}`);
//       alert("Recipe deleted successfully!");
//       navigate("/");
//     } catch (err) {
//       console.error("Delete recipe error:", err);
//       alert("Failed to delete recipe");
//     }
//   };

//   const handleEdit = () => {
//     navigate(`/edit-recipe/${id}`);
//   };

//   if (!recipe) return <div className="p-6">Loading...</div>;

//   // Ingredients are now stored as JSON directly in recipe.ingredients
//   const ingredients = recipe.ingredients || [];

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
//       <div className="bg-white p-6 rounded shadow-md">
//         <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
//         <img
//           src={recipe.image_url || "https://via.placeholder.com/600x400"}
//           alt={recipe.title}
//           className="w-full h-80 object-cover rounded mb-4"
//         />
//         <p className="mb-2"><strong>Cuisine:</strong> {recipe.cuisine}</p>
//         <p className="mb-2"><strong>Diet:</strong> {recipe.dietary_type}</p>
//         <p className="mb-2"><strong>Cook Time:</strong> {recipe.cook_time} mins</p>
//         <p className="mb-2"><strong>Difficulty:</strong> {recipe.difficulty}</p>
//         <p className="mb-4">{recipe.description}</p>

//         <div className="flex gap-4 mb-6">
//           <button onClick={handleFavorite} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
//             Add to Favorites
//           </button>
//           <button onClick={handleEdit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//             Edit Recipe
//           </button>
//           <button onClick={handleDelete} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
//             Delete Recipe
//           </button>
//         </div>

//         <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
//         {ingredients.length > 0 ? (
//           <ul className="list-disc list-inside mb-4">
//             {ingredients.map((ing, index) => (
//               <li key={index}>
//                 {ing.quantity} - {ing.name}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No ingredients added yet.</p>
//         )}

//         <h2 className="text-2xl font-bold mt-4 mb-2">Steps</h2>
//         {recipe.steps && recipe.steps.length > 0 ? (
//           <ol className="list-decimal list-inside mb-4">
//             {recipe.steps.map((step, index) => (
//               <li key={index}>{step.instruction}</li>
//             ))}
//           </ol>
//         ) : (
//           <p>No steps added yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }






//new schema

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API, { setAuthToken } from "../api/api";

// export default function RecipeDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [recipe, setRecipe] = useState(null);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const res = await API.get(`/recipes/${id}`);
//         setRecipe(res.data);
//       } catch (err) {
//         console.error("Fetch recipe error:", err);
//         alert("Failed to fetch recipe");
//       }
//     };
//     fetchRecipe();
//   }, [id]);

//   const handleFavorite = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to add favorites");
//         return;
//       }
//       setAuthToken(token);
//       await API.post(`/favorites/${id}`); // backend expects recipe_id in URL
//       alert("Added to favorites!");
//     } catch (err) {
//       console.error("Add favorite error:", err);
//       alert(err.response?.data?.message || "Failed to add favorite");
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this recipe?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       setAuthToken(token);
//       await API.delete(`/recipes/${id}`);
//       alert("Recipe deleted successfully!");
//       navigate("/");
//     } catch (err) {
//       console.error("Delete recipe error:", err);
//       alert("Failed to delete recipe");
//     }
//   };

//   const handleEdit = () => {
//     navigate(`/edit-recipe/${id}`);
//   };

//   if (!recipe) return <div className="p-6">Loading...</div>;

//   const ingredients = recipe.ingredients || [];

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
//       <div className="bg-white p-6 rounded shadow-md">
//         <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
//         <img
//           src={recipe.image_url || "https://via.placeholder.com/600x400"}
//           alt={recipe.title}
//           className="w-full h-80 object-cover rounded mb-4"
//         />
//         <p className="mb-2"><strong>Cuisine:</strong> {recipe.cuisine_name || "N/A"}</p>
//         {recipe.tags && recipe.tags.length > 0 && (
//           <p className="mb-2">
//             <strong>Diet:</strong> {recipe.tags.map(t => t.name).join(", ")}
//           </p>
//         )}
//         <p className="mb-2"><strong>Cook Time:</strong> {recipe.cook_time || 0} mins</p>
//         <p className="mb-2"><strong>Difficulty:</strong> {recipe.difficulty || "N/A"}</p>
//         <p className="mb-4">{recipe.description}</p>

//         <div className="flex gap-4 mb-6">
//           <button onClick={handleFavorite} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
//             Add to Favorites
//           </button>
//           <button onClick={handleEdit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//             Edit Recipe
//           </button>
//           <button onClick={handleDelete} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
//             Delete Recipe
//           </button>
//         </div>

//         <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
//         {ingredients.length > 0 ? (
//           <ul className="list-disc list-inside mb-4">
//             {ingredients.map((ing, index) => (
//               <li key={index}>
//                 {ing.quantity} {ing.unit_name || ""} - {ing.ingredient_name}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No ingredients added yet.</p>
//         )}

//         <h2 className="text-2xl font-bold mt-4 mb-2">Steps</h2>
//         {recipe.steps && recipe.steps.length > 0 ? (
//           <ol className="list-decimal list-inside mb-4">
//             {recipe.steps.map((step, index) => (
//               <li key={index}>{step.instruction}</li>
//             ))}
//           </ol>
//         ) : (
//           <p>No steps added yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }










// comment section added and working

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API, { setAuthToken } from "../api/api";

// export default function RecipeDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [recipe, setRecipe] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const res = await API.get(`/recipes/${id}`);
//         setRecipe(res.data);
//       } catch (err) {
//         console.error("Fetch recipe error:", err);
//         alert("Failed to fetch recipe");
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         const res = await API.get(`/comments/${id}`);
//         setComments(res.data);
//       } catch (err) {
//         console.error("Fetch comments error:", err);
//       }
//     };

//     fetchRecipe();
//     fetchComments();
//   }, [id]);

//   const handleFavorite = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to add favorites");
//         return;
//       }
//       setAuthToken(token);
//       await API.post(`/favorites/${id}`);
//       alert("Added to favorites!");
//     } catch (err) {
//       console.error("Add favorite error:", err);
//       alert(err.response?.data?.message || "Failed to add favorite");
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this recipe?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       setAuthToken(token);
//       await API.delete(`/recipes/${id}`);
//       alert("Recipe deleted successfully!");
//       navigate("/");
//     } catch (err) {
//       console.error("Delete recipe error:", err);
//       alert("Failed to delete recipe");
//     }
//   };

//   const handleEdit = () => {
//     navigate(`/edit-recipe/${id}`);
//   };

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return alert("Comment cannot be empty");
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to comment");
//         return;
//       }
//       setAuthToken(token);
//       await API.post("/comments", { recipe_id: id, comment_text: newComment });
//       setNewComment("");
//       // Refresh comments
//       const res = await API.get(`/comments/${id}`);
//       setComments(res.data);
//     } catch (err) {
//       console.error("Add comment error:", err);
//       alert(err.response?.data?.message || "Failed to add comment");
//     }
//   };

//   if (!recipe) return <div className="p-6">Loading...</div>;

//   const ingredients = recipe.ingredients || [];

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
//       <div className="bg-white p-6 rounded shadow-md">
//         <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
//         <img
//           src={recipe.image_url || "https://via.placeholder.com/600x400"}
//           alt={recipe.title}
//           className="w-full h-80 object-cover rounded mb-4"
//         />
//         <p className="mb-2"><strong>Cuisine:</strong> {recipe.cuisine_name || "N/A"}</p>
//         {recipe.tags && recipe.tags.length > 0 && (
//           <p className="mb-2">
//             <strong>Diet:</strong> {recipe.tags.map(t => t.name).join(", ")}
//           </p>
//         )}
//         <p className="mb-2"><strong>Cook Time:</strong> {recipe.cook_time || 0} mins</p>
//         <p className="mb-2"><strong>Difficulty:</strong> {recipe.difficulty || "N/A"}</p>
//         <p className="mb-4">{recipe.description}</p>

//         <div className="flex gap-4 mb-6">
//           <button onClick={handleFavorite} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
//             Add to Favorites
//           </button>
//           <button onClick={handleEdit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//             Edit Recipe
//           </button>
//           <button onClick={handleDelete} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
//             Delete Recipe
//           </button>
//         </div>

//         <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
//         {ingredients.length > 0 ? (
//           <ul className="list-disc list-inside mb-4">
//             {ingredients.map((ing, index) => (
//               <li key={index}>
//                 {ing.quantity} {ing.unit_name || ""} - {ing.ingredient_name}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No ingredients added yet.</p>
//         )}

//         <h2 className="text-2xl font-bold mt-4 mb-2">Steps</h2>
//         {recipe.steps && recipe.steps.length > 0 ? (
//           <ol className="list-decimal list-inside mb-4">
//             {recipe.steps.map((step, index) => (
//               <li key={index}>{step.instruction}</li>
//             ))}
//           </ol>
//         ) : (
//           <p>No steps added yet.</p>
//         )}

//         {/* Comments Section */}
//         <h2 className="text-2xl font-bold mt-4 mb-2">Comments</h2>
//         {comments.length > 0 ? (
//           <ul className="mb-4">
//             {comments.map((c, index) => (
//               <li key={index} className="mb-2 border-b pb-2">
//                 <p className="font-semibold">{c.username}</p>
//                 <p>{c.comment_text}</p>
//                 <p className="text-sm text-gray-500">{new Date(c.created_at).toLocaleString()}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="mb-4">No comments yet.</p>
//         )}

//         {/* Add Comment */}
//         <div className="flex flex-col gap-2">
//           <textarea
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Add your comment..."
//             className="w-full p-2 border rounded"
//           />
//           <button
//             onClick={handleAddComment}
//             className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//           >
//             Submit Comment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }










// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API, { setAuthToken } from "../api/api";

// export default function RecipeDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [recipe, setRecipe] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [averageRating, setAverageRating] = useState(0);
//   const [ratingCount, setRatingCount] = useState(0);
//   const [userRating, setUserRating] = useState(0);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const res = await API.get(`/recipes/${id}`);
//         setRecipe(res.data);
//       } catch (err) {
//         console.error("Fetch recipe error:", err);
//         alert("Failed to fetch recipe");
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         const res = await API.get(`/comments/${id}`);
//         setComments(res.data);
//       } catch (err) {
//         console.error("Fetch comments error:", err);
//       }
//     };

//     const fetchRatings = async () => {
//       try {
//         const res = await API.get(`/ratings/${id}`);
//         setAverageRating(res.data.average_rating || 0);
//         setRatingCount(res.data.rating_count || 0);
//       } catch (err) {
//         console.error("Fetch rating error:", err);
//       }
//     };

//     fetchRecipe();
//     fetchComments();
//     fetchRatings();
//   }, [id]);

//   const handleFavorite = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to add favorites");
//         return;
//       }
//       setAuthToken(token);
//       await API.post(`/favorites/${id}`);
//       alert("Added to favorites!");
//     } catch (err) {
//       console.error("Add favorite error:", err);
//       alert(err.response?.data?.message || "Failed to add favorite");
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this recipe?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       setAuthToken(token);
//       await API.delete(`/recipes/${id}`);
//       alert("Recipe deleted successfully!");
//       navigate("/");
//     } catch (err) {
//       console.error("Delete recipe error:", err);
//       alert("Failed to delete recipe");
//     }
//   };

//   const handleEdit = () => {
//     navigate(`/edit-recipe/${id}`);
//   };

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return alert("Comment cannot be empty");
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to comment");
//         return;
//       }
//       setAuthToken(token);
//       await API.post("/comments", { recipe_id: id, comment_text: newComment });
//       setNewComment("");
//       const res = await API.get(`/comments/${id}`);
//       setComments(res.data);
//     } catch (err) {
//       console.error("Add comment error:", err);
//       alert(err.response?.data?.message || "Failed to add comment");
//     }
//   };

//   const handleRatingChange = async (value) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You must be logged in to rate");
//         return;
//       }
//       setAuthToken(token);
//       await API.post("/ratings", { recipe_id: id, rating: value });
//       setUserRating(value);
//       const res = await API.get(`/ratings/${id}`);
//       setAverageRating(res.data.average_rating || 0);
//       setRatingCount(res.data.rating_count || 0);
//     } catch (err) {
//       console.error("Add rating error:", err);
//       alert(err.response?.data?.message || "Failed to add rating");
//     }
//   };

//   if (!recipe) return <div className="p-6">Loading...</div>;

//   const ingredients = recipe.ingredients || [];

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
//       <div className="bg-white p-6 rounded shadow-md">
//         <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
//         <img
//           src={recipe.image_url || "https://via.placeholder.com/600x400"}
//           alt={recipe.title}
//           className="w-full h-80 object-cover rounded mb-4"
//         />
//         <p className="mb-2"><strong>Cuisine:</strong> {recipe.cuisine_name || "N/A"}</p>
//         {recipe.tags && recipe.tags.length > 0 && (
//           <p className="mb-2">
//             <strong>Diet:</strong> {recipe.tags.map(t => t.name).join(", ")}
//           </p>
//         )}
//         <p className="mb-2"><strong>Cook Time:</strong> {recipe.cook_time || 0} mins</p>
//         <p className="mb-2"><strong>Difficulty:</strong> {recipe.difficulty || "N/A"}</p>
//        <p className="mb-2">
//   <strong>Rating:</strong> {(Number(averageRating) || 0).toFixed(1)} / 5 ({ratingCount} {ratingCount === 1 ? "vote" : "votes"})
// </p>


//         {/* User Rating */}
//         <div className="flex items-center gap-1 mb-4">
//           {[1,2,3,4,5].map((num) => (
//             <span
//               key={num}
//               onClick={() => handleRatingChange(num)}
//               className={`cursor-pointer text-2xl ${num <= userRating ? "text-yellow-400" : "text-gray-400"}`}
//             >
//               ★
//             </span>
//           ))}
//           {userRating === 0 && <span className="ml-2 text-gray-600">Click a star to rate</span>}
//         </div>

//         <div className="flex gap-4 mb-6">
//           <button onClick={handleFavorite} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
//             Add to Favorites
//           </button>
//           <button onClick={handleEdit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//             Edit Recipe
//           </button>
//           <button onClick={handleDelete} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
//             Delete Recipe
//           </button>
//         </div>

//         <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
//         {ingredients.length > 0 ? (
//           <ul className="list-disc list-inside mb-4">
//             {ingredients.map((ing, index) => (
//               <li key={index}>
//                 {ing.quantity} {ing.unit_name || ""} - {ing.ingredient_name}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No ingredients added yet.</p>
//         )}

//         <h2 className="text-2xl font-bold mt-4 mb-2">Steps</h2>
//         {recipe.steps && recipe.steps.length > 0 ? (
//           <ol className="list-decimal list-inside mb-4">
//             {recipe.steps.map((step, index) => (
//               <li key={index}>{step.instruction}</li>
//             ))}
//           </ol>
//         ) : (
//           <p>No steps added yet.</p>
//         )}

//         {/* Comments Section */}
//         <h2 className="text-2xl font-bold mt-4 mb-2">Comments</h2>
//         {comments.length > 0 ? (
//           <ul className="mb-4">
//             {comments.map((c, index) => (
//               <li key={index} className="mb-2 border-b pb-2">
//                 <p className="font-semibold">{c.username}</p>
//                 <p>{c.comment_text}</p>
//                 <p className="text-sm text-gray-500">{new Date(c.created_at).toLocaleString()}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="mb-4">No comments yet.</p>
//         )}

//         {/* Add Comment */}
//         <div className="flex flex-col gap-2">
//           <textarea
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Add your comment..."
//             className="w-full p-2 border rounded"
//           />
//           <button
//             onClick={handleAddComment}
//             className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//           >
//             Submit Comment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






//working version

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API, { setAuthToken } from "../api/api";

// export default function RecipeDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [recipe, setRecipe] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [averageRating, setAverageRating] = useState(0);
//   const [ratingCount, setRatingCount] = useState(0);
//   const [userRating, setUserRating] = useState(0);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const res = await API.get(`/recipes/${id}`);
//         setRecipe(res.data);
//       } catch (err) {
//         console.error("Fetch recipe error:", err);
//         alert("Failed to fetch recipe");
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         const res = await API.get(`/comments/${id}`);
//         setComments(res.data);
//       } catch (err) {
//         console.error("Fetch comments error:", err);
//       }
//     };

//     const fetchRatings = async () => {
//       try {
//         const res = await API.get(`/ratings/${id}`);
//         setAverageRating(res.data.average_rating || 0);
//         setRatingCount(res.data.rating_count || 0);
//       } catch (err) {
//         console.error("Fetch rating error:", err);
//       }
//     };

//     fetchRecipe();
//     fetchComments();
//     fetchRatings();
//   }, [id]);

//   const handleFavorite = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("You must be logged in to add favorites");
//       setAuthToken(token);
//       await API.post(`/favorites/${id}`);
//       alert("Added to favorites!");
//     } catch (err) {
//       console.error("Add favorite error:", err);
//       alert(err.response?.data?.message || "Failed to add favorite");
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this recipe?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       setAuthToken(token);
//       await API.delete(`/recipes/${id}`);
//       alert("Recipe deleted successfully!");
//       navigate("/");
//     } catch (err) {
//       console.error("Delete recipe error:", err);
//       alert("Failed to delete recipe");
//     }
//   };

//   const handleEdit = () => navigate(`/edit-recipe/${id}`);

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return alert("Comment cannot be empty");
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("You must be logged in to comment");
//       setAuthToken(token);
//       await API.post("/comments", { recipe_id: id, comment_text: newComment });
//       setNewComment("");
//       const res = await API.get(`/comments/${id}`);
//       setComments(res.data);
//     } catch (err) {
//       console.error("Add comment error:", err);
//       alert(err.response?.data?.message || "Failed to add comment");
//     }
//   };

//   const handleRatingChange = async (value) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("You must be logged in to rate");
//       setAuthToken(token);
//       await API.post("/ratings", { recipe_id: id, rating: value });
//       setUserRating(value);
//       const res = await API.get(`/ratings/${id}`);
//       setAverageRating(res.data.average_rating || 0);
//       setRatingCount(res.data.rating_count || 0);
//     } catch (err) {
//       console.error("Add rating error:", err);
//       alert(err.response?.data?.message || "Failed to add rating");
//     }
//   };

//   if (!recipe) return <div className="p-6 text-center text-gray-600">Loading...</div>;

//   const ingredients = recipe.ingredients || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-6">
//       <div className="max-w-4xl mx-auto space-y-6">
//         {/* Recipe Header */}
//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
//           <img
//             src={recipe.image_url || "https://via.placeholder.com/800x400"}
//             alt={recipe.title}
//             className="w-full h-96 object-cover"
//           />
//           <div className="p-8">
//             <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4">{recipe.title}</h1>
//             <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
//               <p><strong>Cuisine:</strong> {recipe.cuisine_name || "N/A"}</p>
//               {recipe.tags && recipe.tags.length > 0 && (
//                 <p><strong>Diet:</strong> {recipe.tags.map(t => t.name).join(", ")}</p>
//               )}
//               <p><strong>Cook Time:</strong> {recipe.cook_time || 0} mins</p>
//               <p><strong>Difficulty:</strong> {recipe.difficulty || "N/A"}</p>
//             </div>

//             {/* Rating */}
//             <div className="flex items-center gap-2 mb-6">
//               <span className="text-lg font-semibold">Rating:</span>
//               <span className="text-yellow-400 font-bold text-xl">{(Number(averageRating) || 0).toFixed(1)}</span>
//               <span className="text-gray-500">/5 ({ratingCount} {ratingCount === 1 ? "vote" : "votes"})</span>
//             </div>

//             {/* User Rating */}
//             <div className="flex items-center gap-2 mb-6">
//               {[1,2,3,4,5].map(num => (
//                 <span
//                   key={num}
//                   onClick={() => handleRatingChange(num)}
//                   className={`cursor-pointer text-3xl transition-colors ${
//                     num <= userRating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"
//                   }`}
//                 >★</span>
//               ))}
//               {userRating === 0 && <span className="text-gray-500 ml-2">Click a star to rate</span>}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-4 mb-6">
//               <button onClick={handleFavorite} className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition shadow-md">
//                 Add to Favorites
//               </button>
//               <button onClick={handleEdit} className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition shadow-md">
//                 Edit Recipe
//               </button>
//               <button onClick={handleDelete} className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition shadow-md">
//                 Delete Recipe
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Ingredients */}
//         <div className="bg-white rounded-3xl shadow-md p-6">
//           <h2 className="text-2xl font-bold text-indigo-600 mb-4 border-b pb-2">Ingredients</h2>
//           {ingredients.length > 0 ? (
//             <ul className="list-disc list-inside space-y-2 text-gray-700">
//               {ingredients.map((ing, idx) => (
//                 <li key={idx}>
//                   <span className="font-medium">{ing.quantity} {ing.unit_name || ""}</span> - {ing.ingredient_name}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No ingredients added yet.</p>
//           )}
//         </div>

//         {/* Steps */}
//         <div className="bg-white rounded-3xl shadow-md p-6">
//           <h2 className="text-2xl font-bold text-indigo-600 mb-4 border-b pb-2">Steps</h2>
//           {recipe.steps && recipe.steps.length > 0 ? (
//             <ol className="list-decimal list-inside space-y-2 text-gray-700">
//               {recipe.steps.map((step, idx) => (
//                 <li key={idx}>{step.instruction}</li>
//               ))}
//             </ol>
//           ) : (
//             <p className="text-gray-500">No steps added yet.</p>
//           )}
//         </div>

//         {/* Comments */}
//         <div className="bg-white rounded-3xl shadow-md p-6">
//           <h2 className="text-2xl font-bold text-indigo-600 mb-4 border-b pb-2">Comments</h2>
//           {comments.length > 0 ? (
//             <ul className="space-y-4 mb-6">
//               {comments.map((c, idx) => (
//                 <li key={idx} className="bg-gray-50 p-4 rounded-xl shadow-sm">
//                   <p className="font-semibold text-indigo-600">{c.username}</p>
//                   <p className="text-gray-700">{c.comment_text}</p>
//                   <p className="text-sm text-gray-400 mt-1">{new Date(c.created_at).toLocaleString()}</p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500 mb-4">No comments yet.</p>
//           )}

//           {/* Add Comment */}
//           <div className="flex flex-col gap-3">
//             <textarea
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Add your comment..."
//               className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700"
//             />
//             <button
//               onClick={handleAddComment}
//               className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition shadow-md"
//             >
//               Submit Comment
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






//new version 


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../api/api";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [userRating, setUserRating] = useState(0);

  // Safely get current user from localStorage
  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    currentUser = null;
  }

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await API.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error("Fetch recipe error:", err);
        alert("Failed to fetch recipe");
      }
    };

    const fetchComments = async () => {
      try {
        const res = await API.get(`/comments/${id}`);
        setComments(res.data);
      } catch (err) {
        console.error("Fetch comments error:", err);
      }
    };

    const fetchRatings = async () => {
      try {
        const res = await API.get(`/ratings/${id}`);
        setAverageRating(res.data.average_rating || 0);
        setRatingCount(res.data.rating_count || 0);
      } catch (err) {
        console.error("Fetch rating error:", err);
      }
    };

    fetchRecipe();
    fetchComments();
    fetchRatings();
  }, [id]);

  const handleFavorite = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You must be logged in to add favorites");
      setAuthToken(token);
      await API.post(`/favorites/${id}`);
      alert("Added to favorites!");
    } catch (err) {
      console.error("Add favorite error:", err);
      alert(err.response?.data?.message || "Failed to add favorite");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      await API.delete(`/recipes/${id}`);
      alert("Recipe deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Delete recipe error:", err);
      alert("Failed to delete recipe");
    }
  };

  const handleEdit = () => navigate(`/edit-recipe/${id}`);

  const handleAddComment = async () => {
    if (!newComment.trim()) return alert("Comment cannot be empty");
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You must be logged in to comment");
      setAuthToken(token);
      await API.post("/comments", { recipe_id: id, comment_text: newComment });
      setNewComment("");
      const res = await API.get(`/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error("Add comment error:", err);
      alert(err.response?.data?.message || "Failed to add comment");
    }
  };

  const handleRatingChange = async (value) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You must be logged in to rate");
      setAuthToken(token);
      await API.post("/ratings", { recipe_id: id, rating: value });
      setUserRating(value);
      const res = await API.get(`/ratings/${id}`);
      setAverageRating(res.data.average_rating || 0);
      setRatingCount(res.data.rating_count || 0);
    } catch (err) {
      console.error("Add rating error:", err);
      alert(err.response?.data?.message || "Failed to add rating");
    }
  };

  if (!recipe) return <div className="p-6 text-center text-gray-600">Loading...</div>;

  const ingredients = recipe.ingredients || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Recipe Header */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <img
            src={recipe.image_url || "https://via.placeholder.com/800x400"}
            alt={recipe.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4">
              {recipe.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
              <p><strong>Cuisine:</strong> {recipe.cuisine_name || "N/A"}</p>
              {recipe.tags && recipe.tags.length > 0 && (
                <p><strong>Diet:</strong> {recipe.tags.map(t => t.name).join(", ")}</p>
              )}
              <p><strong>Cook Time:</strong> {recipe.cook_time || 0} mins</p>
              <p><strong>Difficulty:</strong> {recipe.difficulty || "N/A"}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-lg font-semibold">Rating:</span>
              <span className="text-yellow-400 font-bold text-xl">
                {(Number(averageRating) || 0).toFixed(1)}
              </span>
              <span className="text-gray-500">
                /5 ({ratingCount} {ratingCount === 1 ? "vote" : "votes"})
              </span>
            </div>

            {/* User Rating */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map(num => (
                <span
                  key={num}
                  onClick={() => handleRatingChange(num)}
                  className={`cursor-pointer text-3xl transition-colors ${
                    num <= userRating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"
                  }`}
                >
                  ★
                </span>
              ))}
              {userRating === 0 && <span className="text-gray-500 ml-2">Click a star to rate</span>}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleFavorite}
                className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition shadow-md"
              >
                Add to Favorites
              </button>

              {/* Show Edit/Delete only if current user owns the recipe */}
              {currentUser && recipe.user_id === currentUser.user_id && (
                <>
                  <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition shadow-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition shadow-md"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-3xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4 border-b pb-2">Ingredients</h2>
          {ingredients.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {ingredients.map((ing, idx) => (
                <li key={idx}>
                  <span className="font-medium">{ing.quantity} {ing.unit_name || ""}</span> - {ing.ingredient_name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No ingredients added yet.</p>
          )}
        </div>

        {/* Steps */}
        <div className="bg-white rounded-3xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4 border-b pb-2">Steps</h2>
          {recipe.steps && recipe.steps.length > 0 ? (
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              {recipe.steps.map((step, idx) => (
                <li key={idx}>{step.instruction}</li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500">No steps added yet.</p>
          )}
        </div>

        {/* Comments */}
        <div className="bg-white rounded-3xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4 border-b pb-2">Comments</h2>
          {comments.length > 0 ? (
            <ul className="space-y-4 mb-6">
              {comments.map((c, idx) => (
                <li key={idx} className="bg-gray-50 p-4 rounded-xl shadow-sm">
                  <p className="font-semibold text-indigo-600">{c.username}</p>
                  <p className="text-gray-700">{c.comment_text}</p>
                  <p className="text-sm text-gray-400 mt-1">{new Date(c.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mb-4">No comments yet.</p>
          )}

          {/* Add Comment */}
          <div className="flex flex-col gap-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment..."
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700"
            />
            <button
              onClick={handleAddComment}
              className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition shadow-md"
            >
              Submit Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
