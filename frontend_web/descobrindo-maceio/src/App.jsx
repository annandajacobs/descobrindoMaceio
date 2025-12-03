import "./App.css"; 
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import DetailsPage from "./pages/DetailsPage";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";

export default function App() {
  return (
    <AppProvider>
        <BrowserRouter>
          <Header />

          <div className="app-container">
            <Routes>
              {/* Página Inicial */}
              <Route path="/" element={<HomePage />} />

              <Route path="/detalhes/:id" element={<DetailsPage />} />

              {/* Páginas futuras */}
              <Route path="/favoritos" element={<FavoritesPage />} />
              <Route path="/mapa" element={<MapPage />} />
              <Route path="/categorias" element={<p>Categorias</p>} />
              <Route path="/perfil" element={<p>Perfil</p>} />
            </Routes>
          </div>
      </BrowserRouter>
    </AppProvider>
  );
}
