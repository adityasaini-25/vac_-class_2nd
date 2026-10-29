import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;
  return <header className="site-header"><nav className="nav-inner">
    <Link to="/" className="brand"><span className="brand-fruit">🍑</span><span className="brand-word">recipe<span>book</span></span></Link>
    <div className="nav-links">
      <NavLink to="/recipes" className={linkStyle}>Explore</NavLink>
      <NavLink to="/favorites" className={linkStyle}>Favorites</NavLink>
      <NavLink to="/add" className={({ isActive }) => `nav-cta${isActive ? " active" : ""}`}>＋ Add recipe</NavLink>
    </div>
  </nav></header>;
}

export default Navbar;


