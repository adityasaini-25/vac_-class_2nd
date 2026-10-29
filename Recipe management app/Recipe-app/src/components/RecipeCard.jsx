import { Link } from "react-router-dom";

function RecipeCard({ recipe, onToggleFavorite }) {
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : String(recipe.ingredients || "").split(",").filter(Boolean);
  return <article className="recipe-card">
    <div className="recipe-card-media">
      <Link to={`/recipe/${recipe.id}`} aria-label={`View ${recipe.title}`}><img className="recipe-card-image" src={recipe.image || "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85"} alt={recipe.title || "Recipe"} /></Link>
      <span className="category-pill">{recipe.category || "Homemade"}</span>
      <button className="favorite-button" type="button" onClick={() => onToggleFavorite(recipe.id)} aria-label={recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}>{recipe.isFavorite ? "♥" : "♡"}</button>
    </div>
    <div className="recipe-card-content">
      <div className="recipe-meta"><span>◷ {recipe.prepTime || recipe.cookingTime || 25} min</span><span>·</span><span>{recipe.difficulty || "Easy"}</span></div>
      <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: "none" }}><h2 className="recipe-card-title">{recipe.title || "Untitled recipe"}</h2></Link>
      <p className="recipe-description">{recipe.description || "A delicious recipe for your table."}</p>
      <div className="recipe-card-bottom"><span>♧ {recipe.servings || 2} servings · {ingredients.length} ingredients</span><Link to={`/recipe/${recipe.id}`}>View recipe ↗</Link></div>
    </div>
  </article>;
}
export default RecipeCard;
