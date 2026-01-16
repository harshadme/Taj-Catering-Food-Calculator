"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Ingredient = {
  name: string;
  qty: number;
  unit: string;
};

type Dish = {
  id: string;
  name: string;
  baseQty: number;
  ingredients: Ingredient[];
};

export default function IngredientsPage() {
  const router = useRouter();
  const [results, setResults] = useState<
    { dish: Dish; finalIngredients: Ingredient[] }[]
  >([]);

  const today = new Date().toLocaleDateString();

  useEffect(() => {
    const qtyRaw = localStorage.getItem("dishQuantities");
    const dishesRaw = localStorage.getItem("dishes");

    if (!qtyRaw || !dishesRaw) {
      router.push("/");
      return;
    }

    const quantities = JSON.parse(qtyRaw);
    const dishes: Dish[] = JSON.parse(dishesRaw);

    const output: any[] = [];

    Object.entries(quantities).forEach(([dishId, enteredQty]) => {
      if (!enteredQty || Number(enteredQty) <= 0) return;

      const dish = dishes.find((d) => d.id === dishId);
      if (!dish) return;

      const factor = Number(enteredQty) / dish.baseQty;

      const calculated = dish.ingredients.map((ing) => ({
        name: ing.name,
        unit: ing.unit,
        qty: Number((ing.qty * factor).toFixed(2)),
      }));

      output.push({ dish, finalIngredients: calculated });
    });

    setResults(output);
  }, [router]);

  return (
    <>
      {/* GLOBAL PRINT + SCREEN STYLES */}
      <style jsx global>{`
        /* SCREEN */
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        th {
          background: #111827;
          color: #e5e7eb;
          border: 1px solid #374151;
          padding: 10px;
          text-align: left;
        }

        td {
          border: 1px solid #374151;
          padding: 10px;
        }

        /* PRINT ONLY */
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }

          th {
            background: #f2f2f2 !important;
            color: #000000 !important;
          }

          td {
            color: #000000 !important;
          }

          .no-print {
            display: none !important;
          }

          @page {
            margin: 20mm;
          }
        }
      `}</style>

      <main style={{ padding: 30 }}>
        {/* HEADER */}
        <div style={{ marginBottom: 30 }}>
          <h1>Taj Catering & Event – Kottakkal</h1>
          <p>📞 9961666674 | 9961666684</p>
          <p>
            <strong>Date:</strong> {today}
          </p>
          <hr />
        </div>

        <h2>Ingredient Calculation</h2>

        {results.map(({ dish, finalIngredients }) => (
          <div key={dish.id} style={{ marginBottom: 40 }}>
            <h3>{dish.name}</h3>

            <table>
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Price / Notes</th>
                </tr>
              </thead>
              <tbody>
                {finalIngredients.map((ing, i) => (
                  <tr key={i}>
                    <td>{ing.name}</td>
                    <td>{ing.qty}</td>
                    <td>{ing.unit}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* BUTTONS – SCREEN ONLY */}
        <div className="no-print">
          <button onClick={() => window.print()}>Print</button>
          <br />
          <br />
          <button onClick={() => router.push("/")}>Back to Menu</button>
        </div>
      </main>
    </>
  );
}
