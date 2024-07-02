import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { RiDraggable } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";




const DraggableTable = ({initialData,columns}) => {
  const [data, setData] = useState(initialData);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="table">
        {(provided) => (
          <table {...provided.droppableProps} ref={provided.innerRef}>
            <thead>
              <tr style={{backgroundColor:"#f2f4f8"}}>
                {columns.map(element=><th style={{padding:"1rem",fontSize:"14px"}}>{element.title}</th>)}
              </tr>
            </thead>
            <tbody >
              {data.map((row, index) => (
                <Draggable  key={row.n} draggableId={row.n} index={index}>
                  {(provided) => (
                    <tr 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                     <td style={{padding:"1rem",fontSize:"14px",backgroundColor:"white"}}><RiDraggable/> </td>
                      <td style={{padding:"1rem",fontSize:"14px",backgroundColor:"white"}}>{index}</td>
                      <td style={{padding:"1rem",fontSize:"14px",backgroundColor:"white"}}>{row.rulename}</td>
                      <td style={{padding:"1rem",fontSize:"14px",backgroundColor:"white"}}>{row.discription}</td>
                      <td style={{padding:"1rem",fontSize:"14px",backgroundColor:"white"}}>{row.conditions}</td>
                      <td style={{padding:"1rem",fontSize:"14px",backgroundColor:"white",display:"flex",alignItems:"center",gap:5}}>{row.actions}<FaEdit /></td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          </table>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableTable;