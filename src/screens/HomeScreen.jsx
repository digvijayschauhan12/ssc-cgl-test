import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import Chip from "../components/Chip";
import { SUBJECTS, QUESTIONS } from "../data/data";

function StatCard({ icon, value, label, accent }) {
  return (
    <div className="stat-card">
      <div className="stat-ic" style={{ color: accent, background: "color-mix(in srgb," + accent + " 12%, transparent)" }}>
        <Icon name={icon} size={20} />
      </div>
      <div>
        <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 22, color: "var(--ink)", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 12.5, color: "var(--muted)", fontWeight: 600, marginTop: 3 }}>{label}</div>
      </div>
    </div>
  );
}

function BigAction({ kicker, title, desc, icon, tint, cta, onClick, art }) {
  return (
    <button className="big-action" onClick={onClick} style={{ "--tint": tint }}>
      <div className="big-action-art">{art}</div>
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%" }}>
        <div className="big-action-ic"><Icon name={icon} size={26} /></div>
        <div style={{ marginTop: "auto" }}>
          <div className="kicker" style={{ color: tint }}>{kicker}</div>
          <h3 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 27, color: "var(--ink)", margin: "6px 0 8px", letterSpacing: "-.02em" }}>{title}</h3>
          <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.5, margin: 0, maxWidth: 340 }}>{desc}</p>
          <span className="big-action-cta" style={{ color: tint }}>{cta} <Icon name="arrowRight" size={17} /></span>
        </div>
      </div>
    </button>
  );
}

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-inner">
          <div className="hero-copy">
            <Chip color="#0b1130" soft="var(--accent)" style={{ marginBottom: 18 }}>
              <Icon name="bolt" size={13} /> SSC CGL 2025 prep, sorted
            </Chip>
            <h1 className="hero-title">
              Every past paper.<br />Every question.<br /><span className="hero-em">One vault.</span>
            </h1>
            <p className="hero-sub">
              Browse previous-year papers tier-wise, date-wise and shift-wise — then turn them into
              endless practice, one question at a time.
            </p>
            <div className="hero-cta-row">
              <button className="btn btn-primary" onClick={() => navigate("/pyq")}>
                <Icon name="papers" size={18} /> Previous papers
              </button>
              <button className="btn btn-dark" onClick={() => navigate("/practice")}>
                <Icon name="target" size={18} /> Start practicing
              </button>
            </div>
          </div>
          <div className="hero-side">
            <div className="streak-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.7)", letterSpacing: ".05em", textTransform: "uppercase" }}>Your streak</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginTop: 6 }}>
                    <span style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 46, color: "#fff", lineHeight: 1 }}>12</span>
                    <span style={{ fontSize: 15, color: "rgba(255,255,255,.7)", fontWeight: 600 }}>days</span>
                  </div>
                </div>
                <div className="flame-badge"><Icon name="flame" size={22} /></div>
              </div>
              <div className="streak-week">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <div key={i} className={"streak-dot" + (i < 5 ? " on" : "")}>{d}</div>
                ))}
              </div>
              <div className="streak-foot">
                <div><b>248</b> questions solved</div>
                <div style={{ color: "var(--accent)" }}><b>71%</b> accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="stats-strip">
        <StatCard icon="papers" value="600+" label="Shift papers archived" accent="#2563eb" />
        <StatCard icon="puzzle" value="18,400" label="PYQ questions" accent="#7c3aed" />
        <StatCard icon="trophy" value="2018–24" label="Years covered" accent="#0d9488" />
        <StatCard icon="clock" value="2 tiers" label="Tier 1 & Tier 2" accent="#e11d48" />
      </section>

      {/* Two big entry points */}
      <section className="block">
        <div className="block-head">
          <h2 className="block-title">Where to next?</h2>
        </div>
        <div className="big-action-grid">
          <BigAction
            kicker="Archive" title="Previous Year Papers" icon="papers" tint="#2563eb"
            desc="Tier 1 & Tier 2, organised by year, exam date and shift. View in-browser or download the PDF."
            cta="Browse the vault" onClick={() => navigate("/pyq")}
            art={<div className="art-papers"><span /><span /><span /></div>} />
          <BigAction
            kicker="Adaptive drills" title="Practice Mode" icon="target" tint="#e11d48"
            desc="Pick a subject. We pull real questions from past papers and quiz you one at a time, with instant explanations."
            cta="Choose a subject" onClick={() => navigate("/practice")}
            art={<div className="art-target"><span /><span /><span /></div>} />
        </div>
      </section>

      {/* Quick practice by subject */}
      <section className="block">
        <div className="block-head">
          <h2 className="block-title">Jump into a subject</h2>
          <button className="link-btn" onClick={() => navigate("/practice")}>All subjects <Icon name="arrowRight" size={15} /></button>
        </div>
        <div className="subj-row">
          {SUBJECTS.map((s) => (
            <button key={s.id} className="subj-card" onClick={() => navigate(`/practice/${s.id}`)}
              style={{ "--c": s.color, "--soft": s.soft }}>
              <div className="subj-ic"><Icon name={s.icon} size={24} /></div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>{s.short}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>{QUESTIONS[s.id].length}+ questions</div>
              </div>
              <Icon name="arrowRight" size={17} style={{ marginLeft: "auto", color: s.color }} />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
