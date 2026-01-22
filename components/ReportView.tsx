import React from 'react';
import { X, ChevronRight, Share, Headphones, HelpCircle } from 'lucide-react';
import { OrganMap } from './OrganMap';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ReportViewProps {
  onClose: () => void;
}

const trendData = [
  { day: '01-09', value: 85, status: 'healthy', label: '健康' },
  { day: '01-10', value: 82, status: 'healthy', label: '健康' },
  { day: '01-11', value: 55, status: 'sub-health', label: '亚健康' },
  { day: '01-12', value: 88, status: 'healthy', label: '健康' },
  { day: '01-13', value: 40, status: 'risk', label: '疾病' },
  { day: '01-14', value: 85, status: 'healthy', label: '健康' },
  { day: '01-15', value: 90, status: 'healthy', label: '健康' },
];

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  let fill = '#22c55e'; // green
  if (payload.status === 'risk') fill = '#ef4444'; // red
  else if (payload.status === 'sub-health') fill = '#f97316'; // orange

  return (
    <circle cx={cx} cy={cy} r={4} fill={fill} stroke="white" strokeWidth={2} />
  );
};

export const ReportView: React.FC<ReportViewProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col animate-in slide-in-from-bottom duration-300 font-sans">
      {/* Navbar */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-20">
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <X size={24} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-bold text-slate-800">自己的周报详情</h2>
        <div className="flex space-x-3 text-gray-600">
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors"><Headphones size={22} /></button>
          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors"><Share size={22} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* User Info Header */}
        <div className="bg-white p-4 mb-2 animate-fade-in-up">
           <div className="flex items-center justify-between">
             <div className="flex items-center space-x-3">
               <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                 普
               </div>
               <div>
                 <div className="flex items-center space-x-2">
                   <h3 className="font-bold text-slate-800">普济用户</h3>
                   <span className="text-xs text-gray-500">男 34岁 177cm 70kg</span>
                 </div>
                 <div className="text-xs text-gray-400 mt-1">病史: 无病史</div>
               </div>
             </div>
             <ChevronRight className="text-gray-400" />
           </div>
        </div>

        {/* Section 1: Health Trend */}
        <div className="bg-white p-4 mb-2 animate-fade-in-up delay-100">
          <h3 className="font-bold text-slate-800 mb-4">本周健康状态变化趋势</h3>
          
          {/* Line Chart Visualization */}
          <div className="h-48 w-full mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  tick={{fontSize: 10, fill: '#94a3b8'}} 
                  axisLine={{ stroke: '#e2e8f0' }} 
                  tickLine={false} 
                  dy={10}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                   contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                   cursor={{stroke: '#cbd5e1', strokeDasharray: '3 3'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorHealth)" 
                  dot={<CustomDot />}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center space-x-4 text-[10px] text-gray-500 mb-4 mt-2">
             <span className="flex items-center"><i className="w-2 h-2 bg-green-500 rounded-full mr-1"></i>健康</span>
             <span className="flex items-center"><i className="w-2 h-2 bg-orange-400 rounded-full mr-1"></i>亚健康</span>
             <span className="flex items-center"><i className="w-2 h-2 bg-red-500 rounded-full mr-1"></i>疾病</span>
             <span className="flex items-center"><i className="w-2 h-2 bg-gray-300 rounded-full mr-1"></i>未知</span>
          </div>

          <div className="text-xs text-slate-700 bg-gray-50 p-2 rounded">
            分析: 本周健康5天，亚健康1天，风险1天。
          </div>
        </div>

        {/* Section 2: Organ Status */}
        <div className="bg-white p-4 mb-2 animate-fade-in-up delay-200">
          <h3 className="font-bold text-slate-800 mb-0">本周器官总体健康状态</h3>
          <OrganMap />
        </div>

        {/* Section 3: Comprehensive Analysis */}
        <div className="bg-white p-4 mb-2 animate-fade-in-up delay-300">
          <h3 className="font-bold text-slate-800 mb-4">综合分析</h3>
          
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center space-x-3">
               <div className="w-10 h-10">
                 {/* Doctor Avatar Placeholder */}
                 <svg viewBox="0 0 40 40" className="w-full h-full fill-blue-100 text-blue-500">
                   <circle cx="20" cy="20" r="20" />
                   <path d="M20 10a5 5 0 100 10 5 5 0 000-10zm-8 22c0-5 6-7 8-7s8 2 8 7" fill="currentColor" />
                 </svg>
               </div>
               <span className="font-bold text-slate-800">身体状态</span>
             </div>
             <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-bold">健康</span>
          </div>

          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between pr-4"><span>平均睡眠:</span> <span className="text-slate-800">3时17分</span></div>
            <div className="flex justify-between pl-4"><span>睡眠质量:</span> <span className="text-slate-800">多梦、易醒</span></div>
            <div className="flex justify-between pr-4"><span>平均有氧运动:</span> <span className="text-slate-800">0时0分</span></div>
            <div className="flex justify-between pl-4"><span>疲劳状态:</span> <span className="text-slate-800">轻度疲劳</span></div>
          </div>

          <div className="space-y-2 text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
             <p>心率曲线所见，健康心率波形，心率正常，请持续保持。</p>
             <p>血压曲线所见，健康血压波形，血压正常，压差正常，血管负荷值正常，请持续保持。</p>
             <p>血氧曲线所见，健康血氧波形，血氧正常，请持续保持。</p>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center mb-2">
               <span className="font-bold text-slate-800 text-sm mr-4">情绪状态:</span>
               <span className="text-sm">正向情绪</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              情绪状态曲线所见，正向情绪占比大于负向情绪。放松、自信、乐观、愉快等情绪统称为正向情绪。积极的正向情绪对身体健康是有帮助的。
            </p>
          </div>
        </div>

        {/* Section 4: TCM Evaluation */}
        <div className="bg-white p-4 mb-2 animate-fade-in-up delay-200">
           <div className="flex justify-between items-center mb-3">
             <h3 className="font-bold text-slate-800">中西医评估</h3>
           </div>
           
           <div className="mb-4">
             <h4 className="font-bold text-sm text-slate-700 mb-1">西医评估</h4>
             <p className="text-xs text-gray-500">心率: 正常。血压: 正常。血氧: 正常。血糖: 正常。</p>
           </div>

           <div>
             <h4 className="font-bold text-sm text-slate-700 mb-2">中医评估</h4>
             <div className="flex items-center mb-2">
               <span className="font-bold text-slate-800 text-sm">肾经 (足少阴)</span>
               <span className="ml-2 bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded border border-orange-200">实证</span>
               <HelpCircle size={14} className="ml-1 text-gray-400" />
             </div>
             <p className="text-xs text-gray-500 leading-relaxed mb-3">
               证候分析：耳鸣、口干舌燥、小便量少、色深、浑浊、性欲减退、神经衰弱、足发热发汗...
             </p>
             <p className="text-xs text-gray-500 leading-relaxed">
               常见症状：皮肤黑斑，失去光泽。口干舌燥，喉咙肿痛。站起身时头晕、食欲减退。
             </p>
           </div>
        </div>

        {/* Section 5: Regimen */}
        <div className="bg-white p-4 pb-10 animate-fade-in-up delay-300">
           <h3 className="font-bold text-slate-800 mb-4">中医调养方案</h3>
           
           {/* Diet */}
           <div className="mb-6">
             <h4 className="font-bold text-sm text-slate-700 mb-2">膳食调养</h4>
             <p className="text-xs text-gray-500 mb-3">
               肾属水，喜黑色和紫色食物，如黑豆，黑米等，多食有益肾脏。
             </p>
             <div className="flex flex-wrap gap-2">
               {['紫薯黑米粥', '益智粳米粥', '女贞子粥', '淡菜粥', '金针菇拌竹笋', '桑椹山药面'].map((item, i) => (
                 <span key={i} className="text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors">
                   {item}
                 </span>
               ))}
             </div>
           </div>

           {/* Meridian */}
           <div>
             <h4 className="font-bold text-sm text-slate-700 mb-2">经络养生</h4>
             <div className="flex items-center mb-2 space-x-2">
                <span className="font-bold text-slate-800 text-sm">照海穴</span>
                <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">艾灸方案</span>
             </div>
             <p className="text-xs text-gray-500 mb-3">位置: 足内侧，内踝尖下方凹陷处。</p>
             
             {/* Acupoint Image Placeholder Simulation */}
             <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-40 relative overflow-hidden group">
                {/* Simplified Foot SVG */}
                <svg viewBox="0 0 200 100" className="w-full h-full text-gray-400 fill-white stroke-current stroke-2 transition-transform group-hover:scale-105 duration-500">
                   <path d="M20,20 Q60,10 100,30 T180,80 L160,90 Q120,80 80,70 T20,60 Z" />
                   <circle cx="100" cy="50" r="3" className="fill-red-500 stroke-none animate-ping" />
                   <text x="110" y="50" className="text-[10px] fill-slate-700 stroke-none">照海</text>
                   <text x="140" y="40" className="text-[10px] fill-slate-700 stroke-none">太溪</text>
                   <circle cx="130" cy="40" r="2" className="fill-black stroke-none" />
                </svg>
             </div>
             <div className="text-xs text-gray-500 mt-2">
               主治: 咽喉干燥，痫证，失眠，嗜卧，惊恐不宁。
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};