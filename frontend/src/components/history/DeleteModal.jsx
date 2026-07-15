import "./DeleteModal.css";

export default function DeleteModal({

open,

onClose,

onDelete

}){

if(!open) return null;

return(

<div className="delete-overlay">

<div className="delete-box">

<h2>

Delete Interaction

</h2>

<p>

This action cannot be undone.

</p>

<div className="buttons">

<button

className="cancel"

onClick={onClose}

>

Cancel

</button>

<button

className="delete"

onClick={onDelete}

>

Delete

</button>

</div>

</div>

</div>

);

}