import React from 'react';
import { Calendar, Download, ArrowUpRight, ArrowDownRight, Package, TrendingUp } from 'lucide-react';

const analyticsData = {
  totalInbound: {
    value: '15,234',
    change: '+12.5%',
    trend: 'up',
  },
  totalOutbound: {
    value: '12,856',
    change: '+8.3%',
    trend: 'up',
  },
  inventoryTurnover: {
    value: '4.2',
    change: '+0.3',
    trend: 'up',
  },
  averageProcessingTime: {
    value: '1.8日',
    change: '-0.2日',
    trend: 'down',
  },
};

function Analytics() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">入出庫分析</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            期間選択
          </button>
          <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            レポート出力
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <ArrowDownRight className="w-6 h-6 text-green-600" />
            </div>
            <span className={`text-sm font-medium ${
              analyticsData.totalInbound.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {analyticsData.totalInbound.change}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">総入庫数</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {analyticsData.totalInbound.value}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ArrowUpRight className="w-6 h-6 text-blue-600" />
            </div>
            <span className={`text-sm font-medium ${
              analyticsData.totalOutbound.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {analyticsData.totalOutbound.change}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">総出庫数</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {analyticsData.totalOutbound.value}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <span className={`text-sm font-medium ${
              analyticsData.inventoryTurnover.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {analyticsData.inventoryTurnover.change}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">在庫回転率</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {analyticsData.inventoryTurnover.value}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <span className={`text-sm font-medium ${
              analyticsData.averageProcessingTime.trend === 'down' ? 'text-green-600' : 'text-red-600'
            }`}>
              {analyticsData.averageProcessingTime.change}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">平均処理時間</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {analyticsData.averageProcessingTime.value}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">入出庫推移</h2>
          <div className="h-80 flex items-center justify-center">
            <p className="text-gray-500">グラフ表示エリア</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">クライアント別分析</h2>
          <div className="h-80 flex items-center justify-center">
            <p className="text-gray-500">グラフ表示エリア</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;