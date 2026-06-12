import { NavLink, useLocation } from "react-router-dom";
import Icon from "./Icon";
import Logo from "./Logo";

const NAV = [
  { id: "home", label: "Home", icon: "home", to: "/" },
  { id: "pyq", label: "Previous Papers", icon: "papers", to: "/pyq" },
  { id: "practice", label: "Practice", icon: "target", to: "/practice" },
];

export default function TopNav() {
  const { pathname } = useLocation();
  const activeId = pathname === "/" ? "home" : pathname.startsWith("/pyq") ? "pyq" : pathname.startsWith("/practice") ? "practice" : "";

  return (
    <header className="topnav">
      <div className="topnav-inner">
        <NavLink to="/" className="logo-btn"><Logo /></NavLink>
        <nav className="nav-links">
          {NAV.map((n) => (
            <NavLink key={n.id} to={n.to} className={"nav-link" + (activeId === n.id ? " on" : "")}>
              <Icon name={n.icon} size={17} /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="topnav-right">
          <button className="streak-pill"><Icon name="flame" size={15} /> 12</button>
          <div className="avatar">AR</div>
        </div>
      </div>
    </header>
  );
}
