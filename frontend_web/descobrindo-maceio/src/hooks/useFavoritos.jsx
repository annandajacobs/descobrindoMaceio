import { useEffect, useState } from "react";
import { getLocais } from "../api/locais.service";

export function useLocais() {
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    getLocais().then(res => setLocais(res.data));
  }, []);

  return locais;
}
