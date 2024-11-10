import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Building2, Users as UsersIcon } from 'lucide-react';
import UserForm, { UserFormData } from '@/components/admin/UserForm';

const userData = {
  clients: [
    {
      id: 'USR001',
      name: '山田 太郎',
      email: 'yamada@example.com',
      role: 'client',
      company: '渋谷店',
      lastLogin: '2024-03-15 10:30',
      status: 'アクティブ',
    },
    {
      id: 'USR003',
      name: '佐藤 次郎',
      email: 'sato@example.com',
      role: 'client',
      company: '新宿店',
      lastLogin: '2024-03-15 11:15',
      status: 'アクティブ',
    },
  ],
  warehouse: [
    {
      id: 'USR002',
      name: '田中 一郎',
      email: 'tanaka@example.com',
      role: 'warehouse',
      company: '東京倉庫',
      lastLogin: '2024-03-15 09:45',
      status: 'アクティブ',
    },
    {
      id: 'USR004',
      name: '鈴木 花子',
      email: 'suzuki@example.com',
      role: 'warehouse',
      company: '東京倉庫',
      lastLogin: '2024-03-15 08:30',
      status: 'アクティブ',
    },
  ],
};

type TabType = 'clients' | 'warehouse';

function Users() {
  const [activeTab, setActiveTab] = useState<TabType>('clients');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserForm, setShowUserForm] = useState(false);

  const tabs = [
    { id: 'clients', label: 'クライアント', icon: Building2, count: userData.clients.length },
    { id: 'warehouse', label: '倉庫担当者', icon: UsersIcon, count: userData.warehouse.length },
  ];

  const handleUserSubmit = (data: UserFormData) => {
    console.log('新規ユーザーデータ:', data);
    // TODO: APIを呼び出してユーザーを登録
    setShowUserForm(false);
  };

  const filteredUsers = userData[activeTab].filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">ユーザー管理</h1>
        <button 
          onClick={() => setShowUserForm(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          新規ユーザー
        </button>
      </div>

      {showUserForm && (
        <UserForm
          onClose={() => setShowUserForm(false)}
          onSubmit={handleUserSubmit}
        />
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as TabType)}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === id
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ユーザーを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ユーザーID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  名前
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  メールアドレス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  所属
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最終ログイン
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状態
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;