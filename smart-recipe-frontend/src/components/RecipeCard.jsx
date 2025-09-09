
// import React from "react";
// export default function RecipeCard({ recipe }) {
//   return (
//     <div className="bg-white shadow-md rounded overflow-hidden hover:shadow-xl transition duration-300">
//       <img
//         src={recipe.image_url || "https://via.placeholder.com/300x200"}
//         alt={recipe.title}
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
//         <p className="text-gray-600 text-sm mb-1">Cuisine: {recipe.cuisine}</p>
//         <p className="text-gray-600 text-sm mb-1">Diet: {recipe.dietary_type}</p>
//         <p className="text-gray-600 text-sm">Cook Time: {recipe.cook_time} mins</p>
//       </div>
//     </div>
//   );
// }









import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.recipe_id}`}>
      <div className="bg-white shadow-md rounded overflow-hidden hover:shadow-xl transition duration-300">
        <img
          src={recipe.image_url || "https://via.placeholder.com/300x200"}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
          <p className="text-gray-600 text-sm mb-1">Cuisine: {recipe.cuisine}</p>
          <p className="text-gray-600 text-sm mb-1">Diet: {recipe.dietary_type}</p>
          <p className="text-gray-600 text-sm">Cook Time: {recipe.cook_time} mins</p>
        </div>
      </div>
    </Link>
  );
}
