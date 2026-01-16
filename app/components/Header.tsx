"use client";

export default function Header() {
  return (
    <header style={styles.header}>
      <div>
        <h2 style={styles.brand}>Kottakkal Taj Catering</h2>
        <p style={styles.tagline}>Food Ingredient Calculator</p>
      </div>
      <div style={styles.phone}>📞 +91 98765 43210</div>
    </header>
  );
}

const styles: any = {
  header: {
    background: "#0f172a",
    color: "#fff",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: { margin: 0, fontSize: 20 },
  tagline: { margin: 0, fontSize: 12, color: "#cbd5e1" },
  phone: { fontWeight: 600, color: "#22c55e" },
};
