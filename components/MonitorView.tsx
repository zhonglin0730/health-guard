import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, BarChart, Bar, Cell } from 'recharts';
import { ChevronLeft, Share, Info, HelpCircle, Moon, Clock } from 'lucide-react';

type MonitorTab = 'sleep' | 'uric' | 'lipid' | 'vessel' | 'glucose' | 'bp' | 'hr' | 'temp' | 'resp';

const TABS: { id: MonitorTab; label: string }[] = [
  { id: 'sleep', label: '睡眠' },
  { id: 'uric', label: '尿酸' },
  { id: 'lipid', label: '血脂' },
  { id: 'vessel', label: '血管硬化' },
  { id: 'glucose', label: '血糖' },
  { id: 'bp', label: '血压' },
  { id: 'hr', label: '心率' },
];

// Mock Data
const MOCK_DATA = {
  sleep: {
    total: '4小时26分',
    quality: '较好',
    desc: '心率、血压曲线所见，监测数据显示睡眠质量较好，请继续保持。',
    deep: '0小时28分',
    light: '3小时58分',
    data: [
      { time: '20:00', type: 'awake', value: 0 },
      { time: '22:00', type: 'light', value: 30 },
      { time: '00:00', type: 'deep', value: 50 },
      { time: '02:00', type: 'light', value: 20 },
      { time: '04:00', type: 'deep', value: 40 },
      { time: '06:00', type: 'light', value: 30 },
      { time: '08:00', type: 'awake', value: 0 },
    ]
  },
  uric: {
    status: '重度高尿酸风险',
    statusLevel: 'severe',
    color: 'from-orange-500 to-orange-400',
    data: [{ day: '1', value: 420 }, { day: '2', value: 430 }, { day: '3', value: 480 }, { day: '4', value: 550 }, { day: '5', value: 520 }, { day: '6', value: 450 }, { day: '7', value: 440 }],
    thresholds: [{ y: 420, label: '正常' }, { y: 540, label: '重度' }],
    unit: 'μmol/L'
  },
  // ... other mock data fallbacks can use generic structure
};

