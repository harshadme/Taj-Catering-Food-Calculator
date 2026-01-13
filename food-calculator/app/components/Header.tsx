"use client";

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <div style={styles.logo}>🍽️</div>
        <div>
          <div style={styles.brand}>The Biriyani Co.</div>
          <div style={styles.tagline}>Fresh • Halal • Authentic</div>
        </div>
      </div>

      <a href="tel:+919876543210" style={styles.phone}>
        📞 +91 98765 43210
      </a>
    </header>
  );
}

const styles: any = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    background: "#0f172a",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 10
  },
  left: { display: "flex", alignItems: "center", gap: 12 },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: "#22c55e",
    display: "grid",
    placeItems: "center",
    fontSize: 20
  },
  brand: { fontSize: 18, fontWeight: 700 },
  tagline: { fontSize: 12, color: "#cbd5e1" },
  phone: {
    color: "#22c55e",
    fontWeight: 600,
    textDecoration: "none"
  }
};
