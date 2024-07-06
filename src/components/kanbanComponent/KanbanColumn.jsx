import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { Button } from "antd";
import {Popover} from "antd";

export default function KanbanColumn({ title, columnid, rules, onTitleChange,ondelete}) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [open, setOpen] = useState(false);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onTitleChange(columnid, newTitle);
    };

    return (
        <div style={{ margin: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#D2D1E2", padding: "1rem", borderRadius: "10px 10px 0 0" }}>
                {isEditing ? (
                    <input 
                        type="text" 
                        value={newTitle} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        autoFocus 
                        style={{ flexGrow: 1, marginRight: "0.5rem" }}
                    />
                ) : (
                    <h3 onDoubleClick={handleDoubleClick}>{title}</h3>
                )}
                <Popover
      content={<div><Button onClick={()=>{ondelete(columnid)}}>delete</Button><a onClick={()=>{setOpen(!open)}}>Close</a></div>}
      open={open}
      
    >
      <PiDotsThreeOutlineLight onClick={()=>{setOpen(!open)}}/>
    </Popover>
                
            </div>
            <Droppable droppableId={columnid} >
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        style={{ backgroundColor: '#D2D1E2', padding: 8, width: "363px", borderRadius: "0 0 10px 10px",maxHeight:"400px" ,overflowY:"scroll",scrollbarWidth: "none"}}
                    >
                        {rules.map((element, index) => (
                            <Task key={element.id} task={element} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};
