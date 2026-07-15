import {

Navigate

} from "react-router-dom";

import {

useSelector

} from "react-redux";

import {

getToken

} from "../utils/token";

export default function ProtectedRoute({

children

}){

const {

authenticated

}=useSelector(

state=>state.auth

);

if(

!authenticated &&

!getToken()

){

return <Navigate to="/login"/>;

}

return children;

}