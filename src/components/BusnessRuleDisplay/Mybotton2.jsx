import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
export default function MyButton2({text}){

return <div style={{display:"flex",color:"#4F46E5",padding:"0 0.3rem 0 0.3rem",borderRadius:5,alignItems:"center",justifyContent:"center",border:"2px solid #4F46E5",height:"40px",gap:5}}>
    
    <div><FaArrowLeft size={10}/></div>
    <p style={{fontSize:"12px",fontWeight:500}}>{text}</p>

    </div>

}