"use client";

import { useSearchParams } from "next/navigation";

export default function IngredientsPage() {
  const params = useSearchParams();
  const raw = params.get("data");
  if (!raw) return null;

  const { selected, quantities } = JSON.parse(raw);
  const dishes = JSON.parse(localStorage.getItem("dishes") || "[]");
  const result: any = {};

  selected.forEach((name: string) => {
    const dish = dishes.find((d: any) => d.name === name);
    if (!dish) return;

    const factor = quantities[name] / dish.baseQty;

    dish.ingredients.forEach((ing: any) => {
      if (!result[ing.name]) result[ing.name] = { qty: 0, unit: ing.unit };
      result[ing.name].qty += ing.qty * factor;
    });
  });

  return (
    <main style={{ padding: 24 }}>
      <h2>Ingredients</h2>
      <ul>
        {Object.entries(result).map(([k, v]: any) => (
          <li key={k}>{k}: {v.qty.toFixed(2)} {v.unit}</li>
        ))}
      </ul>
      <button onClick={() => window.print()}>Print</button>
    </main>
  );
}
