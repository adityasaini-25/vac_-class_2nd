import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { RecipeProvider } from "./context/RecipeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import "./App.css";
function NotFound() { return <main className="empty-state page-width" style={{ margin: "80px auto" }}><div className="empty-state-icon">🍽️</div><h2>Recipe not found</h2><p>This page is missing from your cookbook.</p><Link className="text-link" to="/">Back to home →</Link></main>; }
function App() { return <RecipeProvider><BrowserRouter><div className="app-shell"><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="/recipes" element={<Home/>}/><Route path="/favorites" element={<Favorites/>}/><Route path="/add" element={<AddRecipe/>}/><Route path="/recipe/:id" element={<RecipeDetails/>}/><Route path="*" element={<NotFound/>}/></Routes><footer className="footer"><span className="footer-brand">🍑 RecipeBook</span><span>Made with love, one recipe at a time.</span></footer></div></BrowserRouter></RecipeProvider>; }
export default App;
