"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();
  const [dishes, setDishes] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [baseQty, setBaseQty] = useState(10);
  const [ingredients, setIngredients] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("dishes");
    if (stored) setDishes(JSON.parse(stored));
  }, []);

  function saveDish() {
    const updated = [...dishes, { name, baseQty, ingredients }];
    localStorage.setItem("dishes", JSON.stringify(updated));
    router.push("/");
  }

  return (
    <main style={{ padding: 24 }}>
      <h2>Add Dish</h2>

      <input placeholder="Dish Name" onChange={e => setName(e.target.value)} />
      <input
        type="number"
        placeholder="Base Qty"
        value={baseQty}
        onChange={e => setBaseQty(Number(e.target.value))}
      />

      <h3>Ingredients</h3>

      {ingredients.map((ing, i) => (
        <div key={i}>
          <input placeholder="Name" onChange={e => ing.name = e.target.value} />
          <input type="number" placeholder="Qty" onChange={e => ing.qty = +e.target.value} />
          <select onChange={e => ing.unit = e.target.value}>
            <option>g</option>
            <option>kg</option>
            <option>l</option>
          </select>
        </div>
      ))}

      <button onClick={() => setIngredients([...ingredients, {}])}>
        + Add Ingredient
      </button>

      <br /><br />
      <button onClick={saveDish}>Save Dish</button>
    </main>
  );
}
