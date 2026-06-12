import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import { SUBJECTS, QUESTIONS } from "../data/data";

const SET_SIZE = 25;

function buildSet(subjectId) {
  let pool;
  if (subjectId === "mixed") {
    pool = Object.keys(QUESTIONS).flatMap((k) => QUESTIONS[k].map((q) => ({ ...q, subj: k })));
  } else {
    pool = QUESTIONS[subjectId].map((q) => ({ ...q, subj: subjectId }));
  }
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  return pool.slice(0, SET_SIZE);
}

export default function PracticeRun() {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [set, setSet] = useState(() => buildSet(subjectId));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState(() => Array(set.length).fill(null));
  const [done, setDone] = useState(false);

  const picked = answers[idx]?.picked ?? null;
  const checked = answers[idx]?.checked ?? false;
  const score = answers.reduce((acc, a, i) => acc + (a?.checked && a.picked === set[i].answer ? 1 : 0), 0);

  const subjOf = (q) => SUBJECTS.find((s) => s.id === q.subj) || SUBJECTS[0];
  const q = set[idx];
  const meta = subjectId === "mixed"
    ? { short: "Mixed Mock", name: "All sections", color: "#0b1130", soft: "#eef1f8", icon: "spark" }
    : SUBJECTS.find((s) => s.id === subjectId);
  const qSubj = subjOf(q);

  const setPicked = (i) => {
    if (checked) return;
    setAnswers((a) => { const next = [...a]; next[idx] = { picked: i, checked: false }; return next; });
  };
  const onCheck = () => {
    if (picked == null || checked) return;
    setAnswers((a) => { const next = [...a]; next[idx] = { ...next[idx], checked: true }; return next; });
  };
  const onNext = () => {
    if (idx + 1 >= set.length) { setDone(true); return; }
    setIdx((i) => i + 1);
  };
  const onBack = () => {
    if (idx === 0) return;
    setIdx((i) => i - 1);
  };

  if (done) {
    const pct = Math.round((score / set.length) * 100);
    const good = pct >= 60;
    return (
      <div className="screen">
        <div className="result-wrap">
          <div className="result-card" style={{ "--c": meta.color }}>
            <div className="result-ring" style={{ background: `conic-gradient(${meta.color} ${pct * 3.6}deg, #eceff5 0deg)` }}>
              <div className="result-ring-in">
                <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 40, color: "var(--ink)", lineHeight: 1 }}>{pct}%</div>
                <div style={{ fontSize: 12.5, color: "var(--muted)", fontWeight: 700 }}>{score}/{set.length} correct</div>
              </div>
            </div>
            <h2 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 26, color: "var(--ink)", margin: "22px 0 6px" }}>
              {good ? "Strong run! 🎯" : "Good effort — keep going"}
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--muted)", margin: "0 0 24px", maxWidth: 360, lineHeight: 1.5 }}>
              You completed the {meta.short} set. Review explanations any time — repetition is how PYQs stick.
            </p>
            <div className="result-actions">
              <button className="btn btn-primary" onClick={() => { setIdx(0); setAnswers(Array(set.length).fill(null)); setDone(false); }}>
                <Icon name="practice" size={17} /> Retry this set
              </button>
              <button className="btn btn-dark" onClick={() => { const next = buildSet(subjectId); setSet(next); setIdx(0); setAnswers(Array(next.length).fill(null)); setDone(false); }}>
                <Icon name="spark" size={17} /> Practice again (new set)
              </button>
              <button className="btn btn-ghost" onClick={() => navigate("/practice")}>Pick another subject</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const letters = ["A", "B", "C", "D"];
  const lines = q.q.split("\n\n");

  return (
    <div className="screen">
      <div className="run-top">
        <button className="back-link" onClick={() => navigate("/practice")}><Icon name="x" size={16} /> Exit</button>
        <div className="run-progress">
          <div className="run-prog-track"><div className="run-prog-fill" style={{ width: `${(idx / set.length) * 100}%`, background: meta.color }} /></div>
          <span className="run-prog-label">Q {idx + 1} <span style={{ color: "var(--muted)" }}>/ {set.length}</span></span>
        </div>
        <div className="run-score"><Icon name="check" size={15} style={{ color: "#0d9488" }} /> {score}</div>
      </div>

      <div className="q-card">
        <div className="q-card-head">
          <span className="q-subj-tag" style={{ color: qSubj.color, background: qSubj.soft }}>
            <Icon name={qSubj.icon} size={14} /> {qSubj.short}
          </span>
          <span className="q-source"><Icon name="papers" size={13} /> {q.source}</span>
        </div>

        <div className="q-text">
          {lines.map((ln, i) => (
            <p key={i} style={{ margin: i === 0 ? "0 0 2px" : "10px 0 0", fontWeight: i > 0 && lines.length > 1 ? 700 : 500, fontSize: i > 0 && lines.length > 1 ? 20 : 18 }} dangerouslySetInnerHTML={{ __html: ln }} />
          ))}
        </div>

        {q.image && (
          <div className="q-image">
            <img src={q.image} alt="Question figure / table" loading="lazy" />
          </div>
        )}

        <div className="opt-list">
          {q.options.map((opt, i) => {
            const isPicked = picked === i;
            const isCorrect = i === q.answer;
            let cls = "opt";
            if (checked) {
              if (isCorrect) cls += " correct";
              else if (isPicked) cls += " wrong";
              else cls += " dim";
            } else if (isPicked) cls += " picked";
            return (
              <button key={i} className={cls} disabled={checked} onClick={() => setPicked(i)} style={{ "--c": meta.color }}>
                <span className="opt-box">
                  {checked && isCorrect ? <Icon name="check" size={16} /> : checked && isPicked ? <Icon name="x" size={16} /> : letters[i]}
                </span>
                <span className="opt-text">{opt}</span>
              </button>
            );
          })}
        </div>

        {checked && (
          <div className={"explain " + (picked === q.answer ? "ok" : "no")}>
            <div className="explain-head">
              <Icon name={picked === q.answer ? "check" : "x"} size={17} />
              {picked === q.answer ? "Correct!" : `Not quite — answer is ${letters[q.answer]}`}
            </div>
            <p className="explain-body">{q.explanation}</p>
          </div>
        )}

        <div className="q-foot">
          {idx > 0 && (
            <button className="btn btn-ghost" onClick={onBack}>
              <Icon name="arrowLeft" size={18} /> Previous
            </button>
          )}
          {!checked ? (
            <button className="btn btn-primary wide" disabled={picked == null} onClick={onCheck}>
              <Icon name="check" size={18} /> Check answer
            </button>
          ) : (
            <button className="btn btn-dark wide" onClick={onNext}>
              {idx + 1 >= set.length ? "See results" : "Next question"} <Icon name="arrowRight" size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
