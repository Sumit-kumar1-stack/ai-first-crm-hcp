import "./Card.css";

export default function Card({

children,

title,

action,

className=""

}){

return(

<div className={`card ${className}`}>

{title&&(

<div className="card-header">

<h3>

{title}

</h3>

{action}

</div>

)}

<div className="card-body">

{children}

</div>

</div>

);

}