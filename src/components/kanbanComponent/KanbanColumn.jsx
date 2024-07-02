import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import { PiDotsThreeOutlineLight } from "react-icons/pi";

export default function KanbanColumn({ column, tasks }) {
    return (
      <div style={{ margin: 8, }}>
        <div style={{display:"flex",justifyContent:"space-between",backgroundColor:"#D2D1E2",padding:"1rem",borderRadius:" 10px 10px 0 0 "}}>
        <h3>{column.title}</h3>
        <PiDotsThreeOutlineLight />
        </div>
        
        <Droppable  droppableId={column.id} >
          {(provided,snapshot) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
              style={{ backgroundColor: '#D2D1E2', padding: 8, width: "363px" ,borderRadius:" 0 0 10px 10px"}}
            >
              {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  };

