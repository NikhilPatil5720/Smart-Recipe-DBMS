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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <p>You have no favorite recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((recipe) => (
            <div key={recipe.recipe_id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{recipe.title}</h3>
              <p className="text-sm italic">{recipe.cuisine_name}</p>
              <p className="mt-2">{recipe.description}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => navigate(`/recipe/${recipe.recipe_id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => removeFavorite(recipe.recipe_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
