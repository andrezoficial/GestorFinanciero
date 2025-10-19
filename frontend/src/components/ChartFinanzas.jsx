import React, { useContext } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FinanzasContext } from "../context/FinanzasContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const ChartFinanzas = () => {
  const { data, selectedChart, balanceTotal } = useContext(FinanzasContext);

  let chartData;
  if (selectedChart === "ingresos") chartData = data.ingresos;
  else if (selectedChart === "egresos") chartData = data.egresos;
  else chartData = balanceTotal;

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
