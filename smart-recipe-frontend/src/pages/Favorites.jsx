// import React, { useEffect, useState } from "react";
// import API, { setAuthToken } from "../api/api";
// import { useNavigate } from "react-router-dom";

// export default function Favorites() {
//   const [favorites, setFavorites] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         setAuthToken(token);
//         const res = await API.get("/favorites");
//         setFavorites(res.data);
//       } catch (err) {
//         console.error("Failed to fetch favorites", err);
//         alert("Could not load favorite recipes");
//       }
//     };

//     fetchFavorites();
//   }, []);

//   const removeFavorite = async (recipe_id) => {
//     try {
//       const token = localStorage.getItem("token");
//       setAuthToken(token);
//       await API.post("/favorites/remove", { recipe_id });
//       setFavorites(favorites.filter((r) => r.recipe_id !== recipe_id));
//     } catch (err) {
//       console.error("Failed to remove favorite", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Your Favorite Recipes</h2>
//       {favorites.length === 0 ? (
//         <p>You have no favorite recipes yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {favorites.map((recipe) => (
//             <div key={recipe.recipe_id} className="border p-4 rounded shadow">
//               <h3 className="text-xl font-semibold">{recipe.title}</h3>
//               <p className="text-sm italic">{recipe.cuisine_name}</p>
//               <p className="mt-2">{recipe.description}</p>
//               <div className="mt-3 flex gap-2">
//                 <button
//                   onClick={() => navigate(`/recipe/${recipe.recipe_id}`)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 >
//                   View
//                 </button>
//                 <button
//                   onClick={() => removeFavorite(recipe.recipe_id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }









//ui changes only



import React, { useEffect, useState } from "react";
import API, { setAuthToken } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        setAuthToken(token);
        const res = await API.get("/favorites");
        setFavorites(res.data);
      } catch (err) {
        console.error("Failed to fetch favorites", err);
        alert("Could not load favorite recipes");
      }
    };
    fetchFavorites();
  }, []);

  const removeFavorite = async (recipe_id) => {
    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      await API.post("/favorites/remove", { recipe_id });
      setFavorites(favorites.filter((r) => r.recipe_id !== recipe_id));
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Your Favorite Recipes
      </h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">You have no favorite recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <div
              key={recipe.recipe_id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
            >
              <div className="relative w-full h-48">
                <img
                  src={recipe.image_url || "https://via.placeholder.com/400x300"}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-bold text-gray-800 hover:text-indigo-600 transition">
                  {recipe.title}
                </h3>
                <span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm">
                  {recipe.cuisine_name || "N/A"}
                </span>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {recipe.description || "No description available."}
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/recipe/${recipe.recipe_id}`)}
                    className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-xl hover:bg-blue-600 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => removeFavorite(recipe.recipe_id)}
                    className="flex-1 bg-red-500 text-white py-2 px-3 rounded-xl hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
