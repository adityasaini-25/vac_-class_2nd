import { createContext, useContext, useEffect, useState } from "react";
const RecipeContext = createContext();
const starterRecipes = [
  { id: "starter-pasta", title: "Creamy Tomato Pasta", category: "Dinner", difficulty: "Easy", prepTime: 25, servings: 2, description: "A comforting pasta tossed in a silky tomato and cream sauce with fresh basil.", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85", ingredients: ["Pasta", "Cherry tomatoes", "Cream", "Fresh basil"], instructions: ["Boil pasta until al dente.", "Simmer tomatoes with cream.", "Toss together and finish with basil."], isFavorite: true },
  { id: "starter-bowl", title: "Rainbow Buddha Bowl", category: "Lunch", difficulty: "Medium", prepTime: 30, servings: 2, description: "A colorful, nourishing bowl with grains, crunchy vegetables, and a zesty dressing.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85", ingredients: ["Quinoa", "Avocado", "Tomatoes", "Chickpeas", "Greens"], instructions: ["Cook the quinoa and let it cool.", "Arrange vegetables and chickpeas in a bowl.", "Drizzle with dressing and serve."], isFavorite: true },
];
export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(() => {
    try { const saved = localStorage.getItem("recipebook-recipes"); return saved ? JSON.parse(saved) : starterRecipes; } catch { return starterRecipes; }
  });
  useEffect(() => { try { localStorage.setItem("recipebook-recipes", JSON.stringify(recipes)); } catch { /* Storage can be unavailable in private browsing. */ } }, [recipes]);
  const addRecipe = (recipe) => setRecipes((prev) => [...prev, recipe]);
  const deleteRecipe = (id) => setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  const toggleFavorite = (id) => setRecipes((prev) => prev.map((recipe) => recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe));
  const getRecipeById = (id) => recipes.find((recipe) => String(recipe.id) === String(id));
  const favorites = recipes.filter((recipe) => recipe.isFavorite);
  return <RecipeContext.Provider value={{ recipes, favorites, addRecipe, deleteRecipe, toggleFavorite, getRecipeById }}>{children}</RecipeContext.Provider>;
}
export function useRecipes() { const context = useContext(RecipeContext); if (!context) throw new Error("useRecipes must be used inside RecipeProvider"); return context; }
