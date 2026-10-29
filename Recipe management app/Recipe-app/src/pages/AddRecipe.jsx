import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { useRecipes } from "../context/RecipeContext";
function AddRecipe() {
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleAddRecipe = (recipe) => { try { addRecipe(recipe); navigate("/recipes"); } catch { setError("Recipe could not be added. Please try again."); } };
  return <main className="add-page page-width"><div className="add-heading"><p className="eyebrow">Add something delicious</p><h1>Share a recipe <span className="accent-text">with your future self.</span></h1><p>Save the ingredients and steps so your next cooking session is easy.</p></div>{error && <p className="form-error" role="alert">{error}</p>}<RecipeForm onAddRecipe={handleAddRecipe}/></main>;
}
export default AddRecipe;
