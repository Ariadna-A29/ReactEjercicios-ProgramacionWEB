import { useEffect, useState } from "react";

function Ficha({ nombre, rol }) {
  const [favorito, setFavorito] = useState(() => {
    const guardado = localStorage.getItem(`favorito-${nombre}`);

    if (guardado === null) {
      return false;
    }

    return guardado === "true";
  });

  useEffect(() => {
    localStorage.setItem(`favorito-${nombre}`, favorito);
  }, [favorito, nombre]);

  return (
    <div>
      <h2>{nombre}</h2>
      <p>{rol}</p>

      <button onClick={() => setFavorito(!favorito)}>
        {favorito ? "★ Favorito" : "☆ Agregar a favoritos"}
      </button>
    </div>
  );
}

export default Ficha;