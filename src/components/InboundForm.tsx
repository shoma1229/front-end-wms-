import React, { useState } from 'react';
import { X } from 'lucide-react';
import QRScanner from './QRScanner';

interface InboundFormProps {
  onClose: () => void;
  onSubmit: (data: InboundData) => void;
}

interface InboundData {
  storeName: string;
  sku: string;
  quantity: number;
  note?: string;
}

function InboundForm({ onClose, onSubmit }: InboundFormProps) {
  const [formData, setFormData] = useState<InboundData>({
    storeName: '',
    sku: '',
    quantity: 1,
    note: '',
  });
  const [showScanner, setShowScanner] = useState(true);

  const handleScanSuccess = (decodedText: string) => {
    const [storeName, sku] = decodedText.split('-');
    if (storeName && sku) {
      setFormData((prev) => ({ ...prev, storeName, sku }));
      setShowScanner(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">入庫登録</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {showScanner ? (
            <QRScanner onScanSuccess={handleScanSuccess} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  店舗名
                </label>
                <input
                  type="text"
                  value={formData.storeName}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SKU
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  数量
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: parseInt(e.target.value) })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  備考
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowScanner(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  再スキャン
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  登録
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default InboundForm;