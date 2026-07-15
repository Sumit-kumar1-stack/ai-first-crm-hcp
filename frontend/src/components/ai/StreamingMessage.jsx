import {

useEffect,

useState

} from "react";

export default function StreamingMessage({

text

}){

const[display,setDisplay]=useState("");

useEffect(()=>{

let i=0;

const timer=setInterval(()=>{

setDisplay(

text.slice(

0,

i

)

);

i++;

if(i>text.length)

clearInterval(timer);

},15);

return()=>clearInterval(timer);

},[text]);

return(

<p>

{display}

</p>

);

}