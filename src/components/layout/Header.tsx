// src/components/layout/Header.tsx
'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { 
  MagnifyingGlassIcon,
  BellIcon,
  Squares2X2Icon,
  CheckIcon,
} from '@heroicons/react/24/outline';

export function Header() {
  const { user } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="relative flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <CheckIcon className="w-5 h-5 text-gray-600" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Squares2X2Icon className="w-5 h-5 text-gray-600" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <BellIcon className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-gray-800 text-white text-xs font-bold rounded-full flex items-center justify-center">
              8
            </span>
          </button>

          <div className="ml-2">
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=3b82f6&color=fff`}
              alt={user?.name}
              className="w-9 h-9 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
}