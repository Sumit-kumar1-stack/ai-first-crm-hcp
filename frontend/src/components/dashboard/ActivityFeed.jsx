import "./ActivityFeed.css";

import {useSelector} from "react-redux";

export default function ActivityFeed(){

const {recentActivity}=useSelector(

state=>state.dashboard

);

return(

<div className="activity-card">

<div className="card-title">

Recent Activity

</div>

{

recentActivity.map((item,index)=>(

<div

key={index}

className="activity-item"

>

<div className="dot"/>

<div>

<strong>

{item.doctor}

</strong>

<p>

{item.action}

</p>

<small>

{item.time}

</small>

</div>

</div>

))

}

</div>

);

}