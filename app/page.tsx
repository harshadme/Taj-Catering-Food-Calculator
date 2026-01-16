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

export default function Home() {
  const router = useRouter();

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Load dishes from Settings
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("dishes");
    if (stored) {
      setDishes(JSON.parse(stored));
    }
  }, []);

  function toggleDish(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((d) => d !== id)
        : [...prev, id]
    );
  }

  function goNext() {
    localStorage.setItem(
      "selectedDishIds",
      JSON.stringify(selectedIds)
    );
    router.push("/quantity");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#e5e7eb",
        paddingBottom: 100,
      }}
    >
      {/* HEADER */}
      <header
        style={{
          padding: "20px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #1f2937",
        }}
      >
        <h1>🍽️ Taj Catering – Menu</h1>

        <button
          onClick={() => router.push("/settings")}
          style={{
            padding: "8px 16px",
            background: "#111827",
            color: "#e5e7eb",
            border: "1px solid #374151",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          ⚙️ Settings
        </button>
      </header>

      {/* MENU LIST */}
      <section style={{ padding: 30 }}>
        {dishes.length === 0 && (
          <p style={{ color: "#9ca3af" }}>
            No dishes found. Please add dishes in Settings.
          </p>
        )}

        {dishes.map((dish) => (
          <div
            key={dish.id}
            style={{
              padding: 16,
              marginBottom: 14,
              borderRadius: 12,
              background: "#020617",
              border: "1px solid #1f2937",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(dish.id)}
              onChange={() => toggleDish(dish.id)}
            />

            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                {dish.name}
              </div>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>
                ₹ {dish.price} / kg
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* BOTTOM BAR */}
      {selectedIds.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 16,
            background: "#020617",
            borderTop: "1px solid #1f2937",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{selectedIds.length} selected</span>

          <button
            onClick={goNext}
            style={{
              padding: "10px 22px",
              background: "#22c55e",
              color: "#022c22",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Next – Quantity
          </button>
        </div>
      )}
    </main>
  );
}