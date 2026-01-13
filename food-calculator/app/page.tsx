"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import { DEFAULT_DISHES } from "./data/defaultDishes";

export default function Home() {
  const router = useRouter();
  const [dishes, setDishes] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem("dishes");
    if (saved) {
      setDishes(JSON.parse(saved));
    } else {
      localStorage.setItem("dishes", JSON.stringify(DEFAULT_DISHES));
      setDishes(DEFAULT_DISHES);
    }
  }, []);

  function toggleDish(name: string) {
    setSelected(
      selected.includes(name)
        ? selected.filter(d => d !== name)
        : [...selected, name]
    );
  }

  function calculate() {
    router.push(
      `/ingredients?data=${encodeURIComponent(
        JSON.stringify({ selected, quantities })
      )}`
    );
  }

  return (
    <>
      <Header />

      <main style={styles.main}>
        <div style={styles.topBar}>
          <h2>Menu</h2>
          <button onClick={() => router.push("/settings")}>
            ⚙️ Settings
          </button>
        </div>

        {dishes.map(d => (
          <div key={d.name} style={styles.card}>
            <input
              type="checkbox"
              checked={selected.includes(d.name)}
              onChange={() => toggleDish(d.name)}
            />
            <strong style={{ marginLeft: 8 }}>{d.name}</strong>

            {selected.includes(d.name) && (
              <input
                type="number"
                placeholder="Qty"
                style={styles.qty}
                onChange={e =>
                  setQuantities({
                    ...quantities,
                    [d.name]: Number(e.target.value)
                  })
                }
              />
            )}
          </div>
        ))}

        {selected.length > 0 && (
          <button style={styles.cta} onClick={calculate}>
            Manifest Recipe
          </button>
        )}
      </main>
    </>
  );
}

const styles: any = {
  main: {
    padding: 24,
    background: "#f8fafc",
    minHeight: "100vh"
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  card: {
    background: "#fff",
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
    display: "flex",
    alignItems: "center"
  },
  qty: {
    marginLeft: "auto",
    width: 80
  },
  cta: {
    marginTop: 24,
    padding: 14,
    width: "100%",
    background: "#22c55e",
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    cursor: "pointer"
  }
};
