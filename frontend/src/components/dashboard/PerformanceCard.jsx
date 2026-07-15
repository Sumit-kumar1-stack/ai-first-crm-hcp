import "./PerformanceCard.css";
import { useSelector } from "react-redux";

export default function PerformanceCard(){

const { summary } = useSelector((state) => state.dashboard);
const total = summary?.total_interactions || 0;
const followups = summary?.pending_followups || 0;
const followupRate = total ? Math.round((followups / total) * 100) : 0;

return(

<div className="performance-card">

<h3>

Performance

</h3>

<div className="progress-item">

<div>

Doctor Coverage

</div>

<div>

{summary?.total_doctors || 0}

</div>

</div>

<div className="progress">

<div

style={{

width:`${Math.min((summary?.total_doctors || 0) * 10, 100)}%`

}}

></div>

</div>

<div className="progress-item">

<div>

AI Completion

</div>

<div>

{total}

</div>

</div>

<div className="progress">

<div

style={{

width:`${Math.min(total * 10, 100)}%`

}}

></div>

</div>

<div className="progress-item">

<div>

Follow-ups

</div>

<div>

{followupRate}%

</div>

</div>

<div className="progress">

<div

style={{

width:`${followupRate}%`

}}

></div>

</div>

</div>

);

}
