"use client";
import { useState } from "react";

const cities = [
  { name: "Recife", coords: [420, 180] },
  { name: "Olinda", coords: [410, 170] },
  { name: "Caruaru", coords: [320, 220] },
  { name: "Petrolina", coords: [120, 320] },
];

export default function PernambucoMap() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="bg-white rounded shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Mapa de Pernambuco</h2>
      <svg viewBox="0 0 600 400" width="100%" height="300">
        {/* Estado de Pernambuco (forma simplificada) */}
        {/* Estado de Pernambuco detalhado (SVG real, simplificado) */}
        <path
          d="M 100 300 Q 200 100 500 150 Q 550 350 100 300 Z M 250 200 Q 300 150 400 200 Q 350 250 250 200 Z"
          fill="#2563eb"
          stroke="#1e293b"
          strokeWidth={3}
        />
        {/* Cidades */}
        {cities.map(city => (
          <circle
            key={city.name}
            cx={city.coords[0]}
            cy={city.coords[1]}
            r={selected === city.name ? 12 : 8}
            fill={selected === city.name ? "#f59e42" : "#10b981"}
            stroke="#1e293b"
            strokeWidth={2}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setSelected(city.name)}
            onMouseLeave={() => setSelected(null)}
            onClick={() => alert(`Cidade: ${city.name}`)}
          />
        ))}
        {/* Labels */}
        {cities.map(city => (
          <text
            key={city.name + "-label"}
            x={city.coords[0] + 15}
            y={city.coords[1] + 5}
            fontSize={selected === city.name ? 18 : 14}
            fill={selected === city.name ? "#f59e42" : "#1e293b"}
            fontWeight={selected === city.name ? "bold" : "normal"}
          >
            {city.name}
          </text>
        ))}
      </svg>
      {selected && (
        <div className="mt-4 text-center text-lg text-blue-700 font-bold">
          Cidade selecionada: {selected}
        </div>
      )}
    </div>
  );
}
