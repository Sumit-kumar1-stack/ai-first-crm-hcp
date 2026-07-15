import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChartsPanel from "../components/dashboard/ChartsPanel";
import { fetchDashboardStats } from "../redux/dashboardSlice";

export default function Analytics() {
  const dispatch = useDispatch();
  const { summary, recentActivity, followups, loading, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <div className="page-card">
      <h1>Analytics</h1>
      <p>Interaction analytics generated from the CRM database.</p>

      {loading && <p>Loading analytics…</p>}
      {error && <p role="alert">Unable to load analytics.</p>}

      <div className="stats-grid">
        <div className="metric-card"><p>Total doctors</p><h2>{summary?.total_doctors || 0}</h2></div>
        <div className="metric-card"><p>Interactions</p><h2>{summary?.total_interactions || 0}</h2></div>
        <div className="metric-card"><p>Pending follow-ups</p><h2>{summary?.pending_followups || 0}</h2></div>
      </div>

      <ChartsPanel />

      <h2>Upcoming follow-ups</h2>
      {followups?.length ? followups.map((item, index) => (
        <p key={`${item.doctor}-${index}`}>{item.doctor} — {item.follow_up}</p>
      )) : <p>No follow-ups recorded.</p>}

      <h2>Recent activity</h2>
      {recentActivity?.length ? recentActivity.map((item, index) => (
        <p key={`${item.doctor}-${index}`}>{item.doctor}: {item.action}</p>
      )) : <p>No activity recorded.</p>}
    </div>
  );
}
