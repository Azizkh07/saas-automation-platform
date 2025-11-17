'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { Button } from '@/components/ui/Button';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h2>
          <p className="text-gray-600 text-sm">Here's what's happening with your automations today.</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <BellIcon className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 border-l pl-4">
            <div className="text-right">
              <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button className="p-1">
              <UserCircleIcon className="w-10 h-10 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}