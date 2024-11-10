import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import Papa from 'papaparse';

interface ProductImportProps {
  onClose: () => void;
  onImport: (data: any[]) => void;
}

function ProductImport({ onClose, onImport }: ProductImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          onImport(results.data);
        },
        error: (error) => {
          console.error('CSVパースエラー:', error);
        }
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">商品データインポート</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              CSVファイルをドラッグ&ドロップ
            </p>
            <p className="text-xs text-gray-500 mb-4">
              または
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".csv"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              ファイルを選択
            </button>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p>※ CSVファイルの形式:</p>
            <ul className="list-disc list-inside mt-1">
              <li>文字コード: UTF-8</li>
              <li>1行目: ヘッダー行</li>
              <li>区切り文字: カンマ(,)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductImport;