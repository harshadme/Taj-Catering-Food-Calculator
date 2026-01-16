"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Dish = {
  id: string;
  name: string;
  baseQty: number;
  price: number;
  ingredients: any[];
};

export default function QuantityPage() {
  const router = useRouter();

  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);
  const [quantities, setQuantities] =
    useState<Record<string, number>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedIds = localStorage.getItem("selectedDishIds");
    const storedDishes = localStorage.getItem("dishes");

    if (!storedIds || !storedDishes) {
      router.push("/");
      return;
    }

    const ids: string[] = JSON.parse(storedIds);
    const allDishes: Dish[] = JSON.parse(storedDishes);

    const selected = allDishes.filter((d) =>
      ids.includes(d.id)
    );

    const initialQty: Record<string, number> = {};
    selected.forEach((d) => (initialQty[d.id] = 0));

    setSelectedDishes(selected);
    setQuantities(initialQty);
  }, [router]);

  function proceed() {
    localStorage.setItem(
      "dishQuantities",
      JSON.stringify(quantities)
    );
    router.push("/ingredients");
  }

  return (
    <main style={{ padding: 30 }}>
      <h1>Enter Quantity (kg)</h1>

      {selectedDishes.map((dish) => (
        <div key={dish.id} style={{ marginBottom: 16 }}>
          <strong>{dish.name}</strong>
          <input
            type="number"
            min={0}
            value={quantities[dish.id] ?? 0}
            onChange={(e) =>
              setQuantities({
                ...quantities,
                [dish.id]: Number(e.target.value),
              })
            }
            style={{ marginLeft: 10 }}
          />
        </div>
      ))}

      <button
        onClick={proceed}
        style={{ marginTop: 20 }}
      >
        Calculate Ingredients
      </button>
    </main>
  );
}
