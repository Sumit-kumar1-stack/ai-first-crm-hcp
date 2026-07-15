import "./FilePreview.css";

import {

FileText,


X

} from "lucide-react";

export default function FilePreview({

file,

remove

}){

const isImage=file.type.startsWith("image");

return(

<div className="preview">

{

isImage?

<img

src={URL.createObjectURL(file)}

alt=""

/>

:

<FileText/>

}

<div>

<strong>

{file.name}

</strong>

<p>

{(file.size/1024).toFixed(1)} KB

</p>

</div>

<button onClick={remove}>

<X size={16}/>

</button>

</div>

);

}
