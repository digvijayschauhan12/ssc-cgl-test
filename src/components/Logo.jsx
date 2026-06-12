export default function Logo({ size = 34 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <div style={{
        width: size, height: size, borderRadius: 10, position: "relative",
        background: "linear-gradient(140deg,#1b2452,#0b1130)",
        display: "grid", placeItems: "center", flexShrink: 0,
        boxShadow: "0 4px 14px -4px rgba(11,17,48,.5)",
      }}>
        <span style={{
          fontFamily: "var(--display)", fontWeight: 800, color: "var(--accent)",
          fontSize: size * 0.5, lineHeight: 1, letterSpacing: "-.02em",
        }}>C</span>
        <span style={{
          position: "absolute", right: -2, top: -2, width: 9, height: 9, borderRadius: 3,
          background: "var(--accent)", boxShadow: "0 0 0 2px var(--bg)",
        }} />
      </div>
      <div style={{ lineHeight: 1.05 }}>
        <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 18, color: "var(--ink)", letterSpacing: "-.02em" }}>
          CGL<span style={{ color: "var(--accent-ink)" }}>Prep</span>
        </div>
        <div style={{ fontSize: 10.5, color: "var(--muted)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>SSC Vault</div>
      </div>
    </div>
  );
}
