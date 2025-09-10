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



// import React, { useEffect, useState } from "react";
// import API from "../api/api";
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
//         console.error("Fetch recipes error:", err);
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

//       {/* Search */}
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search by name or cuisine..."
//           className="p-3 w-full max-w-md rounded border"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Recipe Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredRecipes.map((recipe) => (
//           <RecipeCard key={recipe.recipe_id} recipe={recipe} />
//         ))}
//       </div>
//     </div>
//   );
// }












// //new schema


//three search fields

// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import RecipeCard from "../components/RecipeCard";

// export default function Home() {
//   const [recipes, setRecipes] = useState([]);
//   const [search, setSearch] = useState("");
//   const [ingredient, setIngredient] = useState("");
//   const [cuisine, setCuisine] = useState("");

//   const fetchRecipes = async (params = {}) => {
//     try {
//       const queryParams = new URLSearchParams(params).toString();
//       const res = await API.get(`/search?${queryParams}`);
//       setRecipes(res.data);
//     } catch (err) {
//       console.error("Fetch recipes error:", err);
//       alert("Failed to fetch recipes");
//     }
//   };

//   useEffect(() => {
//     // Initially load all recipes
//     fetchRecipes();
//   }, []);

//   const handleSearch = () => {
//     fetchRecipes({ keyword: search, ingredient, cuisine });
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center">All Recipes</h1>

//       {/* Search Inputs */}
//       <div className="flex justify-center gap-4 mb-6 flex-wrap">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           className="p-3 w-full max-w-xs rounded border"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Search by ingredient..."
//           className="p-3 w-full max-w-xs rounded border"
//           value={ingredient}
//           onChange={(e) => setIngredient(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Search by cuisine..."
//           className="p-3 w-full max-w-xs rounded border"
//           value={cuisine}
//           onChange={(e) => setCuisine(e.target.value)}
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Search
//         </button>
//       </div>

//       {/* Recipe Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {recipes.length > 0 ? (
//           recipes.map((recipe) => (
//             <RecipeCard key={recipe.recipe_id} recipe={recipe} />
//           ))
//         ) : (
//           <p className="text-center col-span-full">No recipes found.</p>
//         )}
//       </div>
//     </div>
//   );
// }







// //comment and rating functionality added
// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import RecipeCard from "../components/RecipeCard";

// export default function Home() {
//   const [recipes, setRecipes] = useState([]);
//   const [search, setSearch] = useState("");
//   const [ingredient, setIngredient] = useState("");
//   const [cuisine, setCuisine] = useState("");
//   const [dietaryType, setDietaryType] = useState("");

//   const fetchRecipes = async (params = {}) => {
//     try {
//       const queryParams = new URLSearchParams(params).toString();
//       const res = await API.get(`/search?${queryParams}`);
//       setRecipes(res.data);
//     } catch (err) {
//       console.error("Fetch recipes error:", err);
//       alert("Failed to fetch recipes");
//     }
//   };

//   useEffect(() => {
//     // Initially load all recipes
//     fetchRecipes();
//   }, []);

//   const handleSearch = () => {
//     fetchRecipes({
//       keyword: search,
//       ingredient,
//       cuisine,
//       dietary_type: dietaryType,
//     });
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center">All Recipes</h1>

//       {/* Search Inputs */}
//       <div className="flex justify-center gap-4 mb-6 flex-wrap">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           className="p-3 w-full max-w-xs rounded border"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Search by ingredient..."
//           className="p-3 w-full max-w-xs rounded border"
//           value={ingredient}
//           onChange={(e) => setIngredient(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Search by cuisine..."
//           className="p-3 w-full max-w-xs rounded border"
//           value={cuisine}
//           onChange={(e) => setCuisine(e.target.value)}
//         />
//         <select
//           className="p-3 w-full max-w-xs border rounded"
//           value={dietaryType}
//           onChange={(e) => setDietaryType(e.target.value)}
//         >
//           <option value="">All Dietary Types</option>
//           <option value="Vegan">Vegan</option>
//           <option value="Vegetarian">Vegetarian</option>
//           <option value="Gluten-Free">Gluten-Free</option>
//           <option value="Keto">Keto</option>
//           <option value="Non-Vegetarian">Non-Vegetarian</option>
//           {/* Add more dietary types if needed */}
//         </select>

//         <button
//           onClick={handleSearch}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Search
//         </button>
//       </div>

//       {/* Recipe Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {recipes.length > 0 ? (
//           recipes.map((recipe) => (
//             <RecipeCard key={recipe.recipe_id} recipe={recipe} />
//           ))
//         ) : (
//           <p className="text-center col-span-full">No recipes found.</p>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import API from "../api/api";
import RecipeCard from "../components/RecipeCard";
import Navbar from "../components/Navbar";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryType, setDietaryType] = useState("");

  const fetchRecipes = async (params = {}) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const res = await API.get(`/search?${queryParams}`);
      setRecipes(res.data);
    } catch (err) {
      console.error("Fetch recipes error:", err);
      alert("Failed to fetch recipes");
    }
  };

  useEffect(() => {
    // Initially load all recipes
    fetchRecipes();
  }, []);

  const handleSearch = () => {
    fetchRecipes({
      keyword: search,
      ingredient,
      cuisine,
      dietary_type: dietaryType,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Explore Recipes
        </h1>

        {/* Search & Filters */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10 flex flex-wrap gap-4 justify-center">
          <input
            type="text"
            placeholder="Search by name..."
            className="p-3 w-full sm:w-60 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by ingredient..."
            className="p-3 w-full sm:w-60 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by cuisine..."
            className="p-3 w-full sm:w-60 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
          <select
            className="p-3 w-full sm:w-60 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={dietaryType}
            onChange={(e) => setDietaryType(e.target.value)}
          >
            <option value="">All Dietary Types</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Keto">Keto</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Search
          </button>
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.recipe_id} recipe={recipe} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 text-lg">
              No recipes found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
