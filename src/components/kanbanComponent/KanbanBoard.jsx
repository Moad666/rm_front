import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';
import { GoPlus } from "react-icons/go";
export default function KanbanBoard(){


    const initialData = {
        columns: {
          'column-1': {
            id: 'column-1',
            title: 'To Do',
            taskIds: ['task-1', 'task-2']
          },
          'column-2': {
            id: 'column-2',
            title: 'In Progress',
            taskIds: ['task-3']
          },
          'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: ['task-4']
          }
        },
        tasks: {
          'task-1': { id: 'task-1', content: 'Take out the trash' },
          'task-2': { id: 'task-2', content: 'Watch my favorite show' },
          'task-3': { id: 'task-3', content: 'Charge my phone' },
          'task-4': { id: 'task-4', content: 'Cook dinner' }
        },
        columnOrder: ['column-1', 'column-2', 'column-3']
    }
    const [data, setData] = useState(initialData);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
    
        if (!destination) return;
    
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }
    
        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];
    
        if (start === finish) {
          const newTaskIds = Array.from(start.taskIds);
          newTaskIds.splice(source.index, 1);
          newTaskIds.splice(destination.index, 0, draggableId);
    
          const newColumn = {
            ...start,
            taskIds: newTaskIds
          };
    
          const newState = {
            ...data,
            columns: {
              ...data.columns,
              [newColumn.id]: newColumn
            }
          };
    
          setData(newState);
          return;
        }
    
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
          ...start,
          taskIds: startTaskIds
        };
    
        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
          ...finish,
          taskIds: finishTaskIds
        };
    
        const newState = {
          ...data,
          columns: {
            ...data.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish
          }
        };
    
        setData(newState);
      };
    
      const addColumn = () => {
        const newColumnId = `column-${Object.keys(data.columns).length + 1}`;
        const newColumn = {
          id: newColumnId,
          title: `Column ${Object.keys(data.columns).length + 1}`,
          taskIds: []
        };
    
        const newState = {
          ...data,
          columns: {
            ...data.columns,
            [newColumnId]: newColumn
          },
          columnOrder: [...data.columnOrder, newColumnId]
        };
    
        setData(newState);
      };

   
    return (
        <div style={{display:"flex",overflowX:"scroll",scrollbarWidth:"none",overflowY:"scroll"}}>

      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map(columnId => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

          return (
            <KanbanColumn key={column.id} column={column} tasks={tasks} />
          );
        })}
                <div style={{display:"flex",backgroundColor:"#D2D1E2",height:"40px",alignItems:"center",padding:"1rem",borderRadius:"10px",margin: 8}}>
      <button onClick={addColumn} style={{width:"364px"}}>Create New Categorie</button>
      <GoPlus/>
      </div>
      </DragDropContext>
    </div>
      );
    };