export const MonitorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MonitorTab>('sleep');
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('day');

  const isSleep = activeTab === 'sleep';
  const genericData = MOCK_DATA.uric; // Fallback for other tabs in this demo

  return (
    <div className="bg-gray-50 min-h-screen pb-24 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <ChevronLeft className="text-gray-500" />
          <h1 className="text-lg font-bold text-slate-800">
            {isSleep ? '睡眠健康动态' : '健康监测'}
          </h1>
          <Share className="text-gray-500" size={20} />
        </div>
        
        {/* Scrollable Tabs */}
        <div className="flex overflow-x-auto no-scrollbar px-2 pb-0 border-b border-gray-100">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id ? 'text-slate-800 font-bold' : 'text-gray-400'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* SLEEP VIEW LAYOUT (Matching Screenshot 1) */}
        {isSleep ? (
          <>
            {/* Sub Tabs for Sleep */}
            <div className="flex justify-center space-x-12 text-sm font-bold text-gray-400 mb-2">
               <span className="text-slate-800 border-b-2 border-blue-600 pb-1">器官睡眠</span>
               <span>意识睡眠</span>
            </div>

            {/* Green Sleep Card */}
            <div className="bg-gradient-to-b from-[#84cc52] to-[#6abf4b] rounded-xl p-6 text-white shadow-md relative overflow-hidden">
               <HelpCircle className="absolute top-4 right-4 opacity-80" size={18} />
               <div className="text-center z-10 relative">
                 <div className="text-xs opacity-90 mb-2">当前器官睡眠</div>
                 <div className="text-2xl sm:text-3xl font-bold mb-4 flex items-baseline justify-center">
                   <span className="text-3xl sm:text-4xl">4</span><span className="text-sm font-normal mx-1">小时</span>
                   <span className="text-3xl sm:text-4xl">26</span><span className="text-sm font-normal mx-1">分</span>
                 </div>
                 <p className="text-xs opacity-90 leading-relaxed px-4">
                   {MOCK_DATA.sleep.desc}
                 </p>
               </div>
               <div className="mt-6 pt-3 border-t border-white/20 text-[10px] text-center opacity-80">
                 器官睡眠统计区间为20:00至次日20:00之间的时长
               </div>
            </div>

            {/* Chart Card */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
               {/* Period Selector */}
               <div className="flex bg-gray-50 rounded-lg p-1 mb-6">
                 {['日', '周', '月', '年'].map((p) => (
                   <button 
                     key={p}
                     onClick={() => setPeriod('day')} // Simplified
                     className={`flex-1 py-1 text-sm rounded-md transition-all ${p === '日' ? 'bg-white shadow text-blue-600 font-bold' : 'text-gray-400'}`}
                   >
                     {p}
                   </button>
                 ))}
               </div>

               {/* Date & Summary */}
               <div className="text-center mb-6">
                 <div className="flex items-center justify-center text-gray-500 text-sm space-x-4">
                   <ChevronLeft size={16} />
                   <span>2022年9月8日</span>
                   <ChevronLeft size={16} className="rotate-180" />
                 </div>
                 <div className="text-xs text-gray-400 mt-1">06:49 - 06:59</div>
                 
                 <div className="mt-4">
                   <div className="flex items-baseline justify-center">
                     <span className="text-lg font-bold text-slate-800 mr-2">浅寐</span>
                     <span className="text-4xl font-bold text-slate-800">10</span>
                     <span className="text-sm text-slate-800 ml-1">分钟</span>
                   </div>
                   <div className="text-xs text-gray-400 mt-1">大肠经旺，大肠开始蠕动</div>
                 </div>
               </div>

               {/* Sleep Bar Chart */}
               <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_DATA.sleep.data} barGap={2}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="time" tick={{fontSize: 10, fill: '#cbd5e1'}} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                      <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                        {MOCK_DATA.sleep.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.type === 'deep' ? '#7c3aed' : entry.type === 'light' ? '#c4b5fd' : '#f1f5f9'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
               </div>

               {/* Legend / Stats Footer */}
               <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50 text-center">
                  <div className="flex-1">
                    <div className="text-base sm:text-lg font-bold text-slate-800">4<span className="text-[10px] sm:text-xs font-normal">小时</span>26<span className="text-[10px] sm:text-xs font-normal">分</span></div>
                    <div className="text-[10px] text-gray-400 mt-1">总时长</div>
                  </div>
                  <div className="flex-1 border-l border-gray-100">
                    <div className="text-base sm:text-lg font-bold text-slate-800">0<span className="text-[10px] sm:text-xs font-normal">小时</span>28<span className="text-[10px] sm:text-xs font-normal">分</span></div>
                    <div className="text-[10px] text-gray-400 mt-1">深寐时长</div>
                  </div>
                  <div className="flex-1 border-l border-gray-100">
                    <div className="text-base sm:text-lg font-bold text-slate-800">3<span className="text-[10px] sm:text-xs font-normal">小时</span>58<span className="text-[10px] sm:text-xs font-normal">分</span></div>
                    <div className="text-[10px] text-gray-400 mt-1">浅寐时长</div>
                  </div>
               </div>
            </div>
          </>
        ) : (
          /* GENERIC CHART VIEW (Fallback for other tabs) */
          <>
            <div className={`rounded-xl p-6 text-white shadow-lg bg-gradient-to-r ${genericData.color} relative overflow-hidden`}>
              <div className="absolute top-4 right-4 flex items-center text-xs opacity-80"><HelpCircle size={14} className="mr-1" />常见问题</div>
              <div className="text-center mt-4">
                <div className="text-sm opacity-90 mb-2">{TABS.find(t => t.id === activeTab)?.label}状态</div>
                <div className="text-2xl font-bold mb-8">{genericData.status}</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
               <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={genericData.data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                    <Area type="monotone" dataKey="value" stroke="#f97316" fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
               </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};