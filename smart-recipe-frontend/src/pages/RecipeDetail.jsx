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

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { setAuthToken } from "../api/api";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

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
    fetchRecipe();
  }, [id]);

  const handleFavorite = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add favorites");
        return;
      }
      setAuthToken(token);
      await API.post(`/favorites/${id}`); // backend expects recipe_id in URL
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

  const handleEdit = () => {
    navigate(`/edit-recipe/${id}`);
  };

  if (!recipe) return <div className="p-6">Loading...</div>;

  const ingredients = recipe.ingredients || [];

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <img
          src={recipe.image_url || "https://via.placeholder.com/600x400"}
          alt={recipe.title}
          className="w-full h-80 object-cover rounded mb-4"
        />
        <p className="mb-2"><strong>Cuisine:</strong> {recipe.cuisine_name || "N/A"}</p>
        {recipe.tags && recipe.tags.length > 0 && (
          <p className="mb-2">
            <strong>Diet:</strong> {recipe.tags.map(t => t.name).join(", ")}
          </p>
        )}
        <p className="mb-2"><strong>Cook Time:</strong> {recipe.cook_time || 0} mins</p>
        <p className="mb-2"><strong>Difficulty:</strong> {recipe.difficulty || "N/A"}</p>
        <p className="mb-4">{recipe.description}</p>

        <div className="flex gap-4 mb-6">
          <button onClick={handleFavorite} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Add to Favorites
          </button>
          <button onClick={handleEdit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Edit Recipe
          </button>
          <button onClick={handleDelete} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
            Delete Recipe
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
        {ingredients.length > 0 ? (
          <ul className="list-disc list-inside mb-4">
            {ingredients.map((ing, index) => (
              <li key={index}>
                {ing.quantity} {ing.unit_name || ""} - {ing.ingredient_name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No ingredients added yet.</p>
        )}

        <h2 className="text-2xl font-bold mt-4 mb-2">Steps</h2>
        {recipe.steps && recipe.steps.length > 0 ? (
          <ol className="list-decimal list-inside mb-4">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step.instruction}</li>
            ))}
          </ol>
        ) : (
          <p>No steps added yet.</p>
        )}
      </div>
    </div>
  );
}
