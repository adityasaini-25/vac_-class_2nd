import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Drinks"];
function Home() {
  const { recipes, toggleFavorite } = useRecipes();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const isCollection = useLocation().pathname === "/recipes";
  const filtered = recipes.filter((recipe) => {
    const query = search.toLowerCase();
    const matchesText = `${recipe.title || ""} ${recipe.description || ""} ${(Array.isArray(recipe.ingredients) ? recipe.ingredients : [recipe.ingredients || ""]).join(" ")}`.toLowerCase().includes(query);
    return matchesText && (category === "All" || recipe.category === category);
  });
  const grid = <div className="recipe-grid">{filtered.length ? filtered.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} onToggleFavorite={toggleFavorite} />) : <div className="empty-state"><div className="empty-state-icon">🥗</div><h2>{search ? "No recipes found" : "Your recipe box is waiting"}</h2><p>Try another search or add a recipe you love.</p><Link className="text-link" to="/add">Add a recipe →</Link></div>}</div>;

  if (isCollection) return <main className="collection-page page-width">
    <div className="toolbar"><div><div className="section-kicker">THE RECIPE BOX</div><h1 className="collection-title" style={{ margin: "8px 0 0" }}>Find your next <span className="accent-text">favorite.</span></h1></div><span className="recipe-count">{recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} and counting</span></div>
    <div className="search-categories"><label className="search-box"><span>⌕</span><input aria-label="Search recipes" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search recipes or ingredients..." /></label><div className="category-tabs" aria-label="Filter by category">{categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`category-tab${category === item ? " active" : ""}`}>{item}</button>)}</div></div>
    {grid}
  </main>;

  const featured = recipes.slice(0, 2);
  return <main>
    <section className="home-hero page-width"><div><p className="eyebrow">Your little kitchen companion</p><h1 className="hero-title">Good food.<br/><span className="accent-text">Good mood.</span></h1><p className="hero-copy">Keep your favorite recipes close, discover your next meal, and make every day a little more delicious.</p><div className="hero-actions"><Link to="/recipes" className="button-primary">Explore recipes <span>→</span></Link><Link to="/add" className="button-secondary">＋ Share a recipe</Link></div></div><div className="hero-visual"><span className="sparkle one">✦</span><img className="hero-image" src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85" alt="A colorful bowl of fresh salad"/><span className="sparkle two">✳</span><div className="hero-note">A little something delicious<strong>Made fresh, made with love</strong></div></div></section>
    <section className="home-browse"><div className="page-width"><div className="section-head"><div><div className="section-kicker">A LITTLE INSPIRATION</div><h2 className="section-title">Find your next favorite.</h2></div><Link to="/recipes" className="text-link">Explore all recipes →</Link></div>{featured.length ? <div className="recipe-grid">{featured.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} onToggleFavorite={toggleFavorite}/>)}</div> : <div className="empty-state"><div className="empty-state-icon">🍑</div><h2>Your recipe box is waiting</h2><p>Save something delicious for another day.</p><Link className="text-link" to="/add">Add your first recipe →</Link></div>}</div></section>
  </main>;
}
export default Home;
