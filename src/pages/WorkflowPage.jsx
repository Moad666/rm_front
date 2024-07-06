import React, { useState, useRef, useCallback } from 'react';

import ReactFlow, {
  Background,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Workflowsidbar from '../components/workflowComponent/Workflowsidbar';

import '../index.css';


const data = [
        
    {
        n: '1',
        rulename:"Minimum Credit Scorev1",
        discription:"Applicants must have a minimum credit score of 650. ",
        conditions:"CreditScore >= 650",
        actions:"Proceed to Next Step",
    },
    {
      n: '2',
      rulename:"Minimum Credit Score2",
      discription:"Applicants must have a minimum credit score of 650. ",
      conditions:"CreditScore >= 650",
      actions:"Proceed to Next Step",
  },
  {
    n: '3',
    rulename:"Minimum Credit Score3",
    discription:"Applicants must have a minimum credit score of 650. ",
    conditions:"CreditScore >= 650",
    actions:"Proceed to Next Step",
},
{
  n: '4',
  rulename:"Minimum Credit Score4",
  discription:"Applicants must have a minimum credit score of 650. ",
  conditions:"CreditScore >= 650",
  actions:"Proceed to Next Step",
}];

const logicalnodes = [
 {  
    type: 'input',
    data: { label: 'input node' },
  }, 
  {
  
    type: 'output',
    data: { label: 'output node' },
  
  },      
]

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
 
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const WorkflowPage = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow/type');
      const name = event.dataTransfer.getData('application/reactflow/name');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: name },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );


  const onNodesDelete = useCallback(
    (deletedNodes) => {
      setNodes((nds) => nds.filter((node) => !deletedNodes.some((dn) => dn.id === node.id)));
    },
    [setNodes]
  );


  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Workflowsidbar  rules={data} logicalnodes={logicalnodes}/>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodesDelete={onNodesDelete}
            fitView
            onNod
          >
            <Controls  />
            <Background variant="cross"  gap={12} size={2} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowPage;


    



