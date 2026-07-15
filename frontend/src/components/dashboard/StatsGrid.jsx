import "./StatsGrid.css";

import MetricCard from "./MetricCard";

import {

Users,

Calendar,

Activity,

Building2

} from "lucide-react";

import {useSelector} from "react-redux";

export default function StatsGrid(){

const {summary}=useSelector(

state=>state.dashboard

);

const stats=[

{

title:"Doctors",

value:summary?.total_doctors||0,

icon:<Users size={22}/>,

color:"#2563eb"

},

{

title:"Interactions",

value:summary?.total_interactions||0,

icon:<Activity size={22}/>,

color:"#16a34a"

},

{

title:"Followups",

value:summary?.pending_followups||0,

icon:<Calendar size={22}/>,

color:"#ea580c"

},

{

title:"Hospitals",

value:summary?.top_hospital||"-",

icon:<Building2 size={22}/>,

color:"#9333ea"

}

];

return(

<div className="stats-grid">

{

stats.map((item,index)=>

<MetricCard

key={index}

{...item}

/>

)

}

</div>

);

}