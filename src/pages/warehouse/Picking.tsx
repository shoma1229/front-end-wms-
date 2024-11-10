import React from 'react';
import { Search, Filter, CheckCircle2 } from 'lucide-react';

const pickingData = [
  {
    id: 'PICK001',
    orderNumber: 'ORD-2024-001',
    items: [
      { sku: 'SKU001', name: '商品A', quantity: 2, location: 'A-12-3' },
      { sku: 'SKU002', name: '商品B', quantity: 1, location: 'B-05-2' },
    ],
    status: '作業中',
    priority: '高',
    assignedTo: '田中 一郎',
  },
];

function Picking() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">ピッキング作業</h1>
        <button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          作業完了
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ピッキングリストを検索..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          フィルター
        </button>
      </div>

      {pickingData.map((pick) => (
        <div key={pick.id} className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  ピッキング #{pick.id}
                </h2>
                <p className="text-sm text-gray-500">注文番号: {pick.orderNumber}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                  優先度: {pick.priority}
                </span>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {pick.status}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600">担当者: {pick.assignedTo}</p>
          </div>

          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">ピッキング商品</h3>
            <div className="space-y-4">
              {pick.items.map((item) => (
                <div
                  key={item.sku}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      数量: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      ロケーション: {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Picking;