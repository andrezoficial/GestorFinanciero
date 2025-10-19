import React, { createContext, useState, useMemo } from "react";

export const FinanzasContext = createContext();

const initialData = {
  ingresos: [
    { name: "Salario", value: 3000.5 },
    { name: "Freelance", value: 800.0 },
    { name: "Inversiones", value: 150.75 },
  ],
  egresos: [
    { name: "Comida", value: 1200.25 },
    { name: "Casa", value: 950.0 },
    { name: "Auto", value: 600.0 },
  ],
};

export const FinanzasProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const [selectedChart, setSelectedChart] = useState("ingresos");

  const balanceTotal = useMemo(() => {
    const totalIngresos = data.ingresos.reduce((acc, el) => acc + el.value, 0);
    const totalEgresos = data.egresos.reduce((acc, el) => acc + el.value, 0);
    return [
      { name: "Ingresos", value: totalIngresos },
      { name: "Egresos", value: totalEgresos },
      { name: "Balance", value: totalIngresos - totalEgresos },
    ];
  }, [data]);

  const value = {
    data,
    selectedChart,
    setSelectedChart,
    balanceTotal,
  };

  return (
    <FinanzasContext.Provider value={value}>
      {children}
    </FinanzasContext.Provider>
  );
};
