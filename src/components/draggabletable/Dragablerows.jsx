import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Dragablerows({ task, index }){
    return (
      <Draggable draggableId={task.id} index={index} key={task.id}>
        {(provided,snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            style={{
              padding: 16,
              margin: '0 0 8px 0',
              backgroundColor: 'white',
              ...provided.draggableProps.style
            }}
          >
            {task.content}
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  };
