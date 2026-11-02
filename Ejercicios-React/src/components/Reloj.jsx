import { useEffect, useState } from "react";

function Reloj() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      console.log("tic");
      setHora(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  return (
    <div>
      <h2>Reloj</h2>
      <p>{hora.toLocaleTimeString()}</p>
    </div>
  );
}

export default Reloj;