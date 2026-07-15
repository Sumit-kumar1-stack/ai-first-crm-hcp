import {

useState

} from "react";

import {

useDispatch,

useSelector

} from "react-redux";

import {

login

} from "../../redux/authSlice";

import {

useNavigate

} from "react-router-dom";

import "./LoginForm.css";

export default function LoginForm(){

const navigate=useNavigate();

const dispatch=useDispatch();

const {loading,error}=

useSelector(

state=>state.auth

);

const[email,setEmail]=

useState("");

const[password,setPassword]=

useState("");

const submit=async(e)=>{

e.preventDefault();

const result=

await dispatch(

login({

email,

password

})

);

if(

login.fulfilled.match(result)

){

navigate("/");

}

};

return(

<form

className="login-card"

onSubmit={submit}

>

<h1>

MedCRM

</h1>

<p>

AI Powered CRM

</p>

<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>

setEmail(

e.target.value

)

}

/>

<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>

setPassword(

e.target.value

)

}

/>

{error &&

<p className="error">

{typeof error === "string" ? error : error?.detail || "Login failed"}

</p>

}

<button

disabled={loading}

>

{

loading

?

"Signing In..."

:

"Sign In"

}

</button>

</form>

);

}