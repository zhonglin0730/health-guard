import React from 'react';
import { Clock, ThumbsUp, AlertCircle } from 'lucide-react';
import { OrganStatus } from '../types';

const organData: OrganStatus[] = [
  { name: '心', time: '11:00-13:00', status: 'healthy', description: '心气充足，神志清晰' },
  { name: '小肠', time: '13:00-15:00', status: 'healthy', description: '吸收功能良好' },
  { name: '膀胱', time: '15:00-17:00', status: 'sub-health', description: '轻微疲劳，建议多饮水' },
  { name: '肾', time: '17:00-19:00', status: 'healthy', description: '精力充沛' },
  { name: '心包', time: '19:00-21:00', status: 'healthy', description: '循环系统正常' },
  { name: '肝', time: '01:00-03:00', status: 'risk', description: '熬夜导致肝火较旺' },
];

export const TCMView: React.FC = () => {
  return (
    <div className="pb-24 pt-4 px-4 space-y-6">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-slate-800">中医数据模型</h2>
        <p className="text-sm text-gray-500">子午流注与经络健康状态评估</p>
      </div>

      {/* Organ Clock Visualization (Conceptual) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative">
        <div className="absolute top-4 right-4">
          <Clock className="text-blue-500 opacity-20 w-16 h-16" />
        </div>
        <h3 className="font-semibold text-lg mb-4">今日脏腑经络图</h3>
        
        {/* Simplified List View for Mobile instead of complex circular chart */}
        <div className="grid grid-cols-3 gap-3">
          {organData.map((organ, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center p-3 rounded-xl border ${
                organ.status === 'risk' ? 'bg-red-50 border-red-200' :
                organ.status === 'sub-health' ? 'bg-orange-50 border-orange-200' :
                'bg-green-50 border-green-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-2 shadow-sm ${
                 organ.status === 'risk' ? 'bg-red-500' :
                 organ.status === 'sub-health' ? 'bg-orange-400' :
                 'bg-green-500'
              }`}>
                {organ.name}
              </div>
              <span className="text-xs font-medium text-slate-700">{organ.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Report */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-800">健康调养建议</h3>
        
        <div className="bg-white p-4 rounded-xl border-l-4 border-red-400 shadow-sm">
           <div className="flex items-start">
             <AlertCircle className="text-red-500 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
             <div>
               <h4 className="font-bold text-slate-700">肝经异常提示</h4>
               <p className="text-sm text-gray-600 mt-1">
                 检测到凌晨01:00-03:00期间深度睡眠不足。
               </p>
               <div className="mt-3 bg-gray-50 p-2 rounded text-xs text-gray-500">
                 <strong>调养方案：</strong> 建议饮用菊花枸杞茶，按揉太冲穴，并在23:00前入睡。
               </div>
             </div>
           </div>
        </div>

        <div className="bg-white p-4 rounded-xl border-l-4 border-green-400 shadow-sm">
           <div className="flex items-start">
             <ThumbsUp className="text-green-500 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
             <div>
               <h4 className="font-bold text-slate-700">心功能良好</h4>
               <p className="text-sm text-gray-600 mt-1">
                 心气充足，脉象平稳。建议继续保持适量有氧运动。
               </p>
             </div>
           </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-xl text-orange-900 text-sm">
        <span className="font-bold block mb-1">技术原理：</span>
        通过普济高频采集脉象波形，结合中医十二经络子午流注模型，分析人体脏腑能量变化，实现中医可视化。
      </div>
    </div>
  );
};