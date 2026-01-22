import React, { useState } from 'react';
import { X, ChevronRight, HelpCircle, AlertTriangle, CheckCircle2, Share2, Activity } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

interface RiskAnalysisViewProps {
  type: 'heart' | 'brain' | 'tumor';
  onClose: () => void;
}

export const RiskAnalysisView: React.FC<RiskAnalysisViewProps> = ({ type, onClose }) => {
  const [activeTab, setActiveTab] = useState<'dad' | 'self' | 'mom'>('self');

  // Configuration based on risk type
  // Added 'short' for chart labels, kept 'label' for the list
  const getRiskConfig = (t: 'heart' | 'brain' | 'tumor') => {
    switch (t) {
      case 'heart':
        return {
          title: '心梗风险评估',
          score: 88, // Risk Score (0-100)
          riskLevel: '中风险',
          data: [
            { subject: '血压区间', A: 90, B: 60, fullMark: 100, label: '血压区间过高', status: 'high' },
            { subject: '血压网谷', A: 40, B: 60, fullMark: 100, label: '血压在网谷', status: 'normal' },
            { subject: '血压压差', A: 85, B: 60, fullMark: 100, label: '血压压差过大', status: 'high' },
            { subject: '心动过缓', A: 80, B: 60, fullMark: 100, label: '寒性心动过缓型', status: 'high' },
            { subject: '血压负荷', A: 95, B: 60, fullMark: 100, label: '血压负荷过高', status: 'high' },
            { subject: '高血压II', A: 50, B: 60, fullMark: 100, label: '高血压II型', status: 'normal' },
          ]
        };
      case 'brain':
        return {
          title: '脑卒中风险评估',
          score: 42,
          riskLevel: '低风险',
          data: [
            { subject: '脑供血', A: 80, B: 60, fullMark: 100, label: '脑供血不足', status: 'high' },
            { subject: '动脉硬化', A: 75, B: 60, fullMark: 100, label: '动脉硬化指数', status: 'high' },
            { subject: '血流速度', A: 85, B: 60, fullMark: 100, label: '血流速度异常', status: 'high' },
            { subject: '血管弹性', A: 40, B: 60, fullMark: 100, label: '血管弹性减弱', status: 'normal' },
            { subject: '血液粘稠', A: 70, B: 60, fullMark: 100, label: '血液粘稠度', status: 'high' },
            { subject: '微循环', A: 30, B: 60, fullMark: 100, label: '微循环障碍', status: 'normal' },
          ]
        };
      case 'tumor':
        return {
          title: '肿瘤风险评估',
          score: 15,
          riskLevel: '安全',
          data: [
            { subject: '血氧均值', A: 30, B: 60, fullMark: 100, label: '血氧平均值正常', status: 'normal' },
            { subject: '慢性炎症', A: 20, B: 60, fullMark: 100, label: '无明显炎症反应', status: 'normal' },
            { subject: '免疫活性', A: 80, B: 60, fullMark: 100, label: '免疫系统活性强', status: 'normal' }, // Inverted logic for display maybe
            { subject: '淋巴循环', A: 40, B: 60, fullMark: 100, label: '淋巴循环状态', status: 'normal' },
            { subject: '细胞代谢', A: 50, B: 60, fullMark: 100, label: '细胞代谢率', status: 'normal' },
            { subject: '自由基', A: 45, B: 60, fullMark: 100, label: '自由基水平', status: 'normal' },
          ]
        };
    }
  };

  const config = getRiskConfig(type);
  const highRisks = config.data.filter(d => d.status === 'high');
  const normalItems = config.data.filter(d => d.status === 'normal');

  return (
    <div className="fixed inset-0 z-50 bg-[#1e293b] flex flex-col font-sans animate-in fade-in duration-300">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-[#0f172a] to-slate-900 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-96 bg-blue-500/10 rounded-b-[50%] blur-3xl z-0 pointer-events-none"></div>

      {/* Navbar */}
      <div className="relative z-20 flex items-center justify-between px-4 py-4 text-white/90">
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X size={24} />
        </button>
        <div className="flex bg-black/20 p-1 rounded-full backdrop-blur-md">
          <button 
            onClick={() => setActiveTab('dad')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'dad' ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            爸爸
          </button>
          <button 
            onClick={() => setActiveTab('self')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'self' ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            自己
          </button>
          <button 
             onClick={() => setActiveTab('mom')}
             className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'mom' ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            妈妈
          </button>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
           <Share2 size={22} />
        </button>
      </div>

      {/* Main Content Scrollable */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 pb-20">
        
        {/* Header Title */}
        <div className="text-center mt-2 mb-6">
          <h2 className="text-2xl font-bold text-white mb-1 flex items-center justify-center">
             {config.title}
             <HelpCircle size={16} className="ml-2 text-blue-300 opacity-60" />
          </h2>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <span className="text-blue-200">AI 智能评估中</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </div>
        </div>

        {/* Radar Chart Container */}
        <div className="h-64 w-full relative mb-6">
           <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={config.data}>
                <defs>
                   <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.2}/>
                   </linearGradient>
                </defs>
                <PolarGrid gridType="polygon" stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="当前风险"
                  dataKey="A"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#radarFill)"
                  fillOpacity={0.6}
                />
                <Radar
                  name="标准参考"
                  dataKey="B"
                  stroke="#22c55e"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  fill="transparent"
                  fillOpacity={0.1}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
              </RadarChart>
           </ResponsiveContainer>
           
           {/* Center Icon Overlay */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
              <Activity size={40} className="text-white" />
           </div>
        </div>

        {/* Diagnosis List Card */}
        <div className="bg-white rounded-t-3xl min-h-[500px] px-6 py-6 animate-fade-in-up">
           <div className="flex justify-center mb-6">
              <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
           </div>

           <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">诊断结果详情</h3>
              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                config.score > 50 
                ? 'bg-red-50 text-red-600 border-red-100' 
                : 'bg-green-50 text-green-600 border-green-100'
              }`}>
                综合评估: {config.riskLevel}
              </div>
           </div>

           {/* High Risk Items */}
           {highRisks.length > 0 && (
             <div className="mb-6">
               <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                 <AlertTriangle size={14} className="mr-1 text-red-500" />
                 异常指标 ({highRisks.length})
               </h4>
               <div className="space-y-3">
                 {highRisks.map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-red-50/50 border border-red-100 rounded-xl hover:bg-red-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-sm font-bold text-slate-700">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className="text-red-300" />
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* Normal Items */}
           <div>
             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
               <CheckCircle2 size={14} className="mr-1 text-green-500" />
               正常指标 ({normalItems.length})
             </h4>
             <div className="space-y-3">
               {normalItems.map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium text-slate-600">{item.label}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">正常</span>
                 </div>
               ))}
             </div>
           </div>
           
           {/* Disclaimer */}
           <div className="mt-8 text-[10px] text-gray-400 text-center leading-relaxed px-4">
             本评估结果基于AI大数据模型分析，仅供健康参考，不作为医疗诊断依据。如感不适请及时就医。
           </div>
        </div>
      </div>
    </div>
  );
};