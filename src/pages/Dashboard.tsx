import React from 'react';
import { Package, TruckIcon, AlertCircle, Clock } from 'lucide-react';

const stats = [
  {
    label: '総在庫数',
    value: '2,547',
    icon: Package,
    change: '+12.5%',
    positive: true,
  },
  {
    label: '出荷待ち',
    value: '24',
    icon: TruckIcon,
    change: '-3.4%',
    positive: true,
  },
  {
    label: '在庫不足アイテム',
    value: '15',
    icon: AlertCircle,
    change: '+2.3%',
    positive: false,
  },
  {
    label: '処理時間',
    value: '1.2日',
    icon: Clock,
    change: '-0.5日',
    positive: true,
  },
];

function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ label, value, icon: Icon, change, positive }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`text-sm font-medium ${
                positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">{label}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">最近の活動</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center py-3 border-b border-gray-100 last:border-0">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  新規出荷依頼が作成されました
                </p>
                <p className="text-sm text-gray-500">2分前</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;