// src/app/(dashboard)/live-chat/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  EllipsisVerticalIcon,
  FaceSmileIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

// Types
interface Message {
  id: number;
  conversationId: number;
  sender: 'agent' | 'contact';
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: number;
  contact: {
    name: string;
    avatar: string;
    status: 'online' | 'offline' | 'away';
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isTyping: boolean;
}

// Mock Data
const mockConversations: Conversation[] = [
  {
    id: 1,
    contact: { name: 'John Doe', avatar: '👨', status: 'online' },
    lastMessage: 'Hello, I need help with my order',
    timestamp: '2 min ago',
    unreadCount: 2,
    isTyping: false,
  },
  {
    id: 2,
    contact: { name: 'Jane Smith', avatar: '👩', status: 'online' },
    lastMessage: 'Thank you so much!',
    timestamp: '15 min ago',
    unreadCount: 0,
    isTyping: false,
  },
  {
    id: 3,
    contact: { name: 'Bob Johnson', avatar: '👨‍💼', status: 'offline' },
    lastMessage: 'When can I expect delivery?',
    timestamp: '1 hour ago',
    unreadCount: 1,
    isTyping: false,
  },
  {
    id: 4,
    contact: { name: 'Alice Williams', avatar: '👩‍💻', status: 'away' },
    lastMessage: 'Got it, thanks!',
    timestamp: '2 hours ago',
    unreadCount: 0,
    isTyping: false,
  },
  {
    id: 5,
    contact: { name: 'Charlie Brown', avatar: '🧑', status: 'online' },
    lastMessage: 'Can you help me with.. .',
    timestamp: '3 hours ago',
    unreadCount: 0,
    isTyping: false,
  },
];

const mockMessages: { [key: number]: Message[] } = {
  1: [
    {
      id: 1,
      conversationId: 1,
      sender: 'contact',
      content: 'Hello, I need help with my order',
      timestamp: '10:30 AM',
      status: 'read',
    },
    {
      id: 2,
      conversationId: 1,
      sender: 'agent',
      content: "Hi! I'd be happy to help.  What's your order number?",
      timestamp: '10:31 AM',
      status: 'read',
    },
    {
      id: 3,
      conversationId: 1,
      sender: 'contact',
      content: "It's #12345",
      timestamp: '10:32 AM',
      status: 'read',
    },
    {
      id: 4,
      conversationId: 1,
      sender: 'agent',
      content: 'Let me check that for you.. .',
      timestamp: '10:33 AM',
      status: 'read',
    },
    {
      id: 5,
      conversationId: 1,
      sender: 'agent',
      content: 'Your order is being processed and will be shipped tomorrow.',
      timestamp: '10:34 AM',
      status: 'delivered',
    },
    {
      id: 6,
      conversationId: 1,
      sender: 'contact',
      content: 'Great! Thank you for the update 😊',
      timestamp: '10:35 AM',
      status: 'read',
    },
  ],
  2: [
    {
      id: 1,
      conversationId: 2,
      sender: 'contact',
      content: 'Hi, I have a question about pricing',
      timestamp: '9:15 AM',
      status: 'read',
    },
    {
      id: 2,
      conversationId: 2,
      sender: 'agent',
      content: 'Sure!  What would you like to know? ',
      timestamp: '9:16 AM',
      status: 'read',
    },
    {
      id: 3,
      conversationId: 2,
      sender: 'contact',
      content: 'Do you offer volume discounts?',
      timestamp: '9:17 AM',
      status: 'read',
    },
    {
      id: 4,
      conversationId: 2,
      sender: 'agent',
      content: 'Yes!  We offer 10% off for orders over 100 units and 20% off for orders over 500 units.',
      timestamp: '9:18 AM',
      status: 'read',
    },
    {
      id: 5,
      conversationId: 2,
      sender: 'contact',
      content: 'Thank you so much! ',
      timestamp: '9:20 AM',
      status: 'read',
    },
  ],
  3: [
    {
      id: 1,
      conversationId: 3,
      sender: 'contact',
      content: 'When can I expect delivery?',
      timestamp: '8:45 AM',
      status: 'read',
    },
  ],
};

export default function LiveChatPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages[1] || []);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Select conversation
  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConv(conv);
    setMessages(mockMessages[conv.id] || []);
    
    // Mark as read
    setConversations(conversations.map(c => 
      c.id === conv.id ?  { ...c, unreadCount: 0 } : c
    ));
  };

  // Send message
  const handleSendMessage = () => {
    if (! messageInput.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      conversationId: selectedConv. id,
      sender: 'agent',
      content: messageInput,
      timestamp: new Date(). toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');

    // Simulate status updates
    setTimeout(() => {
      setMessages(msgs => msgs.map(m => 
        m.id === newMessage.id ? { ...m, status: 'delivered' } : m
      ));
    }, 1000);

    setTimeout(() => {
      setMessages(msgs => msgs.map(m => 
        m.id === newMessage.id ? { ...m, status: 'read' } : m
      ));
    }, 2000);
  };

  // Filter conversations
  const filteredConversations = conversations.filter(conv =>
    conv.contact.name. toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-180px)]">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Live Chat</h1>

      <div className="grid grid-cols-12 gap-4 h-[calc(100%-60px)]">
        {/* Conversations List (Sidebar) */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="h-full flex flex-col p-0 overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                    selectedConv.id === conv.id
                      ? 'bg-blue-50 border-l-4 border-l-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="text-3xl">{conv.contact.avatar}</div>
                      {/* Status dot */}
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          conv.contact.status === 'online'
                            ? 'bg-green-500'
                            : conv.contact.status === 'away'
                            ? 'bg-yellow-500'
                            : 'bg-gray-400'
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-gray-900 truncate">
                          {conv.contact. name}
                        </p>
                        <span className="text-xs text-gray-500">{conv.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {conv.isTyping ? (
                          <span className="text-blue-600 italic">typing...</span>
                        ) : (
                          conv.lastMessage
                        )}
                      </p>
                    </div>

                    {/* Unread badge */}
                    {conv.unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat Window */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="h-full flex flex-col p-0 overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="text-3xl">{selectedConv.contact.avatar}</div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      selectedConv.contact.status === 'online'
                        ? 'bg-green-500 animate-pulse'
                        : selectedConv.contact.status === 'away'
                        ? 'bg-yellow-500'
                        : 'bg-gray-400'
                    }`}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedConv.contact.name}</p>
                  <p
                    className={`text-sm ${
                      selectedConv.contact.status === 'online'
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {selectedConv.contact.status === 'online'
                      ? '● Online'
                      : selectedConv.contact.status === 'away'
                      ? '● Away'
                      : '● Offline'}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <EllipsisVerticalIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === 'agent'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <div
                      className={`flex items-center gap-1 mt-1 text-xs ${
                        message.sender === 'agent' ? 'text-blue-100 justify-end' : 'text-gray-500'
                      }`}
                    >
                      <span>{message.timestamp}</span>
                      {message.sender === 'agent' && (
                        <span>
                          {message.status === 'sent' && <CheckIcon className="w-3 h-3" />}
                          {message.status === 'delivered' && (
                            <div className="flex">
                              <CheckIcon className="w-3 h-3 -mr-1" />
                              <CheckIcon className="w-3 h-3" />
                            </div>
                          )}
                          {message.status === 'read' && (
                            <div className="flex text-blue-300">
                              <CheckIcon className="w-3 h-3 -mr-1" />
                              <CheckIcon className="w-3 h-3" />
                            </div>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end gap-2">
                {/* Emoji button */}
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors self-end">
                  <FaceSmileIcon className="w-6 h-6 text-gray-600" />
                </button>

                {/* Attach button */}
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors self-end">
                  <PaperClipIcon className="w-6 h-6 text-gray-600" />
                </button>

                {/* Message input */}
                <div className="flex-1">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target. value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Send button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className={`p-3 rounded-xl transition-all self-end ${
                    messageInput.trim()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-700">Enter</kbd> to send, <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-700">Shift + Enter</kbd> for new line
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}