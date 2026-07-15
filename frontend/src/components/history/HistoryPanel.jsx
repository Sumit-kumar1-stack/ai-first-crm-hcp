import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InteractionModal from "./InteractionModal";
import DeleteModal from "./DeleteModal";
import {
FiSearch,
FiEdit2,
FiTrash2,
FiEye,
FiRefreshCw
} from "react-icons/fi";

import { fetchHistory, removeInteraction, editInteraction } from "../../redux/interactionSlice";
import toast from "react-hot-toast";

import "./HistoryPanel.css";

export default function HistoryPanel(){

const dispatch=useDispatch();
const [searchParams] = useSearchParams();

const{

history,

loading

}=useSelector(

state=>state.interaction

);

const[search,setSearch]=useState(searchParams.get("q") || "");

const[sortAsc,setSortAsc]=useState(false);

const [selected,setSelected]=useState(null);
const [editing,setEditing]=useState(null);

const [deleteId,setDeleteId]=useState(null);

const [page,setPage]=useState(1);

const perPage=6;

useEffect(()=>{

dispatch(fetchHistory());

},[dispatch]);

const filtered=useMemo(()=>{

let data=[...history];

if(search){

data=data.filter(item=>

item.doctor_name
?.toLowerCase()
.includes(search.toLowerCase())

||

item.hospital
?.toLowerCase()
.includes(search.toLowerCase())

||

item.products
?.toLowerCase()
.includes(search.toLowerCase())

);

}

data.sort((a,b)=>{

if(sortAsc){

return a.id-b.id;

}

return b.id-a.id;

});

return data;

},[history,search,sortAsc]);

return(

<div className="crm-card">

<div className="crm-header">

<div>

<h2>

Interaction History

</h2>

<p>

Manage all doctor meetings

</p>

</div>

<button

className="refresh-btn"

onClick={()=>dispatch(fetchHistory())}

>

<FiRefreshCw/>

Refresh

</button>

</div>

<div className="toolbar">

<div className="search">

<FiSearch/>

<input

placeholder="Search doctor, hospital or product..."

value={search}

onChange={e=>

setSearch(e.target.value)

}

/>

</div>

<button

className="sort-btn"

onClick={()=>setSortAsc(!sortAsc)}

>

Sort

</button>

</div>

<table>

<thead>

<tr>

<th>ID</th>

<th>Doctor</th>

<th>Hospital</th>

<th>Product</th>

<th>Meeting</th>

<th>Status</th>

<th>Actions</th>

</tr>

</thead>

<tbody>

{

loading?

(

<tr>

<td

colSpan="7"

className="loading"

>

Loading...

</td>

</tr>

)

:

filtered.length===0?

(

<tr>

<td

colSpan="7"

className="loading"

>

No interactions found

</td>

</tr>

)

:

filtered
.slice(
    (page - 1) * perPage,
    page * perPage
  ).map(item=>(

<tr

key={item.id}

>

<td>

#{item.id}

</td>

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

<td>

<span className="badge">

{item.outcome||"Pending"}

</span>

</td>

<td>

<div className="actions">

<button
    onClick={() => setSelected(item)}
>
    <FiEye/>
</button>

<button onClick={() => setEditing(item)}>

<FiEdit2/>

</button>

<button
    onClick={() => setDeleteId(item.id)}
>
    <FiTrash2/>
</button>

</div>

</td>

</tr>

))

}

</tbody>

</table>

<div className="pagination">

    {

        Array.from({

            length: Math.ceil(
                filtered.length / perPage
            )

        }).map((_, index) => (

            <button

                key={index}

                className={
                    page === index + 1
                        ? "active"
                        : ""
                }

                onClick={() =>
                    setPage(index + 1)
                }

            >

                {index + 1}

            </button>

        ))

    }

</div>

<InteractionModal

    interaction={selected}

    onClose={() => setSelected(null)}

/>

<InteractionModal
    interaction={editing}
    editable
    onClose={() => setEditing(null)}
    onSave={async (data) => {
        const result = await dispatch(editInteraction({ id: editing.id, data }));
        if (editInteraction.fulfilled.match(result)) {
            toast.success("Interaction updated.");
            setEditing(null);
            dispatch(fetchHistory());
        } else {
            toast.error("Unable to update interaction.");
        }
    }}
/>

<DeleteModal

    open={!!deleteId}

    onClose={() => setDeleteId(null)}

    onDelete={() => {

        dispatch(removeInteraction(deleteId)).then((result) => {
            if (removeInteraction.fulfilled.match(result)) {
                toast.success("Interaction deleted.");
            } else {
                toast.error("Unable to delete interaction.");
            }
        });
        setDeleteId(null);

    }}

/>

</div>

);

}
