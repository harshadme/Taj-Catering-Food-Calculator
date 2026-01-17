"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { Dish, Ingredient } from "./types";

export default function HomePage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: dishesData } = await supabase
      .from("dishes")
      .select("*");

    const { data: ingredientsData } = await supabase
      .from("ingredients")
      .select("*");

    setDishes(dishesData || []);
    setIngredients(ingredientsData || []);
  }

  function updateLocalIngredient(
    id: string,
    field: "qty" | "unit",
    value: string
  ) {
    setIngredients((prev) =>
      prev.map((ing) =>
        ing.id === id
          ? { ...ing, [field]: field === "qty" ? Number(value) : value }
          : ing
      )
    );
  }

  async function saveIngredient(ingredient: Ingredient) {
    setLoading(true);

    const { error } = await supabase
      .from("ingredients")
      .update({
        qty: ingredient.qty,
        unit: ingredient.unit,
      })
      .eq("id", ingredient.id);

    setLoading(false);

    if (error) {
      alert("Failed to save");
      console.error(error);
    } else {
      alert("Saved successfully");
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Taj Catering – Ingredient Editor</h1>

      {dishes.map((dish) => (
        <div key={dish.id} style={{ marginTop: 30 }}>
          <h2>{dish.name}</h2>

          <table
            border={1}
            cellPadding={8}
            style={{ width: "100%", marginTop: 10 }}
          >
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {ingredients
                .filter((i) => i.dish_id === dish.id)
                .map((ing) => (
                  <tr key={ing.id}>
                    <td>{ing.name}</td>

                    <td>
                      <input
                        type="number"
                        value={ing.qty}
                        onChange={(e) =>
                          updateLocalIngredient(
                            ing.id,
                            "qty",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <select
                        value={ing.unit}
                        onChange={(e) =>
                          updateLocalIngredient(
                            ing.id,
                            "unit",
                            e.target.value
                          )
                        }
                      >
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="l">l</option>
                      </select>
                    </td>

                    <td>
                      <button
                        onClick={() => saveIngredient(ing)}
                        disabled={loading}
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </main>
  );
}
