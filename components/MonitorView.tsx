import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ChevronLeft, Share, HelpCircle, Brain, Activity } from 'lucide-react';

type MonitorTab = 'sleep' | 'uric' | 'lipid' | 'vessel' | 'glucose' | 'bp' | 'hr';
type TimePeriod = 'day' | 'week' | 'month' | 'year';

const TABS: { id: MonitorTab; label: string }[] = [
  { id: 'sleep', label: '睡眠' },
  { id: 'uric', label: '尿酸' },
  { id: 'lipid', label: '血脂' },
  { id: 'vessel', label: '血管' },
  { id: 'glucose', label: '血糖' },
  { id: 'bp', label: '血压' },
  { id: 'hr', label: '心率' },
];

const PERIODS: TimePeriod[] = ['day', 'week', 'month', 'year'];
const PERIOD_LABELS: Record<TimePeriod, string> = { 'day': '日', 'week': '周', 'month': '月', 'year': '年' };

// Helper to get last 7 days labels
const DATES = ['10/24', '10/25', '10/26', '10/27', '10/28', '10/29', '今天'];

// Mock Data
const MOCK_DATA: Record<string, any> = {
  sleep: {
    // ORGAN SLEEP DATA
    organ: {
      day: {
        total: '4小时26分', quality: '较好', desc: '心率、血压曲线所见，监测数据显示睡眠质量较好。',
        data: [
          { time: '20:00', type: 'awake', value: 0 }, { time: '22:00', type: 'light', value: 30 }, { time: '00:00', type: 'deep', value: 50 },
          { time: '02:00', type: 'light', value: 20 }, { time: '04:00', type: 'deep', value: 40 }, { time: '06:00', type: 'light', value: 30 }, { time: '08:00', type: 'awake', value: 0 }
        ]
      },
      week: {
        total: '5小时10分', quality: '一般', desc: '本周平均睡眠时间偏短，深睡比例不足，建议调整作息。',
        data: [
          { time: '周一', value: 4.5 }, { time: '周二', value: 5.2 }, { time: '周三', value: 6.1 }, { time: '周四', value: 4.8 }, 
          { time: '周五', value: 5.5 }, { time: '周六', value: 7.2 }, { time: '周日', value: 6.8 }
        ]
      },
      month: {
        total: '6小时05分', quality: '良好', desc: '本月睡眠整体呈现上升趋势，月初较差，月末逐渐恢复正常。',
        data: Array.from({length: 10}, (_, i) => ({ time: `${i*3+1}日`, value: 5 + Math.random() * 3 }))
      },
      year: {
        total: '6小时30分', quality: '优秀', desc: '年度睡眠质量评估为优秀，保持了良好的作息规律。',
        data: Array.from({length: 12}, (_, i) => ({ time: `${i+1}月`, value: 6 + Math.random() * 2 }))
      }
    },
    // CONSCIOUS SLEEP DATA (New Feature)
    conscious: {
       total: '7小时12分',
       quality: '优秀',
       deepPct: '28%',
       remPct: '22%',
       desc: '意识睡眠充足，REM周期完整，利于记忆巩固与精神恢复。',
       data: [
         { time: '23:00', stage: 'awake', value: 10 }, { time: '00:00', stage: 'rem', value: 30 }, { time: '01:00', stage: 'light', value: 40 }, 
         { time: '02:00', stage: 'deep', value: 60 }, { time: '03:30', stage: 'rem', value: 30 }, { time: '05:00', stage: 'deep', value: 50 },
         { time: '06:30', stage: 'light', value: 20 }, { time: '07:00', stage: 'awake', value: 0 }
       ]
    }
  },
  uric: {
    status: '重度高尿酸风险', desc: '近期尿酸值持续偏高，建议严格控制海鲜、内脏摄入，多饮水。', color: 'from-orange-500 to-orange-400', chartColor: '#f97316', unit: 'μmol/L', latest: '520',
    data: [{ day: DATES[0], value: 420 }, { day: DATES[1], value: 430 }, { day: DATES[2], value: 480 }, { day: DATES[3], value: 550 }, { day: DATES[4], value: 520 }, { day: DATES[5], value: 450 }, { day: DATES[6], value: 520 }],
  },
  lipid: {
    status: '血脂偏高', desc: '总胆固醇略高于正常值，注意控制油脂摄入，加强运动。', color: 'from-amber-500 to-amber-400', chartColor: '#f59e0b', unit: 'mmol/L', latest: '5.8',
    data: [{ day: DATES[0], value: 5.1 }, { day: DATES[1], value: 5.2 }, { day: DATES[2], value: 5.4 }, { day: DATES[3], value: 5.9 }, { day: DATES[4], value: 5.8 }, { day: DATES[5], value: 5.6 }, { day: DATES[6], value: 5.8 }],
  },
  vessel: {
    status: '血管弹性良好', desc: '血管弹性指数正常，未发现明显硬化迹象，请继续保持。', color: 'from-emerald-500 to-emerald-400', chartColor: '#10b981', unit: '分', latest: '88',
    data: [{ day: DATES[0], value: 82 }, { day: DATES[1], value: 85 }, { day: DATES[2], value: 84 }, { day: DATES[3], value: 86 }, { day: DATES[4], value: 88 }, { day: DATES[5], value: 87 }, { day: DATES[6], value: 88 }],
  },
  glucose: {
    status: '血糖正常', desc: '空腹血糖波动在正常范围内，代谢功能良好。', color: 'from-cyan-500 to-cyan-400', chartColor: '#06b6d4', unit: 'mmol/L', latest: '5.4',
    data: [{ day: DATES[0], value: 5.2 }, { day: DATES[1], value: 5.3 }, { day: DATES[2], value: 5.1 }, { day: DATES[3], value: 5.6 }, { day: DATES[4], value: 5.4 }, { day: DATES[5], value: 5.3 }, { day: DATES[6], value: 5.4 }],
  },
  bp: {
    status: '血压正常', desc: '收缩压与舒张压均在理想范围内，心血管负荷正常。', color: 'from-indigo-500 to-indigo-400', chartColor: '#6366f1', unit: 'mmHg', latest: '118/78',
    data: [{ day: DATES[0], value: 115, value2: 75 }, { day: DATES[1], value: 118, value2: 76 }, { day: DATES[2], value: 120, value2: 80 }, { day: DATES[3], value: 122, value2: 82 }, { day: DATES[4], value: 119, value2: 79 }, { day: DATES[5], value: 118, value2: 78 }, { day: DATES[6], value: 116, value2: 76 }],
  },
  hr: {
    status: '心率正常', desc: '静息心率稳定，心脏功能良好，无心律失常迹象。', color: 'from-rose-500 to-rose-400', chartColor: '#f43f5e', unit: 'bpm', latest: '72',
    data: [{ day: DATES[0], value: 70 }, { day: DATES[1], value: 72 }, { day: DATES[2], value: 68 }, { day: DATES[3], value: 75 }, { day: DATES[4], value: 73 }, { day: DATES[5], value: 74 }, { day: DATES[6], value: 72 }],
  }
};

