
import { useState, useEffect } from "react";

const URL = "http://localhost:3000/notas";

export default function Notas() {
  const [notas, setNotas] = useState([]);
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // LEER las notas existentes
  useEffect(() => {
    let cancelado = false;

    async function cargarNotas() {
      try {
        const respuesta = await fetch(URL);

        if (!respuesta.ok) {
          throw new Error("Error al cargar: " + respuesta.status);
        }

        const datos = await respuesta.json();

        if (!cancelado) setNotas(datos);
      } catch (e) {
        if (!cancelado) setError(e.message);
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    cargarNotas();

    return () => {
      cancelado = true;
    };
  }, []);

  // CREAR una nota cuando el usuario la agrega
  async function agregar() {
    if (!texto.trim()) {
      setError("Escribí una nota.");
      return;
    }

    try {
      const respuesta = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: texto.trim() }),
      });

      if (!respuesta.ok) {
        throw new Error("Error al crear: " + respuesta.status);
      }

      const nueva = await respuesta.json();

      setNotas((anteriores) => [...anteriores, nueva]);
      setTexto("");
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }

  // BORRAR una nota
  async function borrar(id) {
    try {
      const respuesta = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("Error al borrar: " + respuesta.status);
      }

      // No necesitamos respuesta.json() para borrar
      setNotas((anteriores) =>
        anteriores.filter((nota) => nota.id !== id)
      );

      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }

  if (cargando) return <p>Cargando notas...</p>;

  return (
    <main>
      <h1>Mis notas</h1>

      {error && <p role="alert">{error}</p>}

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribí una nota"
      />

      <button onClick={agregar}>Agregar nota</button>

      {notas.length === 0 && <p>No hay notas.</p>}

      <ul>
        {notas.map((nota) => (
          <li key={nota.id}>
            {nota.texto}
            <button onClick={() => borrar(nota.id)}>
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
