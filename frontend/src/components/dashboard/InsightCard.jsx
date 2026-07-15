import "./InsightCard.css";

import {Lightbulb} from "lucide-react";
import { useSelector } from "react-redux";

export default function InsightCard(){

const { summary, followups } = useSelector((state) => state.dashboard);

return(

<div className="insight-card">

<div className="insight-header">

<Lightbulb/>

AI Insights

</div>

<div className="insight-box">

<h3>

Top Product

</h3>

<p>

{summary?.top_product || "No product data available yet."}

</p>

</div>

<div className="insight-box">

<h3>

Recommendation

</h3>

<p>

{followups?.[0] ? `${followups[0].doctor}: ${followups[0].follow_up}` : "No follow-up recommendation available."}

</p>

</div>

</div>

);

}
