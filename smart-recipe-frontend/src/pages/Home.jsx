// import React, { useEffect, useState } from "react";
// import API, { setAuthToken } from "../api/api";
// import RecipeCard from "../components/RecipeCard";

// export default function Home() {
//   const [recipes, setRecipes] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const res = await API.get("/recipes"); // GET all recipes
//         setRecipes(res.data);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to fetch recipes");
//       }
//     };
//     fetchRecipes();
//   }, []);

//   const filteredRecipes = recipes.filter(
//     (r) =>
//       r.title.toLowerCase().includes(search.toLowerCase()) ||
//       r.cuisine.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center">All Recipes</h1>
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search by name or cuisine..."
//           className="p-3 w-full max-w-md rounded border"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredRecipes.map((recipe) => (
//           <RecipeCard key={recipe.recipe_id} recipe={recipe} />
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import API from "../api/api";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await API.get("/recipes"); // GET all recipes
        setRecipes(res.data);
      } catch (err) {
        console.error("Fetch recipes error:", err);
        alert("Failed to fetch recipes");
      }
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">All Recipes</h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or cuisine..."
          className="p-3 w-full max-w-md rounded border"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.recipe_id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
