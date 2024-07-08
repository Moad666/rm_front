import React, { useState } from "react";
import FileUploader from "../components/uploadComponent/FileUploader";
import SearchRule from "../components/BusnessRuleDisplay/SearchRule";
import TitleWithdiscriton from "../components/BusnessRuleDisplay/TitleWithdiscriton";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import {  message } from 'antd';

export default function UploadFilePage() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [idupload,setidupload]=useState();
    console.log(idupload);

    const info = () => {
        messageApi.info('the file is loaded!');
      };
    // Log the current state to check the data
    console.log("Current data in UploadFilePage:", data);

    return (
        <div style={{backgroundColor:"#F5F6F6",padding:"1rem",width: "100%",height: "100vh",display:"flex",flexDirection:"column", alignItems:"center",gap:40}}>
            <SearchRule />
            <div style={{backgroundColor:"white",padding:"1rem",borderRadius:"10px",width:"90%",display:"flex",flexDirection:"column",justifyContent:"space-between",height:"80%"}}>
                <TitleWithdiscriton title={"Media Upload"} description={"add your document here, and you can upload up to 5 files max"} />
                <FileUploader setData={setData} data={data} setuploadid={setidupload} info={info}/>
                <p style={{fontSize:"14px",color:"gray"}}>Only support .zip and .txt</p>
                <hr />
                <TitleWithdiscriton title={"Upload From URL"} description={""} />
                <div style={{padding:"1rem",border:"1px solid #4F46E5",borderRadius:"10px",display:"flex",alignItems:"center"}}>
                    <Input variant="borderless" />
                    <Button type="primary">Upload</Button>
                </div>
                <div style={{display:"flex",gap:5,justifyContent:"flex-end"}}>
                    <Button>Cancel</Button>
                    <Button type="primary" onClick={() => { navigate('/MainPage/mainpage', { state: { data } }); }}>
                        Next
                    </Button>
                </div>
            </div>
            {contextHolder}
        </div>
    );
}
