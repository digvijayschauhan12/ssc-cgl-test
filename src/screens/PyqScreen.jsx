import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import Chip from "../components/Chip";
import { TIERS, QUESTIONS } from "../data/data";

function TierCard({ tier, onOpen }) {
  const dateCount = tier.years.reduce((a, y) => a + y.dates.length, 0);
  const shiftCount = tier.years.reduce((a, y) => a + y.dates.reduce((b, d) => b + d.shifts.length, 0), 0);
  return (
    <button className="tier-card" onClick={onOpen}>
      <div className="tier-card-top">
        <div className="tier-badge">{tier.name}</div>
        <Chip>{tier.tag}</Chip>
      </div>
      <p className="tier-blurb">{tier.blurb}</p>
      <div className="tier-sections">
        {tier.sections.map((s) => <span key={s} className="tier-sec">{s}</span>)}
      </div>
      <div className="tier-foot">
        <div className="tier-stat"><b>{tier.years.length}</b> years</div>
        <div className="tier-stat"><b>{dateCount}</b> exam dates</div>
        <div className="tier-stat"><b>{shiftCount}</b> shift papers</div>
        <span className="tier-open">Open <Icon name="arrowRight" size={16} /></span>
      </div>
    </button>
  );
}

function ShiftRow({ dateObj, shift, onView }) {
  return (
    <div className="shift-row">
      <div className="shift-meta">
        <div className="shift-name">{shift}</div>
        <div className="shift-sub">{dateObj.shifts.length === 3 ? "Morning / Afternoon / Evening" : "Multi-slot CBT"} · 100 Q · 200 marks</div>
      </div>
      <div className="shift-actions">
        <button className="btn-mini ghost" onClick={() => onView(dateObj, shift)}><Icon name="eye" size={15} /> View</button>
      </div>
    </div>
  );
}

function YearAccordion({ tier, year, open, onToggle, onView }) {
  return (
    <div className={"year-acc" + (open ? " open" : "")}>
      <button className="year-head" onClick={onToggle}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className="year-num">{year.year}</span>
          <div style={{ textAlign: "left" }}>
            <div className="year-title">SSC CGL {tier.name} — {year.year}</div>
            <div className="year-sub">Exam window · {year.window} · {year.dates.length} dates</div>
          </div>
        </div>
        <span className="year-chev"><Icon name="chevronDown" size={20} /></span>
      </button>
      <div className="year-body">
        <div className="year-body-inner">
          {year.dates.map((d) => (
            <div key={d.date} className="date-group">
              <div className="date-head">
                <div className="date-cal">
                  <span className="date-day">{d.day}</span>
                  <span className="date-num">{d.date.split(" ")[0]}</span>
                </div>
                <div>
                  <div className="date-full">{d.date}</div>
                  <div className="date-shifts">{d.shifts.length} shift{d.shifts.length > 1 ? "s" : ""}</div>
                </div>
              </div>
              <div className="shift-list">
                {d.shifts.map((s) => <ShiftRow key={s} dateObj={d} shift={s} onView={onView} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaperViewer({ tier, info, onClose }) {
  const sourceTag = `${tier.name} · ${info.date} · ${info.shift}`;
  const allQs = Object.values(QUESTIONS).flat();
  const matched = allQs.filter((q) => q.source === sourceTag);
  const previewQs = matched.length ? matched : allQs.slice(0, 3);
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="viewer" onClick={(e) => e.stopPropagation()}>
        <div className="viewer-bar">
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <div className="viewer-doc-ic"><Icon name="papers" size={18} /></div>
            <div style={{ minWidth: 0 }}>
              <div className="viewer-title">SSC CGL {tier.name} · {info.date}</div>
              <div className="viewer-sub">{info.shift} · Official question paper</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="viewer-x" onClick={onClose}><Icon name="x" size={18} /></button>
          </div>
        </div>
        <div className="viewer-page-wrap">
          <div className="paper-sheet">
            <div className="sheet-head">
              <div>
                <div className="sheet-org">Staff Selection Commission</div>
                <div className="sheet-exam">Combined Graduate Level Examination — {tier.name}</div>
              </div>
              <div className="sheet-meta">
                <div>{info.date}</div><div>{info.shift}</div>
              </div>
            </div>
            <div className="sheet-rule" />
            {previewQs.map((q, i) => {
              const letters = ["A", "B", "C", "D"];
              return (
                <div key={i} className="sheet-q">
                  <div className="sheet-q-no">Q{i + 1}.</div>
                  <div style={{ flex: 1 }}>
                    <div className="sheet-q-text" dangerouslySetInnerHTML={{ __html: q.q.split("\n\n")[0] + (q.q.includes("\n\n") ? " " + q.q.split("\n\n")[1] : "") }} />
                    {q.image && (
                      <div className="sheet-q-image">
                        <img src={q.image} alt="Question figure / table" loading="lazy" />
                      </div>
                    )}
                    <ol className="sheet-opts">
                      {q.options.map((o, oi) => (
                        <li key={oi} className={oi === q.answer ? "sheet-correct" : undefined}>
                          {o}{oi === q.answer ? "  ✓" : ""}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              );
            })}
            <div className="sheet-more">{previewQs.length} questions · correct answer marked with ✓</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PyqScreen() {
  const navigate = useNavigate();
  const { tierId } = useParams();
  const [openYear, setOpenYear] = useState(null);
  const [viewer, setViewer] = useState(null);
  const tier = TIERS.find((t) => t.id === tierId);

  useEffect(() => { if (tier) setOpenYear(tier.years[0].year); }, [tierId]);

  const openView = (dateObj, shift) => setViewer({ info: { date: dateObj.date, shift } });

  if (!tier) {
    return (
      <div className="screen">
        <div className="page-head">
          <button className="back-link" onClick={() => navigate("/")}><Icon name="arrowLeft" size={16} /> Home</button>
          <h1 className="page-title">Previous Year Papers</h1>
          <p className="page-lead">Pick a tier to browse the archive — papers are grouped by year, exam date and shift.</p>
        </div>
        <div className="tier-grid">
          {TIERS.map((t) => <TierCard key={t.id} tier={t} onOpen={() => navigate(`/pyq/${t.id}`)} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="page-head">
        <button className="back-link" onClick={() => navigate("/pyq")}><Icon name="arrowLeft" size={16} /> All tiers</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
          <h1 className="page-title" style={{ margin: 0, whiteSpace: "nowrap" }}>SSC CGL {tier.name}</h1>
          <Chip>{tier.tag}</Chip>
        </div>
        <p className="page-lead" style={{ marginTop: 8 }}>{tier.blurb}</p>
      </div>
      <div className="year-list">
        {tier.years.map((y) => (
          <YearAccordion key={y.year} tier={tier} year={y}
            open={openYear === y.year}
            onToggle={() => setOpenYear(openYear === y.year ? null : y.year)}
            onView={openView} />
        ))}
      </div>
      {viewer && <PaperViewer tier={tier} info={viewer.info} onClose={() => setViewer(null)} />}
    </div>
  );
}
