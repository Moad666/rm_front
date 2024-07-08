import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { RiDraggable } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

const DraggableTable = ({ rows, columns, setdata, setEditRule, setIsEditModalOpen }) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(rows);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setdata(items);
  };

  const modify = (row) => {
    setEditRule(row);
    setIsEditModalOpen(true);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="table">
        {(provided) => (
          <table {...provided.droppableProps} ref={provided.innerRef}>
            <thead>
              <tr style={{ backgroundColor: "#f2f4f8" }}>
                {columns.map(element => <th key={element.dataIndex} style={{ padding: "1rem", fontSize: "14px" ,border:"1px 0px 1px 0px solid gainsboro"}}>{element.title}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <Draggable key={row.id} draggableId={row.id+""} index={index} >
                  {(provided) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <td style={{ padding: "1rem", fontSize: "14px", backgroundColor: "white",border:"1px 0px 1px 0px solid gainsboro"}}><RiDraggable /></td>
                      <td style={{ padding: "1rem", fontSize: "14px", backgroundColor: "white" ,border:"1px solid gainsboro"}}>{index}</td>
                      <td style={{ padding: "1rem", fontSize: "14px", backgroundColor: "white" ,border:"1px solid gainsboro"}}>{row.ruleName}</td>
                      <td style={{ padding: "1rem", fontSize: "14px", backgroundColor: "white" ,border:"1px solid gainsboro"}}>{row.description}</td>
                      <td style={{ padding: "1rem", fontSize: "14px", backgroundColor: "white" ,border:"1px solid gainsboro"}}>{row.condition}</td>
                      <td style={{ padding: "1rem", fontSize: "14px", backgroundColor: "white", display: "flex", alignItems: "center", gap: 5 ,border:"1px solid gainsboro"}}>
                        <div style={{whidth:"80%"}}>{row.action}</div>
                        <div><FaEdit  onClick={() => modify(row)} /></div>
                      </td>
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
