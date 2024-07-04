import React, { useState, useEffect } from "react";
import SearchRule from "../components/BusnessRuleDisplay/SearchRule";

import { Dropdown, Menu, notification } from "antd";
import { NotificationContainer, NotificationManager } from "react-notifications";
import axios from "axios";

import { SmileOutlined } from '@ant-design/icons';

function MainPage() {
  
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (description,message) => {
    api.open({
      message: message,
    });}
  
  const [showPopup, setShowPopup] = useState(false);
  const [rules, setRules] = useState([]);

  const [rule,setRule]=useState({
    id:null,
    Name:"",
    Description:"",
    Condition:"",
    Action:"",
    Modify:false
  })
 

  const resetRule=()=>{
    setRule({
      id:null,
      Name: "",
      Description: "",
      Condition: "",
      Action: "",
      Modify:false
    });
  }

  const handleChange = (e)=>{
    const name=e.target.name
    setRule(prev=>({...prev,[name]:e.target.value}))
  }

  const createRule = async (e) => {
    // stop the form from reloading the page
    e.preventDefault();
    try {
      if(rule.Modify){
        const response = await axios.put(`http://127.0.0.1:8000/api/update_rule/${rule.id}`,{
          ruleName: rule.Name,
          description: rule.Description,
          condition: rule.Condition,
          action: rule.Action,

        })
        resetRule()
        openNotification("success","Rule Modified successfully")
        //NotificationManager.success('Rule Modified successfully');
        fetchRules()
        //setShowPopup(false)
        return
      }
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create_rule",
        {
          ruleName: rule.Name,
          description: rule.Description,
          condition: rule.Condition,
          action: rule.Action,
        }
      );
      resetRule()
      fetchRules()
      openNotification("success","Rule created successfully")
      //NotificationManager.success('Rule created successfully');
      //setShowPopup(false)
      //onClose(); 
    } catch (err) {
      //NotificationManager.error("Rule not created");
    }
  };


  

  const fetchRules = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/list_rule");
      const data = await response.json();
      setRules(data);
      //setLoading(false);
    } catch (error) {
      console.error("Error fetching rules:", error);
      //setLoading(false);
    }
  };

  const deleterule = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/delete_rule/${id}`, {
        method: "DELETE"
      });
      fetchRules(); // Refresh rules after deletion
    } catch (error) {
      console.error("Error deleting rule:", error);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);



 

  return (
    <>
    {contextHolder}

     <div className={`fixed inset-0 flex items-center justify-center z-50 ${showPopup ? '' : 'hidden'}`}>

      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-50 relative w-1/4">
        <h2 className="text-xl mb-4 text-center">
        <b>{rule.Modify ? 'Modify Rule' : 'Create Rule'}</b>
        </h2>
        <button className="absolute top-0 right-0 mt-4 mr-4" onClick={()=>{setShowPopup(false);resetRule()}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <form onSubmit={createRule}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rule Name
            </label>
            <input
              type="text"
              name="Name"
              value={rule.Name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="Description"
              value={rule.Description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <input
              type="text"
              name="Condition"
              value={rule.Condition}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Action
            </label>
            <input
              type="text"
              name="Action"
              value={rule.Action}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mr-2 bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              onClick={()=>setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <NotificationContainer />
    </div>
    <div className="">
      <SearchRule />
      <div className="w-full">
        <div className="content p-4">
          <div className="flex justify-end space-x-4 mt-20">
            <button
              type="button"
              className="flex items-center text-blue-500 bg-white border border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 01.707 1.707L13 9.414V14a1 1 0 01-.293.707l-2 2A1 1 0 019 16V9.414l-3.707-3.707A1 1 0 015 5z"
                  clipRule="evenodd"
                />
              </svg>
              Filter
            </button>
            <button
              type="button"
              className="flex items-center text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
              onClick={() => setShowPopup(true)}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.7 2.3a1 1 0 0 1 1.5 1.4l-1.8 1.8a3 3 0 0 0-3.6 4.5L7 14l-1.7-1.7a1 1 0 1 0-1.4 1.4L6.3 16l-2.6 2.6a1 1 0 0 1-1.4-1.4L4 13.7l1.8 1.8a3 3 0 0 0 4.5-3.6l1.8-1.8A1 1 0 0 1 14.7 2.3zM9.3 7.3a1 1 0 0 1 0-1.4l4.6-4.6a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1-1.4 1.4L12 4.4l-1.3 1.3a1 1 0 0 1-1.4 0L9.3 7.3z" />
              </svg>
              Create Rules
            </button>
          </div>
        </div>

        <div className="Table mt-8 ml-28 mr-5">
          <div className="relative overflow-x-auto bg-white border border-gray-300 rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center mb-4">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Condition
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => (
                  <tr key={rule.id} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <div className="flex items-center mb-4">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{rule.ruleName}</td>
                    <td className="px-6 py-4">{rule.description}</td>
                    <td className="px-6 py-4">{rule.condition}</td>
                    <td className="px-6 py-4 relative">{rule.action}</td>
                    <td>
                      <button className="mr-2 p-4 border-2 border-indigo-500 rounded-xl hover:bg-blue-500 hover:text-black" onClick={() =>{ setShowPopup(true); // Show the popup // Set the selected rule ID
                        setRule({
                          "id":rule.id,
                          "Name":rule.ruleName,
                          "Description":rule.description,
                          "Condition":rule.condition,
                          "Action":rule.action,
                          "Modify":true
                      })
                      }}>Modify</button>
                      <button className="p-4 border-2 border-indigo-500 rounded-xl hover:bg-red-500 hover:text-black" onClick={() => deleterule(rule.id)}> DELETE</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </div>
    </>
  );
}
export default MainPage;
