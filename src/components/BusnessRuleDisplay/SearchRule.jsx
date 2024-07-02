import React from "react";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);
export default function SearchRule(){
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    return <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"}}>

    <div>
        <h1 style={{fontSize:"18px",fontWeight:700}}>
        Rules
        </h1>
        <p style={{fontSize:"12px",color:"gray"}}>
            {"Main Page > Rules > Create Rule"}
        </p>
    </div>
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />


        </div>

}