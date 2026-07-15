import "./DoctorTable.css";

import {useSelector} from "react-redux";

export default function DoctorTable(){

const{

history

}=useSelector(

state=>state.interaction

);

return(

<div className="doctor-table">

<div className="table-header">

<h3>

Latest Doctors

</h3>

</div>

<table>

<thead>

<tr>

<th>

Doctor

</th>

<th>

Hospital

</th>

<th>

Product

</th>

<th>

Meeting

</th>

</tr>

</thead>

<tbody>

{

history.slice(0,6).map(item=>(

<tr

key={item.id}

>

<td>

{item.doctor_name}

</td>

<td>

{item.hospital}

</td>

<td>

{item.products}

</td>

<td>

{item.meeting_date}

</td>

</tr>

))

}

</tbody>

</table>

</div>

);

}