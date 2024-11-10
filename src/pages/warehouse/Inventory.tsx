import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownRight, Building2 } from 'lucide-react';
import InboundForm from '@/components/InboundForm';

const clientInventoryData = [
  {
    clientId: 'CLIENT001',
    clientName: '渋谷店',
    items: [
      {
        sku: 'SKU001',
        name: '商品A',
        inbound: 50,
        outbound: 30,
        stock: 150,
        location: 'A-12-3',
        lastUpdated: '2024-03-10',
      },
      {
        sku: 'SKU002',
        name: '商品B',
        inbound: 30,
        outbound: 10,
        stock: 80,
        location: 'B-05-2',
        lastUpdated: '2024-03-11',
      },
    ],
  },
  {
    clientId: 'CLIENT002',
    clientName: '新宿店',
    items: [
      {
        sku: 'SKU001',
        name: '商品A',
        inbound: 40,
        outbound: 20,
        stock: 100,
        location: 'A-12-4',
        lastUpdated: '2024-03-09',
      },
    ],
  },
];

function WarehouseInventory() {
  const [selectedClient, setSelectedClient] = useState<string>(clientInventoryData[0].clientId);
  const [showInboundForm, setShowInboundForm] = useState(false);

  const handleInboundSubmit = (data: any) => {
    console.log('入庫データ:', data);
    setShowInboundForm(false);
  };

  const currentClient = clientInventoryData.find(client => client.clientId === selectedClient);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">在庫管理</h1>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {clientInventoryData.map((client) => (
              <option key={client.clientId} value={client.clientId}>
                {client.clientName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowInboundForm(true)}
            className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center"
          >
            <ArrowDownRight className="w-4 h-4 mr-2" />
            入庫登録
          </button>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center">
            <ArrowUpRight className="w-4 h-4 mr-2" />
            出庫登録
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="商品を検索..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          フィルター
        </button>
      </div>

      {/* Client Summary Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {currentClient?.clientName}
            </h2>
            <p className="text-sm text-gray-500">
              総商品数: {currentClient?.items.length}点
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">総在庫数</p>
            <p className="text-lg font-semibold text-gray-900">
              {currentClient?.items.reduce((sum, item) => sum + item.stock, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">最終更新</p>
            <p className="text-sm text-gray-900">
              {currentClient?.items[0]?.lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                商品名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                入庫数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                出庫数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                在庫数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                保管場所
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                最終更新日
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentClient?.items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  +{item.inbound}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                  -{item.outbound}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.lastUpdated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showInboundForm && (
        <InboundForm
          onClose={() => setShowInboundForm(false)}
          onSubmit={handleInboundSubmit}
        />
      )}
    </div>
  );
}

export default WarehouseInventory;