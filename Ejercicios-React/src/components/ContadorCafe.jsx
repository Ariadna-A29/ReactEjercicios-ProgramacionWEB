import useContadorGuardado from "../hooks/useContadorGuardado";

function ContadorDeCafes() {
  const { contador, sumar } =
    useContadorGuardado("cafes");

  return (
    <div>
      <h2>Cafés</h2>

      <p>{contador}</p>

      <button onClick={sumar}>
        Sumar café
      </button>
    </div>
  );
}

export default ContadorCafe;