import axios from "axios";
import React, { useState } from "react";
import { NotificationContainer, NotificationManager, Notifications } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Popup({ show, onClose }) {
  const [ruleName, setRuleName] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [action, setAction] = useState("");

  const createRule = async (e) => {
    // stop the form from reloading the page
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create_rule/",
        {
          ruleName: ruleName,
          description: description,
          condition: condition,
          action: action,
        }
      );
      NotificationManager.success('Rule created successfully');
      //onClose(); 
    } catch (err) {
      //NotificationManager.error("Rule not created");
    }
  };

  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-50 relative w-1/4">
        <h2 className="text-xl mb-4 text-center">
          <b>Create Rule</b>
        </h2>
        <button className="absolute top-0 right-0 mt-4 mr-4" onClick={onClose}>
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
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Action
            </label>
            <input
              type="text"
              value={action}
              onChange={(e) => setAction(e.target.value)}
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
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default Popup;
