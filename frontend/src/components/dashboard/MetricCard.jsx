import "./MetricCard.css";

import {motion} from "framer-motion";

export default function MetricCard({

title,

value,

icon,

color

}){

return(

<motion.div

initial={{

opacity:0,

y:20

}}

animate={{

opacity:1,

y:0

}}

className="metric-card"

>

<div

className="metric-icon"

style={{

background:color

}}

>

{icon}

</div>

<div className="metric-content">

<p>

{title}

</p>

<h2>

{value}

</h2>

</div>

</motion.div>

);

}