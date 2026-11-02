import { useFetch } from "./hooks/useFetch";

function App() {
  const {
    datos: usuarios,
    cargando,
    error
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (cargando) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      <h1>Lista de usuarios</h1>

      {usuarios.map((usuario) => (
        <article key={usuario.id}>
          <h2>{usuario.name}</h2>
          <p>Usuario: {usuario.username}</p>
          <p>Email: {usuario.email}</p>
          <p>Ciudad: {usuario.address.city}</p>
        </article>
      ))}
    </main>
  );
}

export default App;
