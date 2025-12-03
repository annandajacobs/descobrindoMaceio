import { useEffect, useState } from "react";
import MapContainer from "../components/map/MapaContainer";
import CategoryTabs from "../components/map/CategoryTabs";
import { getAllPlaces } from "../services/place.service";
import { calcularDistanciaKm, calcularTempo } from "../services/distance.service";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";

const MapPage = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [category, setCategory] = useState("praia");
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const categoryMap = {
    praia: "praia",
    cultura: "cultura",
    lazer: "lazer",
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await getAllPlaces();
        setPlaces(response);

        setFilteredPlaces(
          response.filter((p) => p.nome_categoria === categoryMap[category])
        );
      } catch (err) {
        console.error("Erro ao buscar lugares:", err);
      }
    };

    fetchPlaces();
  }, []);

  // 2) Solicitar localização do usuário
  useEffect(() => {
    if (!navigator.geolocation) {
    console.warn("Geolocalização não suportada");

    // Coloque o setState dentro de um microtask assíncrono
    Promise.resolve().then(() => setLoading(false));

    return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        console.error("Erro ao obter localização:", err);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // 3) Quando mudar a categoria → filtra lista
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setFilteredPlaces(
      places.filter((p) => p.nome_categoria === categoryMap[cat])
    );
  };

  // 4) Enriquecer locais com distância e tempo usando seu distance.service
  const placesWithDistance = filteredPlaces.map((place) => {
    if (!userLocation) return { ...place, distanceKm: null, tempoMin: null };

    const distanciaKm = calcularDistanciaKm(
      { lat: userLocation.lat, lng: userLocation.lng },
      place.localizacao.coordinates
    );

    const tempoMin = calcularTempo(distanciaKm);

    return {
      ...place,
      distanceKm: distanciaKm,
      tempoMin: tempoMin,
    };
  });

  return (
    <div className="map-page">
      {/* Título como na imagem */}
      <h1 className="map-title">Mapa</h1>

      {/* Tabs: Praia / Cultura / Lazer */}
      <CategoryTabs
        selected={category}
        onSelect={handleCategoryChange}
      />

      {/* Mapa */}
      <MapContainer
        places={placesWithDistance}
        userLocation={userLocation}
        loading={loading}
      />

      {/* Lista de Cards de Distância */}
        <div className="places-list">
        {placesWithDistance.map((place) => (
            <div key={place._id} className="place-card">
            <h3 className="place-card-title">{place.nome_local}</h3>

            <p className="place-card-info place-card-distance">
                Distância: {place.distanceKm?.toFixed(2)} km
            </p>

            <p className="place-card-info place-card-time">
                Tempo estimado: {place.tempoMin} min
            </p>
            </div>
        ))}
        </div>
    </div>
  );
};

export default MapPage;
