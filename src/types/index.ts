// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: string;
}

// Flow Builder types
export interface FlowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay';
  position: { x: number; y: number };
  data: {
    label: string;
    config: Record<string, any>;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface Flow {
  id: string;
  name: string;
  description?: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Contact types
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  tags: string[];
  status: 'active' | 'inactive' | 'blocked';
  lastInteraction?: string;
  createdAt: string;
}

// Analytics types
export interface AnalyticsData {
  totalContacts: number;
  totalFlows: number;
  activeFlows: number;
  totalMessages: number;
  conversionRate: number;
  messagesByDay: { date: string; count: number }[];
}

// Chat types
export interface Message {
  id: string;
  contactId: string;
  content: string;
  type: 'sent' | 'received';
  timestamp: string;
}

export interface Conversation {
  id: string;
  contact: Contact;
  messages: Message[];
  status: 'open' | 'closed';
  lastMessage?: Message;
}