import React from "react";
import { Button } from "antd";
import { Table } from 'antd';
import SearchRule from "../components/BusnessRuleDisplay/SearchRule";
import MyButton from "../components/BusnessRuleDisplay/MyButton";
import MyButton2 from "../components/BusnessRuleDisplay/Mybotton2";
import DraggableTable from "../components/draggabletable/TableDraggable";


export default function BusnessRuleDisplay(){
    const columns = [
      {
            title: 'drag',
            dataIndex: 'drag',
          },
        {
          title: 'N',
          dataIndex: 'n',
          showSorterTooltip: {
            target: 'full-header',
          },
          
          
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          
          sortDirections: ['descend'],
        },
        {
          title: 'Rule Name',
          dataIndex: 'rulename',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Discription',
          dataIndex: 'discription',
        },{
            title: 'Conditions',
            dataIndex: 'conditions',
          },
          {
            title: 'Actions',
            dataIndex: 'actions',
          },
      ];

      const data = [
        
        {
            n: '1',
            rulename:"Minimum Credit Scorev1",
            discription:"Applicants must have a minimum credit score of 650. ",
            conditions:"CreditScore >= 650",
            actions:"Proceed to Next Step",
        },
        {
          n: '2',
          rulename:"Minimum Credit Score2",
          discription:"Applicants must have a minimum credit score of 650. ",
          conditions:"CreditScore >= 650",
          actions:"Proceed to Next Step",
      },
      {
        n: '3',
        rulename:"Minimum Credit Score3",
        discription:"Applicants must have a minimum credit score of 650. ",
        conditions:"CreditScore >= 650",
        actions:"Proceed to Next Step",
    },
    {
      n: '4',
      rulename:"Minimum Credit Score4",
      discription:"Applicants must have a minimum credit score of 650. ",
      conditions:"CreditScore >= 650",
      actions:"Proceed to Next Step",
  }
        
      ];

      

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

    return <div style={{backgroundColor:"#F5F6F6",padding:"1rem",width: "100%",height: "100vh",display:"flex",flexDirection:"column", alignItems:"center"}}>
    

    
        <SearchRule/>



    <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",flexDirection:"column",height:"85%"}}>


    <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      
    <div style={{margin:"20px 0 20px 0"}} >
        <h1 style={{fontSize:"18px",fontWeight:700}}>
        Busness Rules Display
        </h1>
        <p style={{fontSize:"14px",color:"gray"}}>
        validate the imported rules in this section .By Modifiyng , deleting or even adding .
        </p>
    </div>

    <div >
    <Button type="primary">Add Rule</Button>
    </div>
    </div>

    

    <DraggableTable
    style={{width:"100%"}}
    columns={columns}
    initialData={data}
    onChange={onChange}
  />

  
    </div>
    <div style={{display:"flex",width:"100%",gap:10,justifyContent:"end"}}>
        
        <Button style={{fontSize:"12px",height:"40px"}}>cancel</Button>
        <MyButton2 text="precedent"/>
        <MyButton text="Validate and Procced"/>
        
    </div>

    </div>
   
   
}