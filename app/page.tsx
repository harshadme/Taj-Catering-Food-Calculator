"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { Dish, Ingredient } from "./types";

export default function HomePage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: dishesData } = await supabase
      .from("dishes")
      .select("*");

    const { data: ingredientsData } = await supabase
      .from("ingredients")
      .select("*");

    setDishes(dishesData || []);
    setIngredients(ingredientsData || []);
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Taj Catering – Ingredient Calculator</h1>

      {dishes.map((dish) => (
        <div key={dish.id} style={{ marginTop: 20 }}>
          <h2>{dish.name}</h2>

          <table border={1} cellPadding={8}>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Qty</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {ingredients
                .filter((i) => i.dish_id === dish.id)
                .map((ing) => (
                  <tr key={ing.id}>
                    <td>{ing.name}</td>
                    <td>{ing.qty}</td>
                    <td>{ing.unit}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </main>
  );
}
