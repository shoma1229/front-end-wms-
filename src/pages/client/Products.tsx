import React from 'react';
import { FileSpreadsheet, ExternalLink } from 'lucide-react';

function ClientProducts() {
  // この例では渋谷店のスプレッドシートを表示
  const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/e/your-spreadsheet-id/pubhtml?widget=true&headers=false";
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">商品管理</h1>
        <a
          href={spreadsheetUrl.replace('pubhtml?widget=true&headers=false', 'edit')}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          スプレッドシートを開く
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <FileSpreadsheet className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                商品管理スプレッドシート
              </h2>
              <p className="text-sm text-gray-500">
                商品情報の確認・編集が可能です
              </p>
            </div>
          </div>
        </div>

        <div className="relative" style={{ height: 'calc(100vh - 300px)' }}>
          <iframe
            src={spreadsheetUrl}
            className="absolute inset-0 w-full h-full border-0"
            title="商品管理スプレッドシート"
          />
        </div>
      </div>
    </div>
  );
}

export default ClientProducts;