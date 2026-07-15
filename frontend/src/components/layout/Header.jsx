import { useState } from "react";
import { Search, Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "../common/NotificationDropdown";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const search = (event) => {
    if (event.key === "Enter" && query.trim()) navigate(`/history?q=${encodeURIComponent(query.trim())}`);
  };
  return <header className="header">
    <div><h1>CRM AI</h1><p>Healthcare Professional CRM</p></div>
    <div className="header-right">
      <div className="search"><Search size={18}/><input placeholder="Search interactions..." value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={search}/></div>
      <div style={{ position: "relative" }}><button className="icon-btn" type="button" onClick={() => setOpen(!open)} aria-label="Notifications"><Bell size={20}/></button>{open && <NotificationDropdown />}</div>
      <button className="new-btn" type="button" onClick={() => navigate("/assistant")}><Plus size={18}/>New Interaction</button>
    </div>
  </header>;
}
