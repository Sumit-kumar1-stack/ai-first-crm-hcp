import "./SummaryPanel.css";

import { FileText } from "lucide-react";

import { useSelector } from "react-redux";

export default function SummaryPanel(){

const messages=useSelector(

state=>state.interaction.messages

);

const latest=

messages

.filter(

m=>m.type==="assistant"

)

.at(-1);

return(

<div className="summary-panel">

<div className="summary-title">

<FileText size={18}/>

<h3>AI Summary</h3>

</div>

<p>

{

latest?.data?.summary||

"No summary generated."

}

</p>

</div>

);

}