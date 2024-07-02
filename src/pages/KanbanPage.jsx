import React from "react";
import SearchRule from "../components/BusnessRuleDisplay/SearchRule";
import KanbanColumn from "../components/kanbanComponent/KanbanColumn";
import TitleWithdiscriton from "../components/BusnessRuleDisplay/TitleWithdiscriton";
import { Button} from "antd";
import MyButton from "../components/BusnessRuleDisplay/MyButton";
import KanbanBoard from "../components/kanbanComponent/KanbanBoard";
import MyButton2 from "../components/BusnessRuleDisplay/Mybotton2";

export default function KanbanPage(){
return <div style={{backgroundColor:"#F5F6F6",height:"100vh",padding:"1rem",width:"100%"}}>

<SearchRule/>

<div style={{margin:"20px 0 20px 0"}}>
<TitleWithdiscriton title={"Busness Rules Categorisation"} description={"validate the rule ,Categorise .By Modifiyng , deleting or even adding ."}/>
</div>

<div style={{width:"100%",height:"70%",margin:"20px 0 20px 0"}}>
<KanbanBoard/>
</div>

<div style={{display:"flex",gap:10,justifyContent:"end"}}>

        <Button style={{fontSize:"12px",height:"40px"}}>cancel</Button>
        <MyButton2 text="precedent"/>
        <MyButton text="Validate and Procced"/>
        
</div>

</div>
}