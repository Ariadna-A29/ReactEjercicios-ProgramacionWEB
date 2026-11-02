import { useState } from "react";
import { useFetch } from "./hooks/useFetch";

function PerfilGitHub() {
  const { datos, cargando, error } = useFetch(
    "https://api.github.com/users/octocat"
  );

  if (cargando) return <p>Cargando perfil...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!datos) return <p>No hay datos disponibles.</p>;

  return (
    <div>
      <img src={datos.avatar_url} alt="Avatar" width="100" />
      <p>Nombre: {datos.name || datos.login}</p>
      <p>Repositorios: {datos.public_repos}</p>
    </div>
  );
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

function useFetch() {
  return (
    <section>
      <h2>Ejercicio 4: useFetch</h2>

      <h3>Perfil de GitHub</h3>
      <PerfilGitHub />

      <h3>Buscador de Pokémon</h3>
      <BuscadorPokemon />
    </section>
  );
}

export default useFetch;