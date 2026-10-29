import { useState } from "react";

const empty = { title: "", category: "Dinner", difficulty: "Easy", prepTime: "20", servings: "2", image: "", description: "", ingredients: "", instructions: "" };
function RecipeForm({ onAddRecipe }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const clear = () => { setForm(empty); setError(""); };
  const submit = (event) => {
    event.preventDefault();
    const ingredients = form.ingredients.split("\n").map((item) => item.trim()).filter(Boolean);
    const instructions = form.instructions.split("\n").map((item) => item.trim()).filter(Boolean);
    if (!form.title.trim() || !form.description.trim() || !ingredients.length || !instructions.length) { setError("Please complete all required fields before saving."); return; }
    onAddRecipe({ ...form, id: globalThis.crypto?.randomUUID?.() || String(Date.now()), title: form.title.trim(), ingredients, instructions, isFavorite: false });
  };
  const field = (label, name, placeholder, options = {}) => <label className={`form-field${options.full ? " full" : ""}`} key={name}>{label}{options.select ? <select className="form-input" name={name} value={form[name]} onChange={update}>{options.select.map((item) => <option key={item}>{item}</option>)}</select> : options.multiline ? <textarea className="form-input" name={name} value={form[name]} onChange={update} placeholder={placeholder} rows={options.rows || 4} required={options.required} /> : <input className="form-input" name={name} value={form[name]} onChange={update} placeholder={placeholder} type={options.type || "text"} min={options.type === "number" ? "1" : undefined} required={options.required} />}</label>;
  return <form className="form-panel" onSubmit={submit}>
    <div className="form-panel-head"><span className="form-icon">✎</span><div><h2>Recipe details</h2><p>Fields marked with * are required.</p></div></div>
    <div className="form-grid">
      {field("Recipe name *", "title", "e.g. Creamy tomato pasta", { full: true, required: true })}
      {field("Category *", "category", "", { select: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Drinks"] })}
      {field("Difficulty", "difficulty", "", { select: ["Easy", "Medium", "Hard"] })}
      {field("Prep time (minutes)", "prepTime", "20", { type: "number" })}
      {field("Servings", "servings", "2", { type: "number" })}
      {field("Image URL (optional)", "image", "https://example.com/recipe.jpg", { full: true, type: "url" })}
      {field("Short description *", "description", "What makes this recipe special?", { full: true, multiline: true, rows: 3, required: true })}
      {field("Ingredients *", "ingredients", "1 cup milk\n1 egg", { full: true, multiline: true, rows: 4, required: true })}
      {field("Instructions *", "instructions", "Prepare the ingredients.\nMix everything together.\nCook and serve.", { full: true, multiline: true, rows: 5, required: true })}
    </div>
    {error && <p className="form-error" role="alert">{error}</p>}
    <div className="form-actions"><button type="button" className="button-quiet" onClick={clear}>Clear form</button><button type="submit" className="button-primary">Save recipe <span>→</span></button></div>
  </form>;
}
export default RecipeForm;
