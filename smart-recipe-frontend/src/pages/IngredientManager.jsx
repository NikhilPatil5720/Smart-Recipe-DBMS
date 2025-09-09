import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function IngredientManager({ recipeId }) {
  const [ingredients, setIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantity, setQuantity] = useState("");

  // Fetch recipe's ingredients
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await API.get(`/ingredients/recipe/${recipeId}`);
        setIngredients(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchIngredients();
  }, [recipeId]);

  // Fetch all ingredients to select from
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await API.get("/ingredients");
        setAllIngredients(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  const handleAdd = async () => {
    if (!selectedIngredient || !quantity) return alert("Select ingredient and quantity");
    try {
      await API.post("/ingredients/add-to-recipe", {
        recipe_id: recipeId,
        ingredient_id: Number(selectedIngredient),
        quantity,
      });
      console.log(res.data);

      setIngredients([...ingredients, {
        name: allIngredients.find(i => i.ingredient_id === parseInt(selectedIngredient)).name,
        quantity,
      }]);
      setSelectedIngredient("");
      setQuantity("");
    } catch (err) {
      console.error(err);
      alert("Failed to add ingredient");
    }
  };

  return (
    <div className="mt-4 p-4 border rounded">
      <h3 className="font-bold mb-2">Ingredients</h3>
      <ul>
        {ingredients.map((ing, index) => (
          <li key={index}>{ing.quantity} - {ing.name}</li>
        ))}
      </ul>
      <div className="flex mt-2 gap-2">
        <select value={selectedIngredient} onChange={e => setSelectedIngredient(e.target.value)} className="p-2 border rounded">
          <option value="">Select Ingredient</option>
          {allIngredients.map(ing => <option key={ing.ingredient_id} value={ing.ingredient_id}>{ing.name}</option>)}
        </select>
        <input type="text" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} className="p-2 border rounded" />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 rounded">Add</button>
      </div>
    </div>
  );
}
