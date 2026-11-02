import useContadorGuardado from "../hooks/useContadorGuardado";

function ContadorDeVisitas() {
  const { contador, sumar } =
    useContadorGuardado("visitas");

  return (
    <div>
      <h2>Visitas</h2>

      <p>{contador}</p>

      <button onClick={sumar}>
        Sumar visita
      </button>
    </div>
  );
}

export default ContadorVisitas;