// src/app/(dashboard)/dashboard/page.tsx
'use client';

import { Card } from '@/components/ui/Card';
import { 
  UserGroupIcon, 
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Contacts', value: '2,543', icon: UserGroupIcon, change: '+12%', bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  { name: 'Active Flows', value: '12', icon: CheckCircleIcon, change: '+2', bgColor: 'bg-green-50', iconColor: 'text-green-600' },
  { name: 'Messages Sent', value: '8,432', icon: ChatBubbleLeftRightIcon, change: '+23%', bgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  { name: 'Conversion Rate', value: '24.5%', icon: ArrowTrendingUpIcon, change: '+4.3%', bgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
];

const recentFlows = [
  { id: 1, name: 'Welcome Sequence', status: 'active', contacts: 234 },
  { id: 2, name: 'Re-engagement Campaign', status: 'active', contacts: 156 },
  { id: 3, name: 'Product Launch', status: 'paused', contacts: 89 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">{stat.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Flows */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Flows</h3>
          <div className="space-y-3">
            {recentFlows.map((flow) => (
              <div
                key={flow.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-semibold text-gray-900">{flow.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{flow.contacts} contacts</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
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

        {/* Quick Actions */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-4 text-left bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all group">
              <p className="font-semibold text-blue-900">Create New Flow</p>
              <p className="text-sm text-blue-700 mt-1">Build an automation sequence</p>
            </button>
            <button className="w-full p-4 text-left bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all group">
              <p className="font-semibold text-purple-900">Import Contacts</p>
              <p className="text-sm text-purple-700 mt-1">Upload your contact list</p>
            </button>
            <button className="w-full p-4 text-left bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all group">
              <p className="font-semibold text-green-900">View Analytics</p>
              <p className="text-sm text-green-700 mt-1">Check your performance</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}