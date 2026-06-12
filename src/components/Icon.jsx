const ICON_PATHS = {
  home: "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5",
  papers: "M7 3h7l4 4v14H7zM14 3v4h4M9 12h7M9 16h7",
  practice: "M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 21l-4.9 2.6.9-5.5-4-3.9 5.5-.8z",
  puzzle: "M10 4a2 2 0 1 1 4 0v1h3v3h1a2 2 0 1 1 0 4h-1v3h-3v1a2 2 0 1 1-4 0v-1H7v-3H6a2 2 0 1 1 0-4h1V5h3z",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18",
  calculator: "M6 3h12v18H6zM9 7h6M8 11h0M12 11h0M16 11h0M8 15h0M12 15h0M16 15h0M8 18h4",
  book: "M4 5a2 2 0 0 1 2-2h12v15H6a2 2 0 0 0-2 2zM4 18a2 2 0 0 0 2 2h12",
  download: "M12 3v12m0 0 4-4m-4 4-4-4M5 19h14",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowLeft: "M19 12H5M11 18l-6-6 6-6",
  check: "M5 13l4 4L19 7",
  x: "M6 6l12 12M18 6 6 18",
  chevronDown: "M6 9l6 6 6-6",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
  flame: "M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-1 .3-2 1-3 .2 1 1 1.5 1.5 1 0-2 .5-4 1.5-6z",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 11.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18",
  bolt: "M13 3 4 14h6l-1 7 9-11h-6z",
  filter: "M3 5h18l-7 8v5l-4 2v-7z",
  trophy: "M7 4h10v3a5 5 0 0 1-10 0zM7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M9 14h6l-1 4h-4zM8 21h8",
};

export default function Icon({ name, size = 22, stroke = 2, style, className }) {
  const d = ICON_PATHS[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={style} className={className} aria-hidden="true">
      {d.split("M").filter(Boolean).map((seg, i) => <path key={i} d={"M" + seg} />)}
    </svg>
  );
}
