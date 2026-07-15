import "./QuickActions.css";
import { Plus, Bot, Download, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function QuickActions() {
  const navigate = useNavigate();
  const history = useSelector((state) => state.interaction.history);
  const exportInteractions = () => {
    if (!history.length) return toast.error("No interactions available to export.");
    const headers = ["id", "doctor_name", "hospital", "products", "meeting_date", "follow_up"];
    const csv = [headers.join(","), ...history.map((item) => headers.map((key) => JSON.stringify(item[key] || "")).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a"); link.href = url; link.download = "interactions.csv"; link.click(); URL.revokeObjectURL(url);
  };
  const actions = [
    ["New Interaction", <Plus size={20}/>, () => navigate("/assistant")],
    ["Ask AI", <Bot size={20}/>, () => navigate("/assistant")],
    ["Search Doctors", <Search size={20}/>, () => navigate("/history")],
    ["Export", <Download size={20}/>, exportInteractions],
  ];
  return <div className="quick-card"><h3>Quick Actions</h3><div className="quick-grid">{actions.map(([title, icon, onClick]) => <button key={title} className="quick-btn" onClick={onClick} type="button">{icon}<span>{title}</span></button>)}</div></div>;
}
