import { useState } from "react";

function BuscadorDePokemon() {
  const [nombre, setNombre] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  async function buscarPokemon() {
    const nombreBuscado = nombre.trim().toLowerCase();

    if (!nombreBuscado) {
      setError("Escribí el nombre de un Pokémon.");
      setPokemon(null);
      return;
    }

    try {
      setCargando(true);
      setError(null);
      setPokemon(null);

      const respuesta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(
          nombreBuscado
        )}`
      );

      if (!respuesta.ok) {
        throw new Error("No se encontró ese Pokémon.");
      }

      const datos = await respuesta.json();
      setPokemon(datos);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <section>
      <h2>Buscador de Pokémon</h2>

      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") buscarPokemon();
        }}
        placeholder="Ejemplo: pikachu"
      />

      <button onClick={buscarPokemon} disabled={cargando}>
        {cargando ? "Buscando..." : "Buscar"}
      </button>

      {cargando && <p>Cargando Pokémon...</p>}

      {error && <p>{error}</p>}

      {pokemon && (
        <div>
          <h3>{pokemon.name}</h3>

          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width="150"
          />

          <p>
            Tipos:{" "}
            {pokemon.types
              .map((elemento) => elemento.type.name)
              .join(", ")}
          </p>

          <p>Altura: {pokemon.height / 10} m</p>
        </div>
      )}
    </section>
  );
}

export default BuscadorDePokemon;