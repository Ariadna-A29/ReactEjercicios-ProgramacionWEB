const URL = 'http://localhost:3000/tareas'

async function crearTareas(texto) {
  const respuesta = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: ({
      texto: texto,
      hecha: false,
    }),
  });
  const tareaCreada = await respuesta.json()
    console.log("tarea creada:", tareaCreada);
  return tareaCreada;
}

//crearTareas("Aprender Fetching Data");

async function marcaHecho() {
  const respuesta = await fetch(`${URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({

      hecha: true,
    }),
  });
  const tareaMarcada = await respuesta.json()
    console.log("tarea marcada:", tareaMarcada);
  return tareaMarcada;
}

//marcaHecho("q5bGn7uLAvc");

async function borrarTarea(id) {
  const respuesta = await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });

  if (!respuesta.ok) {
    throw new Error(`Error al borrar la tarea: ${respuesta.status}`);
  }
  console.log("Tarea elimiada:", id);
}

//borrarTarea("qgpaO6ANBvk");

async function actualizarTareas(id, texto, hecha) {
  const respuesta = await fetch(`${URL}/${id}`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      hecha: hecha,
    }),
  });

  if (!respuesta.ok) {
    throw new Error(`Error al actualizar: ${respuesta.status}`);
  }

  const tareaActualizada = await respuesta.json();
  console.log("tarea modificada:", tareaActualizada);
  return tareaActualizada;
}
//actualizarTareas("Q2HlcbCH3Ik", "Finalizado", true)
