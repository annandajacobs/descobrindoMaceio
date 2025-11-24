import { Heart } from "lucide-react/dist/esm/icons";
import { Link } from "react-router-dom";

export default function DestinationCard({ destino }) {
  return (
    <Link to={`/local/${destino.id}`}>
      <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-[1.02] transition">
        
        {/* IMAGEM */}
        <img 
          src={destino.imagem_url}
          alt={destino.nome}
          className="w-full h-48 object-cover"
        />

        {/* INFORMAÇÕES */}
        <div className="p-3">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{destino.nome}</h3>
            <Heart className="w-5 h-5 text-gray-500 hover:text-red-500" />
          </div>

          <p className="text-sm text-gray-600 mt-1">
            {destino.descricao_curta}
          </p>
        </div>
      </div>
    </Link>
  );
}
