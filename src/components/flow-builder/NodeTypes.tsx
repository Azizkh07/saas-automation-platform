// src/components/flow-builder/NodeTypes.tsx
import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import {
  BoltIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';

export const TriggerNode = memo(({ data }: NodeProps) => {
  return (
    <div className="px-4 py-3 shadow-lg rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-400 min-w-[200px]">
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-blue-300" />
      <div className="flex items-center gap-2 text-white">
        <BoltIcon className="w-5 h-5" />
        <div>
          <div className="text-xs font-medium opacity-80">Trigger</div>
          <div className="font-bold">{data.label}</div>
        </div>
      </div>
    </div>
  );
});

TriggerNode.displayName = 'TriggerNode';

export const ActionNode = memo(({ data }: NodeProps) => {
  const getIcon = () => {
    if (data.actionType === 'email') return <EnvelopeIcon className="w-5 h-5" />;
    if (data.actionType === 'sms') return <DevicePhoneMobileIcon className="w-5 h-5" />;
    return <ChatBubbleLeftRightIcon className="w-5 h-5" />;
  };

  return (
    <div className="px-4 py-3 shadow-lg rounded-xl bg-white border-2 border-purple-400 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-purple-300" />
      <div className="flex items-center gap-2 text-gray-900">
        <div className="text-purple-600">{getIcon()}</div>
        <div>
          <div className="text-xs font-medium text-gray-500">Action</div>
          <div className="font-bold">{data.label}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-purple-300" />
    </div>
  );
});

ActionNode.displayName = 'ActionNode';

export const ConditionNode = memo(({ data }: NodeProps) => {
  return (
    <div className="px-4 py-3 shadow-lg rounded-xl bg-white border-2 border-yellow-400 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-yellow-300" />
      <div className="flex items-center gap-2 text-gray-900">
        <QuestionMarkCircleIcon className="w-5 h-5 text-yellow-600" />
        <div>
          <div className="text-xs font-medium text-gray-500">Condition</div>
          <div className="font-bold">{data.label}</div>
        </div>
      </div>
      <div className="flex justify-between mt-2 gap-4">
        <Handle
          type="source"
          position={Position.Bottom}
          id="true"
          className="w-3 h-3 !bg-green-400"
          style={{ left: '30%' }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="false"
          className="w-3 h-3 !bg-red-400"
          style={{ left: '70%' }}
        />
      </div>
    </div>
  );
});

ConditionNode.displayName = 'ConditionNode';

export const DelayNode = memo(({ data }: NodeProps) => {
  return (
    <div className="px-4 py-3 shadow-lg rounded-xl bg-white border-2 border-orange-400 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-orange-300" />
      <div className="flex items-center gap-2 text-gray-900">
        <ClockIcon className="w-5 h-5 text-orange-600" />
        <div>
          <div className="text-xs font-medium text-gray-500">Delay</div>
          <div className="font-bold">{data.label}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-orange-300" />
    </div>
  );
});

DelayNode.displayName = 'DelayNode';
