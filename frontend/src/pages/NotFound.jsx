import { Link } from "react-router-dom";

export default function NotFound(){

return(

<div

style={{

display:"flex",

height:"70vh",

alignItems:"center",

justifyContent:"center",

flexDirection:"column",

gap:"20px"

}}

>

<h1>

404

</h1>

<h2>

Page Not Found

</h2>

<Link to="/">

Go Back Dashboard

</Link>

</div>

);

}