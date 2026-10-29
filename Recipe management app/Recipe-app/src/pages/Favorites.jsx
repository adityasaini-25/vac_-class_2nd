import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
function Favorites() {
  const { favorites, toggleFavorite } = useRecipes();
  return <main className="favorite-page page-width"><div className="collection-top"><p className="eyebrow">Your personal collection</p><h1 className="collection-title">Recipes to <span className="accent-text">make again.</span></h1><p className="collection-subtitle">The recipes you have saved for another delicious day.</p></div>{favorites.length ? <div className="recipe-grid">{favorites.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} onToggleFavorite={toggleFavorite}/>)}</div> : <div className="empty-state"><div className="empty-state-icon">♡</div><h2>Nothing saved just yet</h2><p>When a recipe steals your heart, save it here.</p><Link className="text-link" to="/recipes">Find a recipe to love →</Link></div>}</main>;
}
export default Favorites;
