import React, { useState } from 'react';
import { Search, Filter, ArrowDownRight } from 'lucide-react';
import QRScanner from '@/components/QRScanner';

interface InboundRecord {
  id: string;
  timestamp: string;
  storeName: string;
  sku: string;
  quantity: number;
  status: '未割当' | '割当済み' | '完了';
}

const inboundData: InboundRecord[] = [
  {
    id: 'IN001',
    timestamp: '2024-03-15 10:30',
    storeName: '渋谷店',
    sku: 'SKU001',
    quantity: 50,
    status: '未割当',
  },
];

function InboundManagement() {
  const [showScanner, setShowScanner] = useState(false);
  const [currentInbound, setCurrentInbound] = useState<Partial<InboundRecord>>({});

  const handleScan = (decodedText: string) => {
    const [storeName, sku] = decodedText.split('-');
    if (storeName && sku) {
      setCurrentInbound({
        id: `IN${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        storeName,
        sku,
        status: '未割当',
      });
      // TODO: API呼び出しで入庫データを登録
      setShowScanner(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">入庫管理</h1>
        <button
          onClick={() => setShowScanner(true)}
          className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center"
        >
          <ArrowDownRight className="w-4 h-4 mr-2" />
          入庫登録
        </button>
      </div>

      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4">
            <h2 className="text-lg font-semibold mb-4">商品QRコードをスキャン</h2>
            <QRScanner
              onScanSuccess={handleScan}
              onScanError={(error) => console.error(error)}
            />
            <button
              onClick={() => setShowScanner(false)}
              className="mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="入庫記録を検索..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          フィルター
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                入庫ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                日時
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                店舗
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                数量
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状態
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inboundData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {record.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.storeName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${record.status === '完了' ? 'bg-green-100 text-green-800' : 
                      record.status === '割当済み' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InboundManagement;