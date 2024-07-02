import React from "react";
import FileUploader from "../components/uploadComponent/FileUploader";
import SearchRule from "../components/BusnessRuleDisplay/SearchRule";
import TitleWithdiscriton from "../components/BusnessRuleDisplay/TitleWithdiscriton";
import { Button, Input } from "antd";

export default function UploadFilePage(){
    return <div style={{backgroundColor:"#F5F6F6",padding:"1rem",width: "100%",height: "100vh",display:"flex",flexDirection:"column", alignItems:"center",gap:40}}>
         <SearchRule/>
        <div style={{backgroundColor:"white",padding:"1rem",borderRadius:"10px",width:"90%",display:"flex",flexDirection:"column",justifyContent:"space-between",height:"80%"}}>
        
        <TitleWithdiscriton title={"Media Upload"} description={"add your documment here ,and you can upload up to 5 files max"}/>
        <FileUploader/>
        <p style={{fontSize:"14px",color:"gray"}}>Only support .csv and  .xls</p>
        
        <hr/>
       
        <TitleWithdiscriton title={"Upload From Url"} description={""}/>

        <div style={{padding:"1rem",border:"1px solid #4F46E5",borderRadius:"10px",display:"flex",alignItems:"center"}}>
            <Input variant="borderless"/>
            <Button type="primary">upload</Button>
        </div>
        
       
        <div style={{display:"flex",gap:5,justifyContent:"flex-end"}}>

            <Button >cancel</Button>
            <Button type="primary">next</Button>
        </div>

        </div>
        
    </div>
}