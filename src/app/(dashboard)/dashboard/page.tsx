'use client';

import { Card } from '@/components/ui/Card';
import { 
  UserGroupIcon, 
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Contacts', value: '2,543', icon: UserGroupIcon, change: '+12%', changeType: 'positive' },
  { name: 'Active Flows', value: '12', icon: CheckCircleIcon, change: '+2', changeType: 'positive' },
  { name: 'Messages Sent', value: '8,432', icon: ChatBubbleLeftRightIcon, change: '+23%', changeType: 'positive' },
  { name: 'Conversion Rate', value: '24.5%', icon: ArrowTrendingUpIcon, change: '+4.3%', changeType: 'positive' },
];

const recentFlows = [
  { id: 1, name: 'Welcome Sequence', status: 'active', contacts: 234 },
  { id: 2, name: 'Re-engagement Campaign', status: 'active', contacts: 156 },
  { id: 3, name: 'Product Launch', status: 'paused', contacts: 89 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 mt-2">{stat.change}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-lg">
                <stat.icon className="w-8 h-8 text-primary-600" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Flows</h3>
          <div className="space-y-3">
            {recentFlows.map((flow) => (
              <div
                key={flow.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{flow.name}</p>
                  <p className="text-sm text-gray-600">{flow.contacts} contacts</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    flow.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {flow.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-4 text-left bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
              <p className="font-medium text-primary-900">Create New Flow</p>
              <p className="text-sm text-primary-700">Build an automation sequence</p>
            </button>
            <button className="w-full p-4 text-left bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors">
              <p className="font-medium text-secondary-900">Import Contacts</p>
              <p className="text-sm text-secondary-700">Upload your contact list</p>
            </button>
            <button className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <p className="font-medium text-gray-900">View Analytics</p>
              <p className="text-sm text-gray-700">Check your performance</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}