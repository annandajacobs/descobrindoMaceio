import React from 'react';
import { Heart, Search, Sparkles } from 'lucide-react';
import { useApp } from "../hooks/useApp";
import { useDestinations } from '../hooks/useDestination';
import DestinationCard from '../components/common/DestinosCard';
import { useNavigate } from "react-router-dom";
import "../styles/favorites.css";
import PageTitle from '../components/common/PageTitle';

const FavoritesPage = () => {
  const { favorites, setCurrentPage, setSelectedDestination } = useApp();
  const { destinations } = useDestinations();
  const navigate = useNavigate();

  const allDestinations = [
    ...destinations.praias,
    ...destinations.cultura,
    ...destinations.lazer
  ];

  const favoriteDestinations = allDestinations.filter(d => 
    favorites.includes(d.id)
  );

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    setCurrentPage('details');
  };

  return (
    <div className="favorites-page">
      <PageTitle title="Meus Favoritos" icon={Heart} />

      {favoriteDestinations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon-wrapper">
            <Heart size={80} className="empty-icon" />
            <Sparkles size={32} className="sparkle-icon" />
          </div>
          <h2 className="empty-title">
            Nenhum favorito ainda
          </h2>
          <p className="empty-description">
            Comece a explorar Maceió e salve seus lugares favoritos para visitá-los depois!
          </p>
          <button
            onClick={() => navigate("/")}
            className="explore-btn"
          >
            <Sparkles size={20} />
            Explorar Lugares
          </button>
        </div>
      ) : (
        <>

          <div className="stats-card">
            <div className="stats-content">
              <Heart className="stats-icon" size={24} />
              <p className="stats-text">
                Você tem <span className="stats-number">{favoriteDestinations.length}</span> {favoriteDestinations.length === 1 ? 'lugar favorito' : 'lugares favoritos'}
              </p>
            </div>
          </div>

          <div className="favorites-grid">
            {favoriteDestinations.map(destination => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onClick={handleDestinationClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;