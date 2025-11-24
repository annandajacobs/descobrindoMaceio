import "./Header.css";
import { Link } from "react-router-dom";
import { Menu, Heart, MapPin, User } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <Link to="/" className="logo">
          Descobrindo Maceió
        </Link>

        {/* Menu Desktop */}
        <nav className="nav-desktop">
          <Link to="/">Início</Link>
          <Link to="/categorias">Categorias</Link>
          <Link to="/mapa">Mapa</Link>
        </nav>

        {/* Ícones */}
        <div className="nav-icons">
          <Link to="/favoritos">
            <Heart />
          </Link>
          <Link to="/mapa">
            <MapPin />
          </Link>
          <Link to="/perfil">
            <User />
          </Link>
        </div>

        {/* Ícone Mobile */}
        <button className="menu-mobile">
          <Menu />
        </button>

      </div>
    </header>
  );
}
