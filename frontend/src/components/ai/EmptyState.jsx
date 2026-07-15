import "./EmptyState.css";

import {

Sparkles

} from "lucide-react";

export default function EmptyState(){

return(

<div className="empty-state">

<Sparkles size={70}/>

<h2>

How can I help today?

</h2>

<p>

Ask about doctors, meetings,

follow-ups or CRM insights.

</p>

</div>

);

}