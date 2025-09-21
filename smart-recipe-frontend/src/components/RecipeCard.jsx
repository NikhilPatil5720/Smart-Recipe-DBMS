
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









// import React from "react";
// import { Link } from "react-router-dom";

// export default function RecipeCard({ recipe }) {
//   return (
//     <Link to={`/recipe/${recipe.recipe_id}`}>
//       <div className="bg-white shadow-md rounded overflow-hidden hover:shadow-xl transition duration-300">
//         <img
//           src={recipe.image_url || "https://via.placeholder.com/300x200"}
//           alt={recipe.title}
//           className="w-full h-48 object-cover"
//         />
//         <div className="p-4">
//           <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
//           <p className="text-gray-600 text-sm mb-1">Cuisine: {recipe.cuisine}</p>
//           <p className="text-gray-600 text-sm mb-1">Diet: {recipe.dietary_type}</p>
//           <p className="text-gray-600 text-sm">Cook Time: {recipe.cook_time} mins</p>
//         </div>
//       </div>
//     </Link>
//   );
// }



//new schema

// import React from "react";
// import { Link } from "react-router-dom";

// export default function RecipeCard({ recipe }) {
//   return (
//     <Link to={`/recipe/${recipe.recipe_id}`}>
//       <div className="bg-white shadow-md rounded overflow-hidden hover:shadow-xl transition duration-300">
//         <img
//           src={recipe.image_url || "https://via.placeholder.com/300x200"}
//           alt={recipe.title}
//           className="w-full h-48 object-cover"
//         />
//         <div className="p-4">
//           <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
//           <p className="text-gray-600 text-sm mb-1">
//             Cuisine: {recipe.cuisine_name || "N/A"}
//           </p>
//           {/* If you are using tags for dietary type, you can display them */}
//           {recipe.tags && recipe.tags.length > 0 && (
//             <p className="text-gray-600 text-sm mb-1">
//               Diet: {recipe.tags.map((t) => t.name).join(", ")}
//             </p>
//           )}
//           <p className="text-gray-600 text-sm">
//             Cook Time: {recipe.cook_time || 0} mins
//           </p>
//           <p className="text-gray-600 text-sm">
//             Difficulty: {recipe.difficulty || "N/A"}
//           </p>
//         </div>
//       </div>
//     </Link>
//   );
// }





//ui changes only

// import React from "react";
// import { Link } from "react-router-dom";

// export default function RecipeCard({ recipe }) {
//   return (
//     <Link to={`/recipe/${recipe.recipe_id}`}>
//       <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300">
//         {/* Recipe Image */}
//         <div className="relative w-full h-52">
//           <img
//             src={recipe.image_url || "https://via.placeholder.com/400x300"}
//             alt={recipe.title}
//             className="w-full h-full object-cover rounded-t-3xl"
//           />
//         </div>

//         {/* Card Content */}
//         <div className="p-4 space-y-2 ">
//           <h2 className="text-lg font-bold text-gray-800 hover:text-indigo-600 transition">
//             {recipe.title}
//           </h2>

//           <div className="flex flex-wrap gap-2 text-sm text-gray-500">
//             <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
//               Cuisine: {recipe.cuisine_name || "N/A"}
//             </span>
//             {recipe.tags && recipe.tags.length > 0 && (
//               <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
//                 {recipe.tags.map((t) => t.name).join(", ")}
//               </span>
//             )}
//             <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
//               Cook Time: {recipe.cook_time || 0} mins
//             </span>
//             <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
//               Difficulty: {recipe.difficulty || "N/A"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }



// import React from "react";
// import { Link } from "react-router-dom";

// export default function RecipeCard({ recipe }) {
//   return (
//     <Link to={`/recipe/${recipe.recipe_id}`}>
//       <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 h-[350px] flex flex-col">
//         {/* Recipe Image */}
//         <div className="relative w-full h-52">
//           <img
//             src={recipe.image_url || "https://via.placeholder.com/400x300"}
//             alt={recipe.title}
//             className="w-full h-full object-cover rounded-t-3xl"
//           />
//         </div>

//         {/* Card Content */}
//         <div className="p-4 flex-1 flex flex-col justify-between">
//           {/* Title */}
//           <h2 className="text-lg font-bold text-gray-800 hover:text-indigo-600 transition truncate">
//             {recipe.title}
//           </h2>

//           {/* Tags and Info */}
//           <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-2">
//             <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full truncate">
//               Cuisine: {recipe.cuisine_name || "N/A"}
//             </span>
//             {recipe.tags && recipe.tags.length > 0 && (
//               <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full truncate">
//                 {recipe.tags.map((t) => t.name).join(", ")}
//               </span>
//             )}
//             <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full truncate">
//               Cook Time: {recipe.cook_time || 0} mins
//             </span>
//             <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full truncate">
//               Difficulty: {recipe.difficulty || "N/A"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }




//consistent Ui across all cards

import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.recipe_id}`}>
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 h-[320px] flex flex-col">
        {/* Recipe Image */}
        <div className="relative w-full h-48">
          <img
            src={recipe.image_url || "https://via.placeholder.com/400x300"}
            alt={recipe.title}
            className="w-full h-full object-cover rounded-t-3xl"
          />
        </div>

        {/* Card Content */}
        <div className="p-3 flex-1 flex flex-col justify-evenly">
          {/* Title */}
          <h2 className="text-base font-bold text-gray-800 hover:text-indigo-600 transition truncate">
            {recipe.title}
          </h2>

          {/* Tags and Info */}
          <div className="flex flex-wrap gap-1 text-xs text-gray-500 mt-1">
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full truncate">
              Cuisine: {recipe.cuisine_name || "N/A"}
            </span>
            {recipe.tags && recipe.tags.length > 0 && (
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full truncate">
                {recipe.tags.map((t) => t.name).join(", ")}
              </span>
            )}
            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full truncate">
              Cook Time: {recipe.cook_time || 0} mins
            </span>
            <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full truncate">
              Difficulty: {recipe.difficulty || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
