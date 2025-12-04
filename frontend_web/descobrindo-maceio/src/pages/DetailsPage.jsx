/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLocalById } from "../services/locais.service";
import { Heart, ArrowLeft, MapPin, Clock, Phone, ChevronRight } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/details.css";


const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = defaultIcon;

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [local, setLocal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      try {
        const response = await getLocalById(id);
        setLocal(response.data);
      } catch (err) {
        console.error("Erro ao carregar detalhes:", err);
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [id]);

  if (loading) {
    return (
      <div className="details-loading">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (!local) {
    return (
      <div className="details-error">
        <p>Local não encontrado.</p>
        <button onClick={() => navigate(-1)} className="back-btn">
          Voltar
        </button>
      </div>
    );
  }

  const latitude = local?.localizacao?.coordinates?.[1];
  const longitude = local?.localizacao?.coordinates?.[0];
  const hasCoords = latitude !== undefined && longitude !== undefined && !isNaN(latitude) && !isNaN(longitude);
  const carouselImages = local.fotos?.slice(1) || [];

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="details-page">
 
      <div className="hero-image-container">
        <img
          src={local.fotos?.[0]}
          alt={local.nome_lugar}
          className="hero-image"
        />
        

        <div className="hero-overlay"></div>


        <button onClick={() => navigate(-1)} className="floating-btn back-button">
          <ArrowLeft size={20} />
        </button>

        <button onClick={toggleFavorite} className="floating-btn favorite-button">
          <Heart 
            size={20}
            className={isFavorite ? 'filled' : ''}
          />
        </button>

        <div className="hero-title-container">
          <h1 className="hero-title">{local.nome_lugar}</h1>
        </div>
      </div>

      <div className="content-container">

        {carouselImages.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Galeria de Fotos</h2>
              <button className="see-more-btn">
                Ver todas
                <ChevronRight size={18} />
              </button>
            </div>
            
            <div className="photos-carousel">
              {carouselImages.map((img, index) => (
                <div key={index} className="carousel-item">
                  <img
                    src={img}
                    alt={`${local.nome_lugar} - foto ${index + 2}`}
                    className="carousel-image"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="section">
          <h2 className="section-title">Sobre o Local</h2>
          <p className="description-text">{local.descricao}</p>
        </section>

        <section className="section">
          <h2 className="section-title">Localização</h2>
          
          {!hasCoords ? (
            <div className="map-unavailable">
              <MapPin size={48} />
              <p>Coordenadas não disponíveis</p>
            </div>
          ) : (
            <div className="map-container">
              <MapContainer
                center={[latitude, longitude]}
                zoom={15}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[latitude, longitude]}>
                  <Popup>{local.nome_lugar}</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </section>

        <section className="section">
          <h2 className="section-title">Informações Úteis</h2>
          
          <div className="info-card">
            <div className="info-item">
              <div className="info-icon-wrapper">
                <MapPin size={20} />
              </div>
              <div className="info-content">
                <span className="info-label">Endereço</span>
                <span className="info-value">{local.endereco}</span>
              </div>
            </div>

            {local.funcionamento && (
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Clock size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Funcionamento</span>
                  <span className="info-value">{local.funcionamento}</span>
                </div>
              </div>
            )}

            {local.contato && (
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Phone size={20} />
                </div>
                <div className="info-content">
                  <span className="info-label">Contato</span>
                  <span className="info-value">{local.contato}</span>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailsPage;