import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import SearchRule from "../components/BusnessRuleDisplay/SearchRule";
import MyButton2 from "../components/BusnessRuleDisplay/Mybotton2";
import DraggableTable from "../components/draggabletable/TableDraggable";

export default function BusnessRuleDisplay() {
  const navigate = useNavigate();

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
      sortDirections: ['descend'],
    },
    {
      title: 'Rule Name',
      dataIndex: 'ruleName',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.ruleName.localeCompare(b.ruleName),
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Conditions',
      dataIndex: 'condition',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
    },
  ];

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rule, setRule] = useState({ ruleName: "", description: "", condition: "", action: "" });
  const [editRule, setEditRule] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/list_rule/');
        if (response.status === 200) {
          console.log(response.data);
          setData(response.data);
        }
      } catch (error) {
        console.error("There was an error fetching the rules!", error);
      }
    };
    fetchData();
  }, []);

  const handleOk = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/create_rule/', rule);
      if (response.status === 201) {
        
        setData([...data, { ...response.data, n: (data.length + 1).toString() }]);
        setRule({ ruleName: "", description: "", condition: "", action: "" });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("There was an error creating the rule!", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditOk = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/update_rule/${editRule.id}`, editRule);
      if (response.status === 200) {
        const updatedData = data.map(item => item.id === editRule.id ? editRule : item);
        setData(updatedData);
        setEditRule(null);
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("There was an error updating the rule!", error);
    }
  };

  const handleEditCancel = () => {
    setEditRule(null);
    setIsEditModalOpen(false);
  };

  const nextPage = () => {
    navigate('/MainPage/rulekanban', { state: { data } });
  };

  return (
    <div style={{ backgroundColor: "#F5F6F6", padding: "1rem", width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <SearchRule />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", flexDirection: "column", height: "85%" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ margin: "20px 0 20px 0" }}>
            <h1 style={{ fontSize: "18px", fontWeight: 700 }}>
              Business Rules Display
            </h1>
            <p style={{ fontSize: "14px", color: "gray" }}>
              Validate the imported rules in this section by modifying, deleting, or even adding.
            </p>
          </div>
          <div>
            <Button onClick={showModal} type="primary">Add Rule</Button>
          </div>
        </div>
<div style={{maxHeight:"400px",overflowY:"scroll" ,scrollbarWidth: "none"}}>
        <DraggableTable

          style={{ width: "100%" }}
          columns={columns}
          rows={data}
          setdata={setData}
          setEditRule={setEditRule}
          setIsEditModalOpen={setIsEditModalOpen}
        /></div>
      </div>
      <div style={{ display: "flex", width: "100%", gap: 10, justifyContent: "end" }}>
        <Button style={{ fontSize: "12px", height: "40px" }}>Cancel</Button>
        <MyButton2 text="Precedent" />
        <Button type="primary" onClick={nextPage}>Validate and Proceed</Button>
      </div>

      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Rule name</p>
        <Input value={rule.ruleName} onChange={(e) => setRule({ ...rule, ruleName: e.target.value })} />
        <p>Description</p>
        <Input value={rule.description} onChange={(e) => setRule({ ...rule, description: e.target.value })} />
        <p>Condition</p>
        <Input value={rule.condition} onChange={(e) => setRule({ ...rule, condition: e.target.value })} />
        <p>Action</p>
        <Input value={rule.action} onChange={(e) => setRule({ ...rule, action: e.target.value })} />
      </Modal>
      <Modal open={isEditModalOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
        <p>Rule name</p>
        <Input value={editRule?.ruleName} onChange={(e) => setEditRule({ ...editRule, ruleName: e.target.value })} />
        <p>Description</p>
        <Input value={editRule?.description} onChange={(e) => setEditRule({ ...editRule, description: e.target.value })} />
        <p>Condition</p>
        <Input value={editRule?.condition} onChange={(e) => setEditRule({ ...editRule, condition: e.target.value })} />
        <p>Action</p>
        <Input value={editRule?.action} onChange={(e) => setEditRule({ ...editRule, action: e.target.value })} />
      </Modal>
    </div>
  );
}
