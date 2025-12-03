/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLocalById } from "../services/locais.service";
import { Heart, ArrowLeft } from "lucide-react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

// Ícone padrão do Leaflet (correção necessária no React)
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

  if (loading) return <p className="text-center mt-8">Carregando...</p>;
  if (!local) return <p className="text-center mt-8">Local não encontrado.</p>;

  const latitude = local?.localizacao?.coordinates?.[1];
  const longitude = local?.localizacao?.coordinates?.[0];


  const hasCoords =
  latitude !== undefined &&
  longitude !== undefined &&
  !isNaN(latitude) &&
  !isNaN(longitude)

  // Pega as imagens a partir da segunda (índice 1)
  const carouselImages = local.fotos?.slice(1) || [];

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Aqui você pode adicionar lógica para salvar no localStorage ou backend
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* FOTO PRINCIPAL COM BOTÕES */}
      <div className="relative w-full h-96 mb-8 overflow-hidden">
        <img
          src={local.fotos?.slice(0)}
          alt={local.nome_lugar}
          className="w-full h-full object-cover"
        />
        
        {/* Botão Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Botão Favoritar */}
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
          />
        </button>

        {/* Título sobreposto */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
          <h1 className="text-4xl font-bold text-white tracking-wide uppercase">
            {local.nome_lugar}
          </h1>
        </div>
      </div>

      <div className="px-6">
        {/* CARROSSEL DE FOTOS */}
        {carouselImages.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
                Fotos
              </h2>
              <button className="text-blue-600 text-lg font-semibold hover:underline">
                →
              </button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {carouselImages.map((img, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 h-48 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`${local.nome_lugar} - foto ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DETALHES */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide mb-4">
            Detalhes
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            {local.descricao}
          </p>
        </div>

        {/* COMO CHEGAR */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide mb-4">
            Como Chegar
          </h2>

          {!hasCoords ? (
            <p className="text-gray-500">Coordenadas não disponíveis.</p>
          ) : (
            <div className="w-full h-80 rounded-lg shadow-lg overflow-hidden">
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
        </div>

        {/* INFORMAÇÕES */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide mb-4">
            Informações
          </h2>

          <div className="space-y-3">
            <div>
              <span className="font-semibold text-gray-800">Endereço:</span>
              <span className="text-gray-700 ml-2">{local.endereco}</span>
            </div>

            {local.funcionamento && (
              <div>
                <span className="font-semibold text-gray-800">Funcionamento:</span>
                <span className="text-gray-700 ml-2">{local.funcionamento}</span>
              </div>
            )}

            {local.contato && (
              <div>
                <span className="font-semibold text-gray-800">Contato:</span>
                <span className="text-gray-700 ml-2">{local.contato}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;