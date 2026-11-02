https://jsonplaceholder.typicode.com/users

fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(response => console.log(response))
  .catch (error => console.log(error));

async function traerUsuarios() {
  try {
    const usuarios = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!usuarios.ok) {
      throw new Error("Error HTTP", usuarios.status);
    }
    const listaUsuarios = await usuarios.json();
    console.log(listaUsuarios);
  } catch (error) {
    console.log(error);
  }
}

traerUsuarios();
