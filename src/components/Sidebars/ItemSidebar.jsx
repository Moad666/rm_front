import React from "react";
import { Link } from "react-router-dom";

export default function ItemSidebar({icon,tilte,link}){

    return <div className="changecolor">
<div style={{padding:"0.5rem"}}><Link to={link}>{icon}</Link></div>
    </div>

}