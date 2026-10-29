import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipeById, deleteRecipe, toggleFavorite } = useRecipes();

  const recipe = getRecipeById(id);

  if (!recipe) {
    return (
      <main style={{
        minHeight: "80vh",
        background: "#fbf8f2",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "25px",
        textAlign: "center",
        color: "#354b44",
      }}>
        <div style={{ fontSize: "50px" }}>🍽️</div>
        <h1 style={{ fontFamily: "Georgia, serif" }}>Recipe not found</h1>
        <p style={{ color: "#81776d" }}>
          This recipe may have been deleted.
        </p>
        <Link to="/" style={{ color: "#bd745c" }}>
          ← Back to recipes
        </Link>
      </main>
    );
  }

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : String(recipe.ingredients || "").split(",").filter(Boolean);

  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : String(recipe.instructions || "").split("\n").filter(Boolean);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(recipe.id);
      navigate("/");
    }
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#fbf8f2",
      color: "#354b44",
      padding: "35px 7% 70px",
    }}>
      <Link to="/" style={{
        color: "#bd745c",
        textDecoration: "none",
        fontWeight: 600,
      }}>
        ← Back to recipes
      </Link>

      <div style={{
        maxWidth: "1000px",
        margin: "30px auto 0",
        background: "#fffdf9",
        border: "1px solid #eee7dd",
        borderRadius: "24px",
        overflow: "hidden",
      }}>
        <img
          src={recipe.image || "https://placehold.co/1000x500?text=Recipe"}
          alt={recipe.title}
          style={{
            width: "100%",
            height: "clamp(240px, 45vw, 430px)",
            objectFit: "cover",
            display: "block",
          }}
        />

        <div style={{ padding: "clamp(22px, 5vw, 45px)" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}>
            <span style={{
              background: "#f4e5d8",
              color: "#a7654e",
              padding: "8px 13px",
              borderRadius: "20px",
              fontSize: "13px",
            }}>
              {recipe.category || "Homemade"}
            </span>

            <button
              onClick={() => toggleFavorite(recipe.id)}
              style={{
                border: "1px solid #eee0d5",
                background: "#fff8f2",
                color: "#bd745c",
                padding: "10px 15px",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {recipe.isFavorite ? "♥ Saved" : "♡ Add to favorites"}
            </button>
          </div>

          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(34px, 5vw, 50px)",
            lineHeight: 1.2,
            fontWeight: 500,
            margin: "22px 0 15px",
          }}>
            {recipe.title}
          </h1>

          <p style={{
            color: "#81776d",
            lineHeight: 1.9,
            fontSize: "16px",
          }}>
            {recipe.description || "A delicious recipe to enjoy at home."}
          </p>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            margin: "25px 0 35px",
          }}>
            {[
              ["◷", `${recipe.prepTime || recipe.cookingTime || 30} min prep`],
              ["♨", `${recipe.cookingTime || 30} min cooking`],
              ["♧", `${recipe.servings || 2} servings`],
              ["✦", recipe.difficulty || "Easy"],
            ].map(([icon, label]) => (
              <div key={label} style={{
                background: "#f8f2e9",
                borderRadius: "12px",
                padding: "13px 15px",
                fontSize: "14px",
              }}>
                <span style={{ color: "#bd745c" }}>{icon} </span>
                {label}
              </div>
            ))}
          </div>

          <section style={{
            borderTop: "1px solid #eee7dd",
            paddingTop: "28px",
          }}>
            <h2 style={{
              fontFamily: "Georgia, serif",
              fontSize: "29px",
              fontWeight: 500,
            }}>
              Ingredients
            </h2>

            {ingredients.length ? (
              ingredients.map((item, index) => (
                <div key={index} style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  padding: "13px 0",
                  borderBottom: "1px solid #f0e9e0",
                  color: "#665f57",
                }}>
                  <span style={{ color: "#bd745c" }}>○</span>
                  {item}
                </div>
              ))
            ) : (
              <p style={{ color: "#81776d" }}>No ingredients added.</p>
            )}
          </section>

          <section style={{ marginTop: "35px" }}>
            <h2 style={{
              fontFamily: "Georgia, serif",
              fontSize: "29px",
              fontWeight: 500,
            }}>
              Cooking Instructions
            </h2>

            {instructions.length ? (
              instructions.map((step, index) => (
                <div key={index} style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  margin: "22px 0",
                }}>
                  <span style={{
                    minWidth: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: "#f4e5d8",
                    color: "#a7654e",
                    fontWeight: 700,
                  }}>
                    {index + 1}
                  </span>

                  <p style={{
                    margin: "5px 0 0",
                    color: "#665f57",
                    lineHeight: 1.8,
                  }}>
                    {step}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ color: "#81776d" }}>
                No instructions added.
              </p>
            )}
          </section>

          <button
            onClick={handleDelete}
            style={{
              marginTop: "25px",
              border: "1px solid #e7c9bf",
              borderRadius: "12px",
              background: "#fff7f3",
              color: "#b84d39",
              padding: "13px 18px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Delete Recipe
          </button>
        </div>
      </div>
    </main>
  );
}

export default RecipeDetails;