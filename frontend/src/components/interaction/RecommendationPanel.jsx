import "./RecommendationPanel.css";
import { Lightbulb } from "lucide-react";
import { useSelector } from "react-redux";

export default function RecommendationPanel() {
  const recommendation = useSelector((state) => state.interaction.recommendations);

  return (
    <div className="recommendation-panel">
      <div className="recommendation-header"><Lightbulb size={18}/><h3>AI Recommendation</h3></div>
      <div className="recommendation-item"><strong>Next Action</strong><p>{recommendation?.next_action || "Not available"}</p></div>
      <div className="recommendation-item"><strong>Priority</strong><p>{recommendation?.priority || "-"}</p></div>
      <div className="recommendation-item"><strong>Recommended Date</strong><p>{recommendation?.recommended_date || "-"}</p></div>
      <div className="recommendation-item"><strong>Reason</strong><p>{recommendation?.reason || "-"}</p></div>
    </div>
  );
}
