import React, { useState } from "react";
import SearchRule from "../components/BusnessRuleDisplay/SearchRule";
import Popup from "../components/CreateRule/CreateRules";
import { Button, Dropdown, Menu, message, Modal, Input } from "antd";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const items = [
  { label: "Delete", key: "1" },
  { label: "Update", key: "2" }
];

function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data || [];
  console.log("Data received in MainPage:", data);

  const [showPopup, setShowPopup] = useState(false);
  const [rules, setRules] = useState([...data]);
  const [editRule, setEditRule] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [ruleName, setRuleName] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [action, setAction] = useState('');
  const [id, setId] = useState('');

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleEditOk = async () => {
    try {
      console.log(editRule)
      const response = await axios.put(`http://127.0.0.1:8000/api/update_rule/${editRule.id}`, {
        ruleName : ruleName,
        description : description,
        condition, condition,
        action: action
      });
      if (response.status === 200) {
        const updatedData = rules.map(item => item.id === response.data.id? response.data : item);
        setRules(updatedData);
        setEditRule(null);
        setIsEditModalOpen(false);
        message.success("Rule updated successfully");
      }
    } catch (error) {
      console.error("There was an error updating the rule!", error);
      message.error("Failed to update rule");
    }
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditRule(null);
  };

  const handleMenuClick = async (e, ruleId) => {
    if (e.key === "1") {
      // Delete rule
      try {
        const response = await axios.delete(`http://localhost:8000/api/delete_rule/${ruleId}`);
        if (response.status === 204) {
          setRules(rules.filter(rule => rule.id !== ruleId));
          message.success("Rule deleted successfully");
        }
      } catch (error) {
        message.error("Failed to delete rule");
        console.error(error);
      }
    } else if (e.key === "2") {
      // Update rule
      const ruleToEdit = rules.find(rule => rule.id === ruleId);
      setEditRule(ruleToEdit);
      setIsEditModalOpen(true);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <SearchRule />
      <div className="w-full">
        <div className="content p-4">
          <div className="flex justify-end space-x-4 mt-20">
            <button type="button" className="flex items-center text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 01.707 1.707L13 9.414V14a1 1 0 01-.293.707l-2 2A1 1 0 019 16V9.414l-3.707-3.707A1 1 0 015 5z" clipRule="evenodd" />
              </svg>
              Filter
            </button>
            <button type="button" className="flex items-center text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none" onClick={togglePopup}>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.7 2.3a1 1 0 0 1 1.5 1.4l-1.8 1.8a3 3 0 0 0-3.6 4.5L7 14l-1.7-1.7a1 1 0 1 0-1.4 1.4L6.3 16l-2.6 2.6a1 1 0 0 1-1.4-1.4L4 13.7l1.8 1.8a3 3 0 0 0 4.5-3.6l1.8-1.8A1 1 0 0 1 14.7 2.3zM9.3 7.3a1 1 0 0 1 0-1.4l4.6-4.6a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1-1.4 1.4L12 4.4l-1.3 1.3a1 1 0 0 1-1.4 0L9.3 7.3z" />
              </svg>
              Create Rules
            </button>
          </div>
        </div>
        {showPopup && <Popup show={showPopup} onClose={togglePopup} />}

        <div className="Table mt-8 ml-28 mr-5">
          <div className="relative overflow-x-auto bg-white border border-gray-300 rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center mb-4">
                      <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Condition</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => (
                  <tr key={rule.id} className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      </div>
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{rule.ruleName}</th>
                    <td className="px-6 py-4">{rule.description}</td>
                    <td className="px-6 py-4">{rule.condition}</td>
                    <td className="px-6 py-4 relative">
                      {rule.action}
                      <Dropdown overlay={<Menu onClick={(e) => handleMenuClick(e, rule.id)} items={items} />} trigger={["click"]}>
                        <button type="button" className="absolute right-0 p-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M2 9a2 2 0 100-4 2 2 0 000 4zM8 9a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, justifyContent: "flex-end", margin: "1rem 0 1rem 0" }}>
        <Button onClick={() => navigate('/MainPage')}>Cancel</Button>
        <Button type="primary" onClick={() => { navigate('/MainPage/displayrules', { state: { rules } }); }}>
          Next
        </Button>
      </div>
      <Modal open={isEditModalOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
      
        <p>Rule name</p>
        <Input value={ruleName} onChange={(e) => setRuleName( e.target.value )} />
        <p>Description</p>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        <p>Condition</p>
        <Input value={condition} onChange={(e) => setCondition( e.target.value )} />
        <p>Action</p>
        <Input value={action} onChange={(e) => setAction(e.target.value )} />
        
      </Modal>
    </div>
  );
}

export default MainPage;
