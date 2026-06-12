import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import { SUBJECTS, QUESTIONS } from "../data/data";

export default function SubjectSelect() {
  const navigate = useNavigate();
  return (
    <div className="screen">
      <div className="page-head">
        <button className="back-link" onClick={() => navigate("/")}><Icon name="arrowLeft" size={16} /> Home</button>
        <h1 className="page-title">Practice Mode</h1>
        <p className="page-lead">Choose a subject. We pull real questions from previous-year papers and quiz you one at a time — check your answer and read the explanation before moving on.</p>
      </div>
      <div className="psubj-grid">
        {SUBJECTS.map((s) => (
          <button key={s.id} className="psubj-card" onClick={() => navigate(`/practice/${s.id}`)}
            style={{ "--c": s.color, "--soft": s.soft }}>
            <div className="psubj-ic"><Icon name={s.icon} size={28} /></div>
            <div className="psubj-name">{s.short}</div>
            <div className="psubj-full">{s.name}</div>
            <div className="psubj-foot">
              <span className="psubj-count">{QUESTIONS[s.id].length} PYQs ready</span>
              <span className="psubj-go">Start <Icon name="arrowRight" size={16} /></span>
            </div>
          </button>
        ))}
      </div>
      <div className="mixed-banner">
        <div className="mixed-ic"><Icon name="spark" size={22} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15.5, color: "var(--ink)" }}>Full mock — all sections mixed</div>
          <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>Random questions across every subject, exam-style.</div>
        </div>
        <button className="btn btn-dark" onClick={() => navigate("/practice/mixed")}><Icon name="bolt" size={16} /> Start mixed set</button>
      </div>
    </div>
  );
}
