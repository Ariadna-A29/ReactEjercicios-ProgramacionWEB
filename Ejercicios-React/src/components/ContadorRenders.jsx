import { useRef, useState } from "react";

function ContadorRenders() {
  const [clicks, setClicks] = useState(0);

  const renders = useRef(0);

  renders.current++;

  return (
    <div>
      <h2>Ejercicio 2</h2>

      <p>Clicks: {clicks}</p>
      <p>Renders: {renders.current}</p>

      <button onClick={() => setClicks(clicks + 1)}>
        Hacer click
      </button>
    </div>
  );
}

export default ContadorRenders;