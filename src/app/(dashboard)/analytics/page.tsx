// src/app/(dashboard)/analytics/page.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartBarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';

// Mock Data
const messagesData = [
  { name: 'Jan', sent: 4000, received: 2400 },
  { name: 'Feb', sent: 3000, received: 1398 },
  { name: 'Mar', sent: 2000, received: 9800 },
  { name: 'Apr', sent: 2780, received: 3908 },
  { name: 'May', sent: 1890, received: 4800 },
  { name: 'Jun', sent: 2390, received: 3800 },
  { name: 'Jul', sent: 3490, received: 4300 },
  { name: 'Aug', sent: 4000, received: 2400 },
  { name: 'Sep', sent: 3200, received: 3100 },
  { name: 'Oct', sent: 4100, received: 3500 },
  { name: 'Nov', sent: 3800, received: 4200 },
  { name: 'Dec', sent: 4500, received: 3900 },
];

const performanceData = [
  { month: 'Jan', messages: 30, conversions: 12 },
  { month: 'Feb', messages: 35, conversions: 15 },
  { month: 'Mar', messages: 60, conversions: 28 },
  { month: 'Apr', messages: 25, conversions: 10 },
  { month: 'May', messages: 40, conversions: 18 },
  { month: 'Jun', messages: 30, conversions: 14 },
  { month: 'Jul', messages: 35, conversions: 20 },
  { month: 'Aug', messages: 32, conversions: 16 },
  { month: 'Sep', messages: 50, conversions: 25 },
  { month: 'Oct', messages: 45, conversions: 22 },
  { month: 'Nov', messages: 55, conversions: 28 },
  { month: 'Dec', messages: 48, conversions: 24 },
];

const trafficSourcesData = [
  { name: 'Email', value: 35, color: '#3b82f6' },
  { name: 'WhatsApp', value: 30, color: '#10b981' },
  { name: 'Facebook', value: 20, color: '#8b5cf6' },
  { name: 'SMS', value: 10, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#6b7280' },
];

const topFlowsData = [
  { name: 'Welcome Sequence', triggers: 1250, completion: 85, conversions: 420 },
  { name: 'Re-engagement', triggers: 890, completion: 72, conversions: 285 },
  { name: 'Product Launch', triggers: 650, completion: 68, conversions: 180 },
  { name: 'Abandoned Cart', triggers: 540, completion: 78, conversions: 220 },
  { name: 'Survey Flow', triggers: 320, completion: 92, conversions: 145 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 text-sm mt-1">
            Track your performance and insights
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="3m">Last 3 months</option>
            <option value="1y">Last year</option>
            <option value="custom">Custom range</option>
          </select>
          <Button variant="secondary">
            <DocumentArrowDownIcon className="w-5 h-5" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Messages"
          value="42,580"
          change="+12.5%"
          isPositive={true}
          icon={ChatBubbleLeftRightIcon}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <KPICard
          title="Total Contacts"
          value="8,420"
          change="+8.2%"
          isPositive={true}
          icon={UserGroupIcon}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <KPICard
          title="Conversions"
          value="2,145"
          change="+15.3%"
          isPositive={true}
          icon={ArrowTrendingUpIcon}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
        <KPICard
          title="Conversion Rate"
          value="25.5%"
          change="-2.4%"
          isPositive={false}
          icon={ChartBarIcon}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages Over Time */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Messages Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={messagesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sent"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
                name="Messages Sent"
              />
              <Line
                type="monotone"
                dataKey="received"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ fill: '#a855f7', r: 4 }}
                activeDot={{ r: 6 }}
                name="Messages Received"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Performance by Month */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Performance by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="messages" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Messages" />
              <Bar dataKey="conversions" fill="#10b981" radius={[8, 8, 0, 0]} name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Circular Stats - Monthly */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Monthly Stats</h3>
          </div>
          <div className="flex items-center justify-center py-6">
            <div className="relative w-40 h-40">
              <svg className="transform -rotate-90 w-40 h-40">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray="439.6"
                  strokeDashoffset="87.9"
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-gray-900">80%</span>
                <span className="text-sm text-gray-600">Goal</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-2xl font-bold text-gray-900">65,127</p>
            <p className="text-sm text-green-600 font-medium mt-1">+16.5% • $55.21 USD</p>
          </div>
        </Card>

        {/* Circular Stats - Yearly */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Yearly Stats</h3>
          </div>
          <div className="flex items-center justify-center py-6">
            <div className="relative w-40 h-40">
              <svg className="transform -rotate-90 w-40 h-40">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#a855f7"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray="439.6"
                  strokeDashoffset="65.9"
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-gray-900">85%</span>
                <span className="text-sm text-gray-600">Goal</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-2xl font-bold text-gray-900">984,246</p>
            <p className="text-sm text-green-600 font-medium mt-1">+24.9% • $267.35 USD</p>
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={trafficSourcesData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {trafficSourcesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {trafficSourcesData.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm text-gray-700">{source.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{source.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Performing Flows */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Flows</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Flow Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Triggers
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Completion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Conversions
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topFlowsData.map((flow, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{flow.name}</td>
                  <td className="px-6 py-4 text-gray-700">{flow.triggers. toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${flow.completion}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{flow.completion}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{flow.conversions}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Excellent
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// KPI Card Component
function KPICard({ title, value, change, isPositive, icon: Icon, iconBg, iconColor }: any) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          <div className="flex items-center gap-1">
            {isPositive ?  (
              <ArrowTrendingUpIcon className="w-4 h-4 text-green-600" />
            ) : (
              <ArrowTrendingDownIcon className="w-4 h-4 text-red-600" />
            )}
            <span
              className={`text-sm font-semibold ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change}
            </span>
            <span className="text-sm text-gray-600">vs last period</span>
          </div>
        </div>
        <div className={`p-3 ${iconBg} rounded-xl`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </Card>
  );
}