import React from "react";
import SearchRule from "../components/BusnessRuleDisplay/SearchRule";
import KanbanColumn from "../components/kanbanComponent/KanbanColumn";
import TitleWithdiscriton from "../components/BusnessRuleDisplay/TitleWithdiscriton";
import { Button} from "antd";
import MyButton from "../components/BusnessRuleDisplay/MyButton";
import KanbanBoard from "../components/kanbanComponent/KanbanBoard";
import MyButton2 from "../components/BusnessRuleDisplay/Mybotton2";
import { useLocation } from 'react-router-dom';


export default function KanbanPage(){



const location = useLocation();
console.log(location.state.data);
const data  = location.state.data || { data: [] };
console.log(data)

return <div style={{backgroundColor:"#F5F6F6",height:"100vh",padding:"1rem",width:"100%"}}>

<SearchRule/>

<div style={{margin:"20px 0 20px 0"}}>
<TitleWithdiscriton title={"Busness Rules Categorisation"} description={"validate the rule ,Categorise .By Modifiyng , deleting or even adding ."}/>
</div>

<div style={{width:"100%",height:"80%",margin:"20px 0 20px 0"}}>
<KanbanBoard rules={data}/>
</div>



</div>
}