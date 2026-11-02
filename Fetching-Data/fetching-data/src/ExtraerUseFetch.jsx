import { useState } from "react";
import { useFetch } from "./hooks/useFetch";

function traerUsuarios() {

}

function BuscadorPokemon() {
  const [nombre, setNombre] = useState("pikachu");
  const [busqueda, setBusqueda] = useState("pikachu");

  const { datos, cargando, error } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(
      busqueda
    )}`
  );

  function buscar() {
    const limpio = nombre.trim().toLowerCase();

    if (limpio) {
      setBusqueda(limpio);
    }
  }

  return (
    <div>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del Pokémon"
      />

      <button onClick={buscar}>Buscar</button>

      {cargando && <p>Cargando Pokémon...</p>}
      {error && <p>Error: {error}</p>}

      {datos && !cargando && !error && (
        <div>
          <h3>{datos.name}</h3>

          <img
            src={datos.sprites.front_default}
            alt={datos.name}
            width="120"
          />

          <p>
            Tipo:{" "}
            {datos.types
              .map((item) => item.type.name)
              .join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

function ExtraerUseFetch() {
  return (
    <section>
      <h2>Ejercicio 4: useFetch</h2>

      <h3>Buscador de Pokémon</h3>
      <BuscadorPokemon />
    </section>
  );
}

export default ExtraerUseFetch;
