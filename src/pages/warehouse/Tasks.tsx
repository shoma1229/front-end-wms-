import React from 'react';
import { Search, Filter, CheckCircle2, Clock } from 'lucide-react';

const taskData = [
  {
    id: 'TASK001',
    type: '在庫移動',
    description: '商品Aを A-12-3 から B-05-2 へ移動',
    priority: '中',
    status: '未着手',
    deadline: '2024-03-15 15:00',
    assignedTo: '田中 一郎',
  },
];

function Tasks() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">作業指示</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            作業履歴
          </button>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            作業開始
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="作業を検索..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          フィルター
        </button>
      </div>

      <div className="space-y-4">
        {taskData.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {task.type}
                  </h2>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {task.status}
                  </span>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    優先度: {task.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              </div>
              <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                詳細を表示
              </button>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>担当: {task.assignedTo}</span>
                <span>期限: {task.deadline}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-green-600 hover:text-green-700 font-medium">
                  完了
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;