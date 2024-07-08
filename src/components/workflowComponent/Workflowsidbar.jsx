import React from 'react';
import { RiDraggable } from "react-icons/ri";
import { Input, Space } from 'antd';
const { Search } = Input;

export default function Workflowsidbar({rules,logicalnodes}) {
  const onDragStart = (event, nodeType, nodeName) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.setData('application/reactflow/name', nodeName);
    event.dataTransfer.effectAllowed = 'move';
  };



  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <aside >
        <p  href="#" onClick={()=>{console.log("hi")}} style={{textAlign:"right",color:"#4F46E5",margin:"10px 0 10px 0"}}><b>Save and Close</b></p>
        <Search
      placeholder="input search text"
      allowClear
      onSearch={onSearch}
      
    />

       <div style={{margin:"10px 0 10px 0"}}><b>Logical Nodes</b></div>
      {logicalnodes.map(element=><div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, element.type,element.data.label)}
        draggable style={{padding:"1rem",borderRadius:"5px",display:"flex",gap:20}}
      > <b style={{fontSize:"12px"}}>{element.data.label}</b><RiDraggable/>
      </div>)}

      <div style={{margin:"10px 0 10px 0"}}><b>Rule Nodes</b></div>

      {rules.map(element=><div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, 'default',element.ruleName)}
        draggable style={{padding:"1rem",borderRadius:"5px",display:"flex",gap:20}}
      > <b style={{fontSize:"12px"}}>{element.ruleName}</b><RiDraggable/>
      </div>)}
      
    </aside>
  );
}
