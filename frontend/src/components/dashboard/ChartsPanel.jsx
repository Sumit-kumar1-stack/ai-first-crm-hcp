import "./ChartsPanel.css";

import {

Bar,

Doughnut

} from "react-chartjs-2";

import {

Chart as ChartJS,

CategoryScale,

LinearScale,

BarElement,

ArcElement,

Tooltip,

Legend,

} from "chart.js";

import { useSelector } from "react-redux";

ChartJS.register(

CategoryScale,

LinearScale,

BarElement,

ArcElement,

Tooltip,

Legend

);

export default function ChartsPanel(){

const{

weeklyMeetings,

productDistribution,

}=useSelector(

state=>state.dashboard

);

const barData={

labels:weeklyMeetings.map(i=>i.day),

datasets:[

{

label:"Meetings",

data:weeklyMeetings.map(i=>i.count),

backgroundColor:"#2563eb",

borderRadius:10,

},

],

};

const doughnutData={

labels:productDistribution.map(i=>i.product),

datasets:[

{

data:productDistribution.map(i=>i.count),

backgroundColor:[

"#2563eb",

"#22c55e",

"#f59e0b",

"#8b5cf6",

"#ef4444",

"#14b8a6"

],

},

],

};

return(

<div className="charts-grid">

<div className="chart-card">

<h3>

Weekly Meetings

</h3>

<Bar

data={barData}

options={{

responsive:true,

plugins:{

legend:{

display:false

}

}

}}

/>

</div>

<div className="chart-card">

<h3>

Products

</h3>

<Doughnut

data={doughnutData}

/>

</div>

</div>

);

}