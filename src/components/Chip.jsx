export default function Chip({ children, color, soft, style }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px",
      borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: ".01em",
      color: color || "var(--accent-ink)", background: soft || "var(--accent-soft)",
      ...style,
    }}>{children}</span>
  );
}
