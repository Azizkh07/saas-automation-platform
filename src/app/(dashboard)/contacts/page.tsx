// src/app/(dashboard)/contacts/page.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { ContactForm } from '@/components/contacts/ContactForm';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Mock Data (même qu'avant)
const initialMockContacts = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example. com', 
    phone: '+1234567890', 
    tags: ['Lead', 'Priority'], 
    status: 'active',
    company: 'Tech Corp',
    lastInteraction: '2025-11-17'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    phone: '+0987654321', 
    tags: ['Customer', 'VIP'], 
    status: 'active',
    company: 'Design Studio',
    lastInteraction: '2025-11-16'
  },
  { 
    id: 3, 
    name: 'Bob Johnson', 
    email: 'bob@example. com', 
    phone: '+1122334455', 
    tags: ['Lead'], 
    status: 'inactive',
    company: 'Marketing Inc',
    lastInteraction: '2025-11-10'
  },
  { 
    id: 4, 
    name: 'Alice Williams', 
    email: 'alice@example.com', 
    phone: '+5566778899', 
    tags: ['Customer'], 
    status: 'active',
    company: 'Finance Group',
    lastInteraction: '2025-11-15'
  },
  { 
    id: 5, 
    name: 'Charlie Brown', 
    email: 'charlie@example.com', 
    phone: '+9988776655', 
    tags: ['Lead', 'Hot'], 
    status: 'active',
    company: 'Startup Labs',
    lastInteraction: '2025-11-17'
  },
  { 
    id: 6, 
    name: 'Diana Prince', 
    email: 'diana@example.com', 
    phone: '+1231231234', 
    tags: ['VIP', 'Customer'], 
    status: 'active',
    company: 'Enterprise Co',
    lastInteraction: '2025-11-14'
  },
  { 
    id: 7, 
    name: 'Eve Adams', 
    email: 'eve@example.com', 
    phone: '+3213213210', 
    tags: ['Lead'], 
    status: 'blocked',
    company: 'Retail Store',
    lastInteraction: '2025-11-01'
  },
  { 
    id: 8, 
    name: 'Frank Miller', 
    email: 'frank@example.com', 
    phone: '+7897897890', 
    tags: ['Customer'], 
    status: 'active',
    company: 'Media House',
    lastInteraction: '2025-11-16'
  },
  { 
    id: 9, 
    name: 'Grace Lee', 
    email: 'grace@example.com', 
    phone: '+4564564560', 
    tags: ['Lead', 'Priority'], 
    status: 'inactive',
    company: 'Consulting Ltd',
    lastInteraction: '2025-11-08'
  },
  { 
    id: 10, 
    name: 'Henry Ford', 
    email: 'henry@example.com', 
    phone: '+6546546540', 
    tags: ['VIP'], 
    status: 'active',
    company: 'Auto Industries',
    lastInteraction: '2025-11-17'
  },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState(initialMockContacts);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Filtrage
  const filteredContacts = contacts.filter((contact) => {
    const matchSearch = 
      contact.name.toLowerCase(). includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search);
    
    const matchStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchSearch && matchStatus;
  });

  // Ajouter un contact
  const handleAddContact = (contactData: any) => {
    setContacts([...contacts, contactData]);
    setIsModalOpen(false);
  };

  // Mettre à jour un contact
  const handleUpdateContact = (contactData: any) => {
    setContacts(contacts.map(c => c.id === contactData.id ?  contactData : c));
    setEditingContact(null);
  };

  // Supprimer un contact
  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id));
    setDeleteConfirm(null);
  };

  // Ouvrir modal d'édition
  const openEditModal = (contact: any) => {
    setEditingContact(contact);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage your contacts and leads ({filteredContacts.length} total)
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="w-5 h-5" />
          Add Contact
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>

          {/* Export Button */}
          <Button variant="secondary">
            Export CSV
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Last Interaction
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContacts. length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No contacts found
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                    {/* Contact */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="px-6 py-4 text-gray-700">
                      {contact.company}
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4 text-gray-700">
                      {contact.phone}
                    </td>

                    {/* Tags */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          contact.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : contact.status === 'inactive'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>

                    {/* Last Interaction */}
                    <td className="px-6 py-4 text-gray-700 text-sm">
                      {new Date(contact.lastInteraction). toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => openEditModal(contact)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => setDeleteConfirm(contact.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredContacts.length} of {contacts.length} contacts
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Previous</Button>
            <Button variant="secondary" size="sm">Next</Button>
          </div>
        </div>
      </Card>

      {/* Modal Add Contact */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Contact"
        size="md"
      >
        <ContactForm
          onSubmit={handleAddContact}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Modal Edit Contact */}
      <Modal
        isOpen={!! editingContact}
        onClose={() => setEditingContact(null)}
        title="Edit Contact"
        size="md"
      >
        <ContactForm
          initialData={editingContact}
          onSubmit={handleUpdateContact}
          onCancel={() => setEditingContact(null)}
        />
      </Modal>

      {/* Modal Delete Confirmation */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Contact"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this contact?  This action cannot be undone. 
          </p>
          <div className="flex gap-3">
            <Button
              variant="danger"
              onClick={() => handleDeleteContact(deleteConfirm! )}
              className="flex-1"
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => setDeleteConfirm(null)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}