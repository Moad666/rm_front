import React from "react";
import ItemSidebar from "./ItemSidebar";
import { RxDashboard } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { CiSliderVertical } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";

export default function Sidebar2(){

    return <div style={{display:"flex",flexDirection:"column",height:"100vh",width:"76px",backgroundColor:"white",alignItems:"center"}}>


<ItemSidebar icon={<CiShare2/>} link={"/MainPage/rulekanban"}/>
<ItemSidebar icon={<CiGrid41/>} link={"/MainPage/displayrules"}/>
<ItemSidebar icon={<CiBellOn/>} link={"/MainPage/mainpage"}/>
<ItemSidebar icon={<CiCircleInfo/>} link={"/MainPage/FileUploader"}/>
<ItemSidebar icon={<CiSliderVertical/>} link={"/MainPage/Workflowpage"}/>
<ItemSidebar icon={<CiSettings/>} link={"/"}/>



    </div>


}