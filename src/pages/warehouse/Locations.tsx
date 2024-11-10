import React, { useState } from 'react';
import { Search, Filter, Plus, QrCode } from 'lucide-react';
import QRScanner from '@/components/QRScanner';

interface LocationData {
  id: string;
  zone: string;
  rack: string;
  level: string;
  capacity: number;
  used: number;
  status: '空' | '使用中' | '満杯';
}

const locationData: LocationData[] = [
  {
    id: 'A-12-3',
    zone: 'A',
    rack: '12',
    level: '3',
    capacity: 200,
    used: 150,
    status: '使用中',
  },
];

type ScanStep = 'product' | 'location';

function Locations() {
  const [showScanner, setShowScanner] = useState(false);
  const [scanStep, setScanStep] = useState<ScanStep>('product');
  const [currentScan, setCurrentScan] = useState<{
    sku?: string;
    location?: string;
  }>({});

  const handleScan = (decodedText: string) => {
    if (scanStep === 'product') {
      const [, sku] = decodedText.split('-');
      setCurrentScan({ ...currentScan, sku });
      setScanStep('location');
    } else {
      setCurrentScan({ ...currentScan, location: decodedText });
      // TODO: API呼び出しでロケーション情報を更新
      setShowScanner(false);
      setScanStep('product');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">ロケーション管理</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowScanner(true)}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <QrCode className="w-4 h-4 mr-2" />
            ロケーション割当
          </button>
          <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            新規ロケーション
          </button>
        </div>
      </div>

      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4">
            <h2 className="text-lg font-semibold mb-4">
              {scanStep === 'product' ? '商品QRコードをスキャン' : 'ロケーションQRコードをスキャン'}
            </h2>
            <QRScanner
              onScanSuccess={handleScan}
              onScanError={(error) => console.error(error)}
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  setShowScanner(false);
                  setScanStep('product');
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                キャンセル
              </button>
              {currentScan.sku && (
                <p className="text-sm text-gray-600">
                  商品SKU: {currentScan.sku}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ロケーションを検索..."
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
                ロケーションID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ゾーン
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ラック
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                レベル
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                最大容量
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                使用量
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状態
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {locationData.map((location) => (
              <tr key={location.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {location.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {location.zone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {location.rack}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {location.level}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {location.capacity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {location.used}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    location.status === '空' ? 'bg-green-100 text-green-800' :
                    location.status === '満杯' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {location.status}
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

export default Locations;