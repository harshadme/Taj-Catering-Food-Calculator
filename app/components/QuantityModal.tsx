"use client";

export default function QuantityModal({
  dishes,
  quantities,
  setQuantities,
  onClose,
  onSubmit
}: any) {
  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Batch Quantity</h3>

        {dishes.map((dish: string) => (
          <div key={dish} style={{ marginBottom: 10 }}>
            <strong>{dish}</strong>
            <input
              type="number"
              placeholder="Qty"
              value={quantities[dish] || ""}
              onChange={(e) =>
                setQuantities({
                  ...quantities,
                  [dish]: Number(e.target.value)
                })
              }
              style={{ width: "100%" }}
            />
          </div>
        ))}

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onSubmit} style={{ background: "#e53935", color: "#fff" }}>
            Manifest Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "#fff",
  padding: 20,
  width: 320,
  borderRadius: 8
};
