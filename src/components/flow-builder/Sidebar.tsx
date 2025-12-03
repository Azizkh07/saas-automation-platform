// src/components/flow-builder/Sidebar.tsx
import { 
  BoltIcon, 
  ChatBubbleLeftRightIcon, 
  ClockIcon, 
  QuestionMarkCircleIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';

interface NodeTemplate {
  type: string;
  label: string;
  icon: any;
  color: string;
  description: string;
}

const nodeTemplates: NodeTemplate[] = [
  {
    type: 'trigger',
    label: 'New Contact',
    icon: BoltIcon,
    color: 'blue',
    description: 'Start flow when a new contact is added',
  },
  {
    type: 'trigger',
    label: 'Form Submit',
    icon: BoltIcon,
    color: 'blue',
    description: 'Trigger when form is submitted',
  },
  {
    type: 'action',
    label: 'Send Email',
    icon: EnvelopeIcon,
    color: 'purple',
    description: 'Send an email to the contact',
  },
  {
    type: 'action',
    label: 'Send SMS',
    icon: DevicePhoneMobileIcon,
    color: 'purple',
    description: 'Send an SMS message',
  },
  {
    type: 'action',
    label: 'Send Message',
    icon: ChatBubbleLeftRightIcon,
    color: 'purple',
    description: 'Send a message via chat',
  },
  {
    type: 'condition',
    label: 'If/Else',
    icon: QuestionMarkCircleIcon,
    color: 'yellow',
    description: 'Branch based on condition',
  },
  {
    type: 'delay',
    label: 'Wait',
    icon: ClockIcon,
    color: 'orange',
    description: 'Add a time delay',
  },
];

export function FlowBuilderSidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Flow Builder</h3>
        <p className="text-sm text-gray-600">
          Drag and drop nodes to create your automation flow
        </p>
      </div>

      <div className="space-y-3">
        {nodeTemplates.map((template, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => onDragStart(e, template.type, template.label)}
            className={`p-3 rounded-xl border-2 cursor-move transition-all hover:shadow-md
              ${template.color === 'blue' ? 'border-blue-200 bg-blue-50 hover:border-blue-400' : ''}
              ${template.color === 'purple' ? 'border-purple-200 bg-purple-50 hover:border-purple-400' : ''}
              ${template.color === 'yellow' ? 'border-yellow-200 bg-yellow-50 hover:border-yellow-400' : ''}
              ${template.color === 'orange' ? 'border-orange-200 bg-orange-50 hover:border-orange-400' : ''}
            `}
          >
            <div className="flex items-center gap-3">
              <template.icon 
                className={`w-6 h-6
                  ${template.color === 'blue' ? 'text-blue-600' : ''}
                  ${template.color === 'purple' ? 'text-purple-600' : ''}
                  ${template.color === 'yellow' ? 'text-yellow-600' : ''}
                  ${template.color === 'orange' ? 'text-orange-600' : ''}
                `}
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">
                  {template.label}
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  {template.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
        <h4 className="font-semibold text-gray-900 text-sm mb-2">💡 Quick Tips</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Drag nodes onto the canvas</li>
          <li>• Connect nodes by dragging handles</li>
          <li>• Click nodes to edit settings</li>
          <li>• Use conditions to create branches</li>
        </ul>
      </div>
    </div>
  );
}
