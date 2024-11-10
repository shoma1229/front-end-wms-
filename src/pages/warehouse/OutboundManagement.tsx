import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight } from 'lucide-react';
import QRScanner from '@/components/QRScanner';

interface OutboundRecord {
  id: string;
  timestamp: string;
  orderNumber: string;
  sku: string;
  quantity: number;
  location: string;
  status: '準備中' | 'ピッキング中' | '完了';
}

const outboundData: OutboundRecord[] = [
  {
    id: 'OUT001',
    timestamp: '2024-03-15 11:30',
    orderNumber: 'ORD-2024-001',
    sku: 'SKU001',
    quantity: 20,
    location: 'A-12-3',
    status: '完了',
  },
];

function OutboundManagement() {
  const [showScanner, setShowScanner] = useState(false);
  const [scanStep, setScanStep] = useState<'order' | 'location'>('order');
  const [currentOutbound, setCurrentOutbound] = useState<Partial<OutboundRecord>>({});

  const handleScan = (decodedText: string) => {
    if (scanStep === 'order') {
      setCurrentOutbound({
        ...currentOutbound,
        orderNumber: decodedText,
        timestamp: new Date().toISOString(),
      });
      setScanStep('location');
    } else {
      setCurrentOutbound({
        ...currentOutbound,
        location: decodedText,
      });
      // TODO: API呼び出しで出庫データを登録
      setShowScanner(false);
      setScanStep('order');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">出庫管理</h1>
        <button
          onClick={() => setShowScanner(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <ArrowUpRight className="w-4 h-4 mr-2" />
          出庫登録
        </button>
      </div>

      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4">
            <h2 className="text-lg font-semibold mb-4">
              {scanStep === 'order' ? '注文QRコードをスキャン' : 'ロケーションQRコードをスキャン'}
            </h2>
            <QRScanner
              onScanSuccess={handleScan}
              onScanError={(error) => console.error(error)}
            />
            <button
              onClick={() => {
                setShowScanner(false);
                setScanStep('order');
              }}
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
            placeholder="出庫記録を検索..."
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
                出庫ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                日時
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                注文番号
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                数量
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ロケーション
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状態
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {outboundData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {record.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.orderNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${record.status === '完了' ? 'bg-green-100 text-green-800' : 
                      record.status === 'ピッキング中' ? 'bg-blue-100 text-blue-800' : 
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

export default OutboundManagement;