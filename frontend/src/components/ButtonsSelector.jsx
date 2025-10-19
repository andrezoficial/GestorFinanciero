import React, { useContext } from "react";
import { FinanzasContext } from "../context/FinanzasContext";

export const ButtonsSelector = () => {
  const { setSelectedChart } = useContext(FinanzasContext);

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <button onClick={() => setSelectedChart("ingresos")}>Ingresos</button>
      <button onClick={() => setSelectedChart("egresos")}>Egresos</button>
      <button onClick={() => setSelectedChart("balance")}>Balance</button>
    </div>
  );
};
