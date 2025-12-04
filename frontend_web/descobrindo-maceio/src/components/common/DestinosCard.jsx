import React from 'react';
import { Heart, MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { useNavigate } from "react-router-dom";
import './DestinosCard.css';

const DestinationCard = ({ destino }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const isFavorite = favorites.includes(destino._id);
  
  if (!destino) return null;

  return (
    <div className="destination-card">

      <div 
        className="destination-image-wrapper"
        onClick={() => navigate(`/detalhes/${destino._id}`)}
      >
        <img
          src={destino.fotos}
          alt={destino.nome_local}
          className="destination-image"
        />
        <div className="image-overlay"></div>
        
        <div className="hover-overlay">
          <div className="view-details-btn">
            <span>Ver Detalhes</span>
            <ArrowRight size={18} />
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(destino._id);
        }}
        className="favorite-btn"
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <Heart
          size={20}
          className={isFavorite ? 'favorite-active' : 'favorite-inactive'}
        />
      </button>

      <div className="destination-content">
        <h3 className="destination-title">{destino.nome}</h3>
        <div className="destination-location">
          <MapPin size={16} />
          <span>{destino.nome_local}</span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;