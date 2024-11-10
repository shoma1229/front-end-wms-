import React from 'react';
import { BarChart2, Download, Calendar } from 'lucide-react';

const reportCards = [
  {
    title: '在庫サマリー',
    description: '現在の在庫レベルと在庫価値の包括的な概要',
    icon: BarChart2,
  },
  {
    title: '出荷分析',
    description: '配送パフォーマンスと配送時間の分析',
    icon: Calendar,
  },
];

function Reports() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">レポート & 分析</h1>
        <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
          <Download className="w-4 h-4 mr-2" />
          すべてエクスポート
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {reportCards.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                レポートを表示 →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">最近のレポート</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
                  <BarChart2 className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    月次在庫レポート
                  </p>
                  <p className="text-sm text-gray-500">2024年3月1日 作成</p>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                ダウンロード
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reports;