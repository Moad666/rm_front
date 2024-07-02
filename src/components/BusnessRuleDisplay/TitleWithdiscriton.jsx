import React from "react";
export default function TitleWithdiscriton({title,description}){
    return <div>
    
    <h1 style={{fontSize:"18px",fontWeight:700}}>
    {title}
    </h1>
    <p style={{fontSize:"14px",color:"gray"}}>
    {description}
    </p>

</div>
}