"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Ingredient = {
  name: string;
  qty: number;
  unit: "kg" | "g" | "l";
};

type Dish = {
  id: string;
  name: string;
  baseQty: number;
  price: number;
  ingredients: Ingredient[];
};

export default function SettingsPage() {
  const router = useRouter();

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [baseQty, setBaseQty] = useState(100);
  const [price, setPrice] = useState(0);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("dishes");
    if (stored) setDishes(JSON.parse(stored));
  }, []);

  function saveStorage(updated: Dish[]) {
    localStorage.setItem("dishes", JSON.stringify(updated));
    setDishes(updated);
  }

  function resetForm() {
    setName("");
    setBaseQty(100);
    setPrice(0);
    setIngredients([]);
    setEditingId(null);
  }

  function addIngredient() {
    setIngredients([...ingredients, { name: "", qty: 0, unit: "kg" }]);
  }

  function updateIngredient(
    index: number,
    field: keyof Ingredient,
    value: any
  ) {
    const copy = [...ingredients];
    copy[index] = { ...copy[index], [field]: value };
    setIngredients(copy);
  }

  function removeIngredient(index: number) {
    const copy = [...ingredients];
    copy.splice(index, 1);
    setIngredients(copy);
  }

  function saveDish() {
    if (!name || baseQty <= 0 || price <= 0) return;

    if (editingId) {
      const updated = dishes.map((d) =>
        d.id === editingId
          ? { ...d, name, baseQty, price, ingredients }
          : d
      );
      saveStorage(updated);
    } else {
      const newDish: Dish = {
        id: Date.now().toString(),
        name,
        baseQty,
        price,
        ingredients,
      };
      saveStorage([...dishes, newDish]);
    }

    resetForm();
  }

  function editDish(dish: Dish) {
    setEditingId(dish.id);
    setName(dish.name);
    setBaseQty(dish.baseQty);
    setPrice(dish.price);
    setIngredients(dish.ingredients);
  }

  function deleteDish(id: string) {
    saveStorage(dishes.filter((d) => d.id !== id));
    if (editingId === id) resetForm();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#e5e7eb",
        padding: 30,
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>⚙️ Dish Settings</h1>
        <button onClick={() => router.push("/")}>← Back</button>
      </div>

      {/* ADD / EDIT DISH */}
      <section
        style={{
          marginTop: 30,
          padding: 24,
          border: "1px solid #1f2937",
          borderRadius: 12,
        }}
      >
        <h2>{editingId ? "Edit Dish" : "Add New Dish"}</h2>

        <div style={{ marginTop: 16 }}>
          <label>Dish Name</label>
          <input
            style={{ display: "block", width: "100%", marginTop: 4 }}
            placeholder="e.g. Mutton Biriyani"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
          <div style={{ flex: 1 }}>
            <label>Base Quantity (kg)</label>
            <input
              type="number"
              style={{ display: "block", width: "100%", marginTop: 4 }}
              value={baseQty}
              onChange={(e) => setBaseQty(Number(e.target.value))}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label>Price per kg (₹)</label>
            <input
              type="number"
              style={{ display: "block", width: "100%", marginTop: 4 }}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>

        {/* INGREDIENTS */}
        <h3 style={{ marginTop: 30 }}>
          Ingredients (for base quantity)
        </h3>

        {ingredients.map((ing, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <input
              placeholder="Ingredient name"
              value={ing.name}
              onChange={(e) =>
                updateIngredient(i, "name", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Quantity"
              value={ing.qty}
              onChange={(e) =>
                updateIngredient(i, "qty", Number(e.target.value))
              }
            />
            <select
              value={ing.unit}
              onChange={(e) =>
                updateIngredient(i, "unit", e.target.value)
              }
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="l">l</option>
            </select>
            <button onClick={() => removeIngredient(i)}>✕</button>
          </div>
        ))}

        <button onClick={addIngredient} style={{ marginTop: 14 }}>
          + Add Ingredient
        </button>

        <br />

        <button onClick={saveDish} style={{ marginTop: 20 }}>
          {editingId ? "Update Dish" : "Save Dish"}
        </button>
      </section>

      {/* AVAILABLE DISHES */}
      <section style={{ marginTop: 40 }}>
        <h2>Available Dishes</h2>

        {dishes.map((dish) => (
          <div
            key={dish.id}
            style={{
              marginTop: 12,
              padding: 16,
              border: "1px solid #1f2937",
              borderRadius: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong>{dish.name}</strong>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>
                Base: {dish.baseQty} kg | ₹{dish.price}/kg
              </div>
            </div>

            <div>
              <button onClick={() => editDish(dish)}>Edit</button>
              <button
                onClick={() => deleteDish(dish.id)}
                style={{ marginLeft: 8 }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
