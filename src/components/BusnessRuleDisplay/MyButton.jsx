import React from "react";
import { FaArrowRight } from "react-icons/fa6";
export default function MyButton({text}){
return <div style={{display:"flex",backgroundColor:"#4F46E5",color:"white",padding:"0.5rem",borderRadius:5,alignItems:"center",justifyContent:"center",height:"40px",gap:10}}>
    
    <p style={{fontSize:"12px",fontWeight:500}}>{text}</p>
    <div><FaArrowRight size={10}/></div>
    </div>

}