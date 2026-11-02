
import { useState, useEffect } from "react";

const URL = "http://localhost:3000/tareas";

export function useTareas() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;

    async function crearTareas() {
      try {
        const respuesta = await fetch(URL);

        if (!respuesta.ok) {
          throw new Error("Error al cargar: " + respuesta.status);
        }

        const datos = await respuesta.json();

        if (!cancelado) {
          setTareas(datos);
          setError(null);
        }
      } catch (e) {
        if (!cancelado) setError(e.message);
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    crearTareas();

    return () => {
      cancelado = true;
    };
  }, []);

  // CREAR: agregar la respuesta al array
  async function crear(texto) {
    try {
      const respuesta = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto, hecha: false }),
      });

      if (!respuesta.ok) {
        throw new Error("Error al crear: " + respuesta.status);
      }

      const nueva = await respuesta.json();

      setTareas((anteriores) => [...anteriores, nueva]);
      setError(null);
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    }
  }

  // MODIFICAR: reemplazar el elemento usando map
  async function alternar(tarea) {
    try {
      const respuesta = await fetch(`${URL}/${tarea.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hecha: !tarea.hecha }),
      });

      if (!respuesta.ok) {
        throw new Error("Error al modificar: " + respuesta.status);
      }

      const actualizada = await respuesta.json();

      setTareas((anteriores) =>
        anteriores.map((t) =>
          t.id === actualizada.id ? actualizada : t
        )
      );

      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }

  // BORRAR: quitar el elemento usando filter
  async function borrar(id) {
    try {
      const respuesta = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("Error al borrar: " + respuesta.status);
      }

      setTareas((anteriores) =>
        anteriores.filter((t) => t.id !== id)
      );

      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }

  // EDITAR: cambiar el texto completo de una tarea
  async function editar(tarea, nuevoTexto) {
    try {
      const respuesta = await fetch(`${URL}/${tarea.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto: nuevoTexto,
          hecha: tarea.hecha,
        }),
      });

      if (!respuesta.ok) {
        throw new Error("Error al editar: " + respuesta.status);
      }

      const actualizada = await respuesta.json();

      setTareas((anteriores) =>
        anteriores.map((t) =>
          t.id === actualizada.id ? actualizada : t
        )
      );

      setError(null);
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    }
  }

  return {
    tareas,
    cargando,
    error,
    crear,
    alternar,
    borrar,
    editar,
  };
}
