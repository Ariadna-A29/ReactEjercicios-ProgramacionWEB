import { useState, useEffect } from "react";

export function useFetch(url) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function traerDatos() {
      try {
        setCargando(true);
        setError(null);

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const resultado = await respuesta.json();
        setDatos(resultado);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    traerDatos();
  }, [url]);

  return { datos, cargando, error };
}
