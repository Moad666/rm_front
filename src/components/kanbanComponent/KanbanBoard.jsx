import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';
import { GoPlus } from "react-icons/go";
import axios from 'axios';
import {  Button, message } from 'antd';
import MyButton2 from '../BusnessRuleDisplay/Mybotton2';
import MyButton from '../BusnessRuleDisplay/MyButton';
import {  useNavigate } from 'react-router-dom';

const generateUniqueId = () => `_${Math.random().toString(36).substr(2, 9)}`;

export default function KanbanBoard({ rules }) {
    const navigate=useNavigate()
    const [data,setdata]=useState([...rules])
    const [categories, setCategories] = useState([{ id: generateUniqueId(), title: "Default", rules }]);
    const [messageApi, contextHolder] = message.useMessage();


    useEffect(()=>{
        const fetchcategories=async()=>{
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/list_categorie/');
                console.log(response);
                if (response.status===200) {
                    console.log(response);
                    response.data.forEach(element => {
                        element.rules=[];
                        element.id=element.id+"";
                    });
                    setCategories([...categories,...response.data]);
                    } 
            } catch (error) {
                console.error(error);
            }
        }
        fetchcategories();
    },[]);

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = categories.find(category => category.id === source.droppableId);
        const finish = categories.find(category => category.id === destination.droppableId);

        if (start === finish) {
            const newTaskIds = Array.from(start.rules);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, start.rules[source.index]);

            const newCategories = categories.map(category => {
                if (category.id === start.id) {
                    return { ...start, rules: newTaskIds };
                }
                return category;
            });

            setCategories(newCategories);
            return;
        }

        const startTaskIds = Array.from(start.rules);
        const movedTask = start.rules[source.index];
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            rules: startTaskIds
        };

        const finishTaskIds = Array.from(finish.rules);
        finishTaskIds.splice(destination.index, 0, movedTask);
        const newFinish = {
            ...finish,
            rules: finishTaskIds
        };

        const newCategories = categories.map(category => {
            if (category.id === newStart.id) {
                return newStart;
            }
            if (category.id === newFinish.id) {
                return newFinish;
            }
            return category;
        });

        setCategories(newCategories);
        await updateRuleCategory(movedTask, finish.id); // Update rule's category in the backend
    };

    const ondelete=async(categoryId)=>{
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/delete_categorie/${categoryId}`);
            if (response.status === 200) {
                console.log(response);
            const updatedCategories = categories.filter(cat => 
                    cat.id != categoryId
            );
            setCategories(updatedCategories);
            } else {
                messageApi.info('you cannot delete this categorie its contains rules!');
            }
        } catch (error) {
            messageApi.info('you cannot delete this categorie its contains rules!');
        }


    }

    const addColumn = async () => {

        const newColumn = {
            name: `Column ${categories.length + 1}`,
            rules: []
        };

        setCategories([...categories, newColumn]);
        await createCategory(newColumn); // Create new category in the backend
    };

    const handleTitleChange = async (columnId, newTitle) => {
        const newCategories = categories.map(category => {
            if (category.id === columnId) {
                return { ...category, name: newTitle };
            }
            return category;
        });
        setCategories(newCategories);
        await updateCategoryTitle(columnId, newTitle); // Update category title in the backend
    };

    const createCategory = async (category) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create_categorie/', {
                name: category.name,
            });
            if (response.status === 201) {
                console.log(response);
                const newCategory = response.data;
                setCategories(prevCategories => {
                    const updatedCategories = prevCategories.map(cat => {
                        if (cat.id === category.id) {
                            return { ...cat, id: newCategory.id };
                        }
                        return cat;
                    });
                    return updatedCategories;
                });
            } else {
                throw new Error('Failed to create category');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateCategoryTitle = async (categoryId, newTitle) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/update_categorie/${categoryId}`, {
                name: newTitle,
            });
            if (response.status !== 200) {
                throw new Error('Failed to update category title');
            }
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const updateRuleCategory = async (rule, newCategoryId) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/update_rule/${rule.id}`, {
                ...rule,
                categorie: newCategoryId,
            });
            if (response.status !== 200) {
                throw new Error('Failed to update rule category');
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{height:"100%"}}>
        <div style={{ display: "flex", overflowX: "scroll", scrollbarWidth: "none", overflowY: "scroll" }}>
            <DragDropContext onDragEnd={onDragEnd}>
                {categories.map(category => (
                    <KanbanColumn 
                        key={category.id} 
                        title={category.name} 
                        columnid={category.id} 
                        rules={category.rules} 
                        onTitleChange={handleTitleChange} 
                        ondelete={ondelete}
                    
                    />
                ))}
                <div style={{ display: "flex", backgroundColor: "#D2D1E2", height: "40px", alignItems: "center", padding: "1rem", borderRadius: "10px", margin: 8 }}>
                    <button onClick={addColumn} style={{ width: "364px" }}>Create New Category</button>
                    <GoPlus />
                </div>
            </DragDropContext>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"end"}}>

        <Button >cancel</Button>
        <Button>precedent</Button>
        <Button type='primary' onClick={()=>{{console.log(data);navigate('/MainPage/Workflowpage',{ state: { data } })}}} >Validate and Procced</Button>
        
</div>
        </div>
    );
};
