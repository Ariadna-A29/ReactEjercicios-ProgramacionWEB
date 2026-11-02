import { useEffect, useState } from "react";
import "./App.css";
import { useEffect } from "react";

const URL = "https://api.github.com/users/Ariadna-A29";

function App() {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function traerPerfil() {
      try {
        const respuesta = await fetch(URL);
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}`);
        }
        const perfil = await respuesta.json();
        console.log(perfil);
        setDatos(perfil);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }
    traerPerfil();
  }, []);

  if (cargando) {
  return <p>Cargando...</p>
  }

  if (error) {
    return <p>Error {error}</p>
  }

  return (
    <>
      <h1>Fetching Data</h1>
      <h2>lista usuarios</h2>
      <img
        src={datos.avatar_url}
        alt={`Foto de ${datos.name} || ${datos.login}`}
        width={"150px"}
      />
      <h3>{datos?.name}</h3>
      <p>Repositorios publicos: {datos.public_repos}</p>
    </>
  );
}
export default App;
