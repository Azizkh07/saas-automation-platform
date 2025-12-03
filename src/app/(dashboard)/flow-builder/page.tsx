// src/app/(dashboard)/flow-builder/page.tsx
'use client';

import { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { FlowBuilderSidebar } from '@/components/flow-builder/Sidebar';
import { TriggerNode, ActionNode, ConditionNode, DelayNode } from '@/components/flow-builder/NodeTypes';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  PlayIcon,
  PauseIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  delay: DelayNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 50 },
    data: { label: 'New Contact' },
  },
];

const initialEdges: Edge[] = [];

export default function FlowBuilderPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [flowName, setFlowName] = useState('Untitled Flow');
  const [isActive, setIsActive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  let idCounter = useRef(2);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('label');

      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: `${idCounter.current++}`,
        type,
        position,
        data: { label },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const handleSave = () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      setShowSaveModal(false);
      alert('Flow saved successfully!');
    }, 1000);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the flow?')) {
      setNodes(initialNodes);
      setEdges([]);
      idCounter.current = 2;
    }
  };

  const handleExport = () => {
    const flowData = {
      name: flowName,
      nodes,
      edges,
      isActive,
    };
    const dataStr = JSON.stringify(flowData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${flowName.replace(/\s+/g, '-').toLowerCase()}.json`;
    link.click();
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <FlowBuilderSidebar />

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
                className="text-lg font-bold border-none focus:ring-2 focus:ring-blue-500"
                placeholder="Flow name..."
              />
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                className="gap-2"
              >
                <TrashIcon className="w-4 h-4" />
                Clear
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="gap-2"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Export
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsActive(!isActive)}
                className="gap-2"
              >
                {isActive ? (
                  <>
                    <PauseIcon className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-4 h-4" />
                    Activate
                  </>
                )}
              </Button>

              <Button
                size="sm"
                onClick={() => setShowSaveModal(true)}
                className="gap-2"
              >
                <DocumentDuplicateIcon className="w-4 h-4" />
                Save Flow
              </Button>
            </div>
          </div>
        </div>

        {/* React Flow Canvas */}
        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-50"
          >
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            <Controls />
            <MiniMap
              nodeStrokeWidth={3}
              zoomable
              pannable
              className="bg-white border border-gray-200 rounded-lg"
            />
          </ReactFlow>
        </div>

        {/* Stats Bar */}
        <div className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-6">
              <span>Nodes: <strong className="text-gray-900">{nodes.length}</strong></span>
              <span>Connections: <strong className="text-gray-900">{edges.length}</strong></span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs">💡 Tip: Drag nodes from the sidebar to build your flow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      <Modal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Save Flow"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to save this flow? This will update the automation.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Flow Summary</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Name: <strong>{flowName}</strong></p>
              <p>• Nodes: <strong>{nodes.length}</strong></p>
              <p>• Connections: <strong>{edges.length}</strong></p>
              <p>• Status: <strong>{isActive ? 'Active' : 'Inactive'}</strong></p>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowSaveModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              isLoading={isSaving}
            >
              Save Flow
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
