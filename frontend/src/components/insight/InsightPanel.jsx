import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDashboardStats } from "../../redux/dashboardSlice";

import "./InsightPanel.css";

export default function InsightPanel() {

  const dispatch = useDispatch();

  const { summary } = useSelector(
    (state) => state.dashboard
  );

  const { messages } = useSelector(
    (state) => state.interaction
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const aiMessages = messages.filter(
    (m) => m.type === "assistant"
  );

  const latest =
    aiMessages.length > 0
      ? aiMessages[aiMessages.length - 1]
      : null;

  const latestData = latest?.data || {};

  return (

    <div className="card">

      <h2>📊 CRM Insights</h2>

      <div className="metric-card">
        <span>👨‍⚕️ Total Doctors</span>
        <strong>{summary?.total_doctors ?? 0}</strong>
      </div>

      <div className="metric-card">
        <span>📝 Total Interactions</span>
        <strong>{summary?.total_interactions ?? 0}</strong>
      </div>

      <div className="metric-card">
        <span>📅 Pending Follow-ups</span>
        <strong>{summary?.pending_followups ?? 0}</strong>
      </div>

      <div className="metric-card">
        <span>💊 Top Product</span>
        <strong>{summary?.top_product ?? "-"}</strong>
      </div>

      <div className="metric-card">
        <span>🏥 Top Hospital</span>
        <strong>{summary?.top_hospital ?? "-"}</strong>
      </div>

      <div className="metric-card">
        <span>📆 Today's Meetings</span>
        <strong>{summary?.today_meetings ?? 0}</strong>
      </div>

      <div className="insight-card">

        <div className="insight-title">
          🤖 Latest AI Response
        </div>

        <p>
          {latest?.message ||
            "No AI response available."}
        </p>

      </div>

      <div className="insight-card">

        <div className="insight-title">
          📝 Latest Meeting Summary
        </div>

        <p>
          {latestData.summary ||
            "No meeting summary generated yet."}
        </p>

      </div>

      <div className="insight-card">

        <div className="insight-title">
          📅 Latest Follow-up
        </div>

        <p>
          {latestData.follow_up ||
            latestData.recommendation ||
            "No follow-up recommendation available."}
        </p>

      </div>

      <div className="insight-card">

        <div className="insight-title">
          🎯 Latest Outcome
        </div>

        <p>
          {latestData.outcome ||
            "No outcome generated yet."}
        </p>

      </div>

    </div>

  );

}