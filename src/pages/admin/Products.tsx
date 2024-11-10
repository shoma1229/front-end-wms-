import React, { useState } from 'react';
import { Search, Plus, Upload, Edit2, Trash2, Package } from 'lucide-react';
import ProductForm, { ProductFormData } from '@/components/admin/ProductForm';
import ProductImport from '@/components/admin/ProductImport';

interface Product {
  id: string;
  managementNumber: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  isNewUnopened: boolean;
  needsRegistration: boolean;
  needsInspection: boolean;
  needsPhotos: boolean;
  amazonUrl: string;
  createdAt: string;
  updatedAt: string;
}

const productData: Product[] = [
  {
    id: 'PRD001',
    managementNumber: '1',
    sku: 'SKU001',
    name: '商品A',
    description: '商品Aの説明',
    category: '食品',
    isNewUnopened: true,
    needsRegistration: false,
    needsInspection: false,
    needsPhotos: false,
    amazonUrl: 'http://www.amazon.co.jp/dp/XXXXX',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
  },
];

function Products() {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleProductSubmit = (data: ProductFormData) => {
    console.log('新規商品データ:', data);
    setShowProductForm(false);
  };

  const handleImport = (data: any[]) => {
    console.log('インポートデータ:', data);
    setShowImportForm(false);
  };

  const filteredProducts = productData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.managementNumber.includes(searchTerm)
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">商品マスター</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowImportForm(true)}
            className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center"
          >
            <Upload className="w-4 h-4 mr-2" />
            CSVインポート
          </button>
          <button
            onClick={() => setShowProductForm(true)}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            新規商品
          </button>
        </div>
      </div>

      {showProductForm && (
        <ProductForm
          onClose={() => setShowProductForm(false)}
          onSubmit={handleProductSubmit}
        />
      )}

      {showImportForm && (
        <ProductImport
          onClose={() => setShowImportForm(false)}
          onImport={handleImport}
        />
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="商品を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  管理番号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  商品名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  新品未開封
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  商品登録
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  検品
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  写真
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amazon URL
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.managementNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.isNewUnopened ? '✓' : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.needsRegistration ? '要' : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.needsInspection ? '要' : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.needsPhotos ? '要' : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                    <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer">
                      URL
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;