export const MonitorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MonitorTab>('sleep');
  const [sleepMode, setSleepMode] = useState<'organ' | 'conscious'>('organ');
  const [period, setPeriod] = useState<TimePeriod>('day');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data fetching
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [activeTab, sleepMode, period]);

  const isSleep = activeTab === 'sleep';
  // Logic to get correct data based on tab, sleep mode and period
  let currentData;
  if (isSleep) {
    if (sleepMode === 'organ') {
      currentData = MOCK_DATA.sleep.organ[period];
    } else {
      // For demo simplicty, conscious sleep uses one static dataset, but in real app would also have periods
      currentData = MOCK_DATA.sleep.conscious; 
    }
  } else {
    currentData = MOCK_DATA[activeTab];
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <ChevronLeft className="text-gray-500" />
          <h1 className="text-lg font-bold text-slate-800">
            {isSleep ? '睡眠健康动态' : '健康监测数据'}
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

      <div className="p-4 space-y-4">
        
        {isLoading ? (
          /* SKELETON LOADING STATE */
          <div className="space-y-4 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-xl w-full"></div>
            <div className="h-64 bg-gray-200 rounded-xl w-full"></div>
            <div className="flex space-x-4">
               <div className="h-20 bg-gray-200 rounded-xl w-1/3"></div>
               <div className="h-20 bg-gray-200 rounded-xl w-1/3"></div>
               <div className="h-20 bg-gray-200 rounded-xl w-1/3"></div>
            </div>
          </div>
        ) : (
          /* ACTUAL CONTENT */
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {isSleep ? (
              <>
                {/* Sub Tabs for Sleep Modes */}
                <div className="flex justify-center space-x-12 text-sm font-bold text-gray-400 mb-2">
                   <button 
                     onClick={() => setSleepMode('organ')}
                     className={`transition-colors ${sleepMode === 'organ' ? 'text-slate-800 border-b-2 border-blue-600 pb-1' : ''}`}
                   >
                     器官睡眠
                   </button>
                   <button 
                     onClick={() => setSleepMode('conscious')}
                     className={`transition-colors ${sleepMode === 'conscious' ? 'text-slate-800 border-b-2 border-blue-600 pb-1' : ''}`}
                   >
                     意识睡眠
                   </button>
                </div>

                {/* Dynamic Sleep Card based on Mode */}
                <div className={`
                  rounded-2xl p-6 text-white shadow-md relative overflow-hidden group transition-colors duration-500
                  ${sleepMode === 'organ' ? 'bg-gradient-to-b from-[#84cc52] to-[#6abf4b]' : 'bg-gradient-to-b from-[#6366f1] to-[#4f46e5]'}
                `}>
                   <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
                   <HelpCircle className="absolute top-4 right-4 opacity-80" size={18} />
                   <div className="text-center z-10 relative">
                     <div className="text-xs opacity-90 mb-2">
                       {sleepMode === 'organ' ? '当前器官睡眠时长' : '意识睡眠总时长'}
                     </div>
                     <div className="text-3xl font-bold mb-4 flex items-baseline justify-center">
                       {/* Parse time string slightly for visual size diff */}
                       {currentData.total.replace(/(\d+)/g, '<span class="text-4xl tracking-tight">$1</span>').split(/<|>/).map((part: string, i: number) => {
                          if (part.includes('span')) {
                            // Simple parser hack for demo string replacement
                             const val = part.match(/class="text-4xl tracking-tight">(\d+)/)?.[1];
                             return <span key={i} className="text-4xl tracking-tight mx-0.5">{val}</span>
                          }
                          return <span key={i} className="text-sm font-normal">{part}</span>
                       })}
                     </div>
                     
                     {sleepMode === 'conscious' && (
                       <div className="flex justify-center space-x-6 mb-3 text-xs opacity-90">
                          <div className="flex items-center"><Brain size={12} className="mr-1"/> 深睡 {currentData.deepPct}</div>
                          <div className="flex items-center"><Activity size={12} className="mr-1"/> REM {currentData.remPct}</div>
                       </div>
                     )}

                     <p className="text-xs opacity-90 leading-relaxed px-4">
                       {currentData.desc}
                     </p>
                   </div>
                </div>

                {/* Chart Card */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                   {/* Period Selector */}
                   <div className="flex bg-gray-100/80 rounded-lg p-1 mb-6">
                     {PERIODS.map((p) => (
                       <button 
                         key={p}
                         onClick={() => setPeriod(p)}
                         className={`flex-1 py-1 text-xs rounded-md transition-all ${period === p ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-gray-400'}`}
                       >
                         {PERIOD_LABELS[p]}
                       </button>
                     ))}
                   </div>

                   {/* Date & Summary */}
                   <div className="text-center mb-6">
                     <div className="flex items-center justify-center text-gray-500 text-sm space-x-4">
                       <ChevronLeft size={16} />
                       <span className="font-medium text-slate-700">2023年10月25日</span>
                       <ChevronLeft size={16} className="rotate-180" />
                     </div>
                     
                     <div className="mt-4 flex items-center justify-center space-x-2">
                         <span className={`w-2 h-2 rounded-full ${sleepMode === 'organ' ? 'bg-purple-500' : 'bg-blue-500'}`}></span>
                         <span className="text-lg font-bold text-slate-800">
                           {sleepMode === 'organ' ? '深度休眠' : 'REM期'} 
                           {period === 'day' ? ' 50分钟' : ' 平均45分钟'}
                         </span>
                     </div>
                     <div className="text-xs text-gray-400 mt-1">
                       {period === 'day' ? '监测数据分析完成' : '周期趋势分析完成'}
                     </div>
                   </div>

                   {/* Sleep Chart (Bar for Organs, Area/Bar hybrid logic for Conscious could be added) */}
                   <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={currentData.data} barGap={2}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="time" tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} dy={10} />
                          <Tooltip 
                            cursor={{fill: '#f8fafc'}} 
                            contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                          />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {currentData.data.map((entry: any, index: number) => {
                              let fill = '#e2e8f0';
                              if (sleepMode === 'organ') {
                                fill = entry.type === 'deep' ? '#7c3aed' : entry.type === 'light' ? '#c4b5fd' : '#f1f5f9';
                                // Simple fallback for week/month/year view where types might differ
                                if (!entry.type) fill = '#84cc52';
                              } else {
                                // Conscious colors
                                fill = entry.stage === 'deep' ? '#1e40af' : entry.stage === 'rem' ? '#60a5fa' : '#93c5fd';
                              }
                              return <Cell key={`cell-${index}`} fill={fill} />;
                            })}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                   </div>
                </div>
              </>
            ) : (
              /* GENERIC CHART VIEW (For other tabs) */
              <>
                <div className={`rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r ${currentData.color} relative overflow-hidden transition-all duration-500`}>
                  <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute top-4 right-4 flex items-center text-xs opacity-80"><HelpCircle size={14} className="mr-1" />说明</div>
                  <div className="text-center mt-2 relative z-10">
                    <div className="text-sm opacity-90 mb-2">{TABS.find(t => t.id === activeTab)?.label}指数</div>
                    <div className="text-3xl font-bold mb-2 flex items-baseline justify-center">
                       {currentData.latest} 
                       <span className="text-sm font-normal ml-1 opacity-80">{currentData.unit}</span>
                    </div>
                    <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs backdrop-blur-sm mb-3">
                      {currentData.status}
                    </div>
                    <p className="text-xs opacity-80 leading-relaxed px-4 max-w-xs mx-auto">
                       {currentData.desc}
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                   <h3 className="text-sm font-bold text-slate-700 mb-4 flex justify-between">
                     <span>最近7天趋势</span>
                     <span className="text-xs font-normal text-gray-400">单位: {currentData.unit}</span>
                   </h3>
                   <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={currentData.data}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={currentData.chartColor} stopOpacity={0.2}/>
                            <stop offset="95%" stopColor={currentData.chartColor} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="day" tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} dy={10} />
                        <Tooltip 
                           contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                           formatter={(value: any, name: any) => [value, activeTab === 'bp' ? (name === 'value' ? '收缩压' : '舒张压') : '数值']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke={currentData.chartColor} 
                          strokeWidth={3}
                          fill="url(#colorValue)" 
                          name="value"
                        />
                        {/* Second line for BP (Diastolic) */}
                        {activeTab === 'bp' && (
                          <Area 
                            type="monotone" 
                            dataKey="value2" 
                            stroke={currentData.chartColor}
                            strokeOpacity={0.6}
                            strokeWidth={3}
                            strokeDasharray="4 4"
                            fill="transparent" 
                            name="value2"
                          />
                        )}
                      </AreaChart>
                    </ResponsiveContainer>
                   </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};