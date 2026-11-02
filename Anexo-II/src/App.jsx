import { useState } from "react";
import { useTareas } from "./hooks/useTareas";

export default function App() {
  const {
    tareas,
    cargando,
    error,
    crear,
    alternar,
    borrar,
    editar,
  } = useTareas();

  async function cambiarTexto(tarea) {
    const nuevoTexto = prompt("Nuevo texto:", tarea.texto);

    if (nuevoTexto === null || !nuevoTexto.trim()) return;

    await editar(tarea, nuevoTexto.trim());
  }

  async function agregar() {
    if (!texto.trim() || guardando) return;

    setGuardando(true);

    const resultado = await crear(texto.trim());

    if (resultado) {
      setTexto("");
    }

    setGuardando(false);
  }

  if (cargando) return <p>Cargando tareas...</p>;

  return (
    <main>
      <h1>Mis tareas</h1>

      {error && <p role="alert">Error: {error}</p>}

      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribí una tarea"
      />

      <button onClick={agregar} disabled={guardando}>
        {guardando ? "Guardando..." : "Agregar"}
      </button>

      {tareas.length === 0 && <p>No hay tareas todavía.</p>}

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <span>
              {tarea.hecha ? "✅" : "⬜"} {tarea.texto}
            </span>

            <button onClick={() => alternar(tarea)}>
              {tarea.hecha ? "Desmarcar" : "Marcar como hecha"}
            </button>

            <button onClick={() => borrar(tarea.id)}>
              Borrar
            </button>

            <button onClick={() => cambiarTexto(tarea)}>
              Editar
            </button>

          </li>
        ))}
      </ul>
    </main>
  );
}
