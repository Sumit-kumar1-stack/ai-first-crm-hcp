import "./Dashboard.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import StatsGrid from "../components/dashboard/StatsGrid";
import ChartsPanel from "../components/dashboard/ChartsPanel";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import InsightCard from "../components/dashboard/InsightCard";
import QuickActions from "../components/dashboard/QuickActions";
import DoctorTable from "../components/dashboard/DoctorTable";
import PerformanceCard from "../components/dashboard/PerformanceCard";
import FollowupWidget from "../components/dashboard/FollowupWidget";
import { fetchDashboardStats } from "../redux/dashboardSlice";
import { fetchHistory } from "../redux/interactionSlice";


export default function Dashboard(){

const dispatch = useDispatch();

useEffect(() => {
dispatch(fetchDashboardStats());
dispatch(fetchHistory());
}, [dispatch]);

return(

<div className="dashboard-page">

<div className="dashboard-banner">

<div>

<h1>

Welcome back, Sumit 👋

</h1>

<p>

AI-powered Medical CRM Dashboard

</p>

</div>

<div className="banner-right">

<div>

<h2>

98%

</h2>

<span>

AI Accuracy

</span>

</div>

</div>

</div>

<StatsGrid/>

<div className="dashboard-row">

<div className="left">

<ChartsPanel/>

<DoctorTable/>

<ActivityFeed/>

</div>

<div className="right">

<InsightCard/>

<QuickActions/>

<PerformanceCard/>

<FollowupWidget/>

</div>

</div>

</div>

);

}
