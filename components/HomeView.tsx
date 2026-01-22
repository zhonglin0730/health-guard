import React, { useState, useEffect } from 'react';
import { ShieldAlert, Activity, HeartPulse, Brain, AlertTriangle, Phone, Watch, ChevronRight, Droplet } from 'lucide-react';
import { RiskGauge } from './RiskGauge';
import { ReportView } from './ReportView';
import { RiskAnalysisView } from './RiskAnalysisView';

export const HomeView: React.FC = () => {
  const [showSOS, setShowSOS] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<'heart' | 'brain' | 'tumor' | null>(null);

  // Handle Browser/Mobile Back Button logic
  useEffect(() => {
    const handlePopState = () => {
      // If back button is pressed, close any open overlays
      if (showReport) {
        setShowReport(false);
      }
      if (selectedRisk) {
        setSelectedRisk(null);
      }
      if (showSOS) {
        setShowSOS(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [showReport, selectedRisk, showSOS]);

  // Helper to open overlays and push history state
  const openOverlay = (type: 'report' | 'risk' | 'sos', data?: any) => {
    // Push a new state so the back button works
    window.history.pushState({ overlay: type }, '');
    
    if (type === 'report') setShowReport(true);
    if (type === 'sos') setShowSOS(true);
    if (type === 'risk') setSelectedRisk(data);
  };

  // Helper to close overlay (simulates back button to keep history clean)
  const closeOverlay = () => {
    window.history.back();
  };

  return (
    <div className="space-y-6 pb-20 relative animate-in fade-in duration-500">
      {/* Report Overlay */}
      {showReport && <ReportView onClose={closeOverlay} />}
      
      {/* Risk Analysis Overlay */}
      {selectedRisk && <RiskAnalysisView type={selectedRisk} onClose={closeOverlay} />}

      {/* Header Status */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-b-3xl shadow-lg text-white relative overflow-hidden">
        {/* Subtle decorative pulse in background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h1 className="text-xl font-bold">普济生命健康预警</h1>
            <p className="text-blue-100 text-sm mt-1">AI大数据实时守护中</p>
          </div>
          <div className="flex items-center space-x-1 bg-blue-700/50 px-3 py-1 rounded-full text-xs backdrop-blur-sm">
            <Watch size={12} className="animate-pulse text-green-400" />
            <span>设备已连接</span>
          </div>
        </div>

        {/* SOS Button Overlay */}
        {showSOS && (
          <div className="fixed inset-0 bg-red-600/90 z-50 flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
            <div className="animate-ping absolute inline-flex h-64 w-64 rounded-full bg-red-400 opacity-75"></div>
            <div className="relative z-10 flex flex-col items-center">
              <AlertTriangle size={80} className="mb-4 animate-bounce" />
              <h2 className="text-3xl font-bold mb-2">正在呼救</h2>
              <p className="text-center mb-8 px-8">已向预警中心发送求助信号<br/>正在联系您的紧急联系人...</p>
              <button 
                onClick={closeOverlay}
                className="bg-white text-red-600 px-8 py-3 rounded-full font-bold shadow-lg active:scale-95 transition-transform"
              >
                取消呼救 (长按)
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between items-end relative z-10">
           <div className="text-center">
             <div className="text-3xl font-bold animate-fade-in-up">98</div>
             <div className="text-xs opacity-80">今日健康分</div>
           </div>
           <button 
             onClick={() => openOverlay('sos')}
             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center shadow-lg transition-all text-sm font-bold hover:shadow-red-500/30 hover:scale-105 active:scale-95"
           >
             <Phone size={16} className="mr-2" />
             一键呼救
           </button>
        </div>
      </div>

      {/* Disease Prediction Section (Heart & Brain) */}
      <div className="px-4 animate-fade-in-up delay-100">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-slate-800 text-lg flex items-center">
            <ShieldAlert className="w-5 h-5 text-blue-600 mr-2" />
            普济心脑预警服务
          </h2>
          <span className="text-xs text-gray-400">AI模型预测中</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => openOverlay('risk', 'heart')}
            className="text-left w-full active:scale-[0.98] transition-transform"
          >
            <RiskGauge percentage={12} label="心梗风险" color="#10b981" />
          </button>
          <button 
            onClick={() => openOverlay('risk', 'brain')}
            className="text-left w-full active:scale-[0.98] transition-transform"
          >
            <RiskGauge percentage={8} label="脑卒中风险" color="#10b981" />
          </button>
        </div>
        
        <button 
          onClick={() => openOverlay('risk', 'tumor')}
          className="w-full text-left mt-4 bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-400 active:scale-[0.98] transition-transform relative group"
        >
          <div className="absolute right-4 top-1/2 -translate-x-1/2 text-gray-300 group-hover:translate-x-1 transition-transform">
             <ChevronRight size={20} />
          </div>
          <div className="flex items-start pr-6">
            <Activity className="text-yellow-500 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-slate-700">肿瘤风险提示</h3>
              <p className="text-xs text-gray-500 mt-1">
                基于血氧高频采集与炎症监测。目前状态：<span className="text-green-600 font-bold">低风险</span>
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="px-4 animate-fade-in-up delay-200">
        <h2 className="font-bold text-slate-800 text-lg mb-3">实时体征监测</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col justify-center pl-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 text-xs text-gray-400 mb-1">
               <HeartPulse size={12} className="text-red-500 animate-heartbeat" />
               <span>心率</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-bold text-slate-800">72</span>
              <span className="text-[10px] text-gray-400">bpm</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col justify-center pl-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 text-xs text-gray-400 mb-1">
               <Activity size={12} className="text-blue-500" />
               <span>血压</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-bold text-slate-800">118/78</span>
              <span className="text-[10px] text-gray-400">mmHg</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col justify-center pl-4 hover:shadow-md transition-shadow">
             <div className="flex items-center space-x-2 text-xs text-gray-400 mb-1">
               <Droplet size={12} className="text-pink-500" />
               <span>血糖</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-bold text-slate-800">5.6</span>
              <span className="text-[10px] text-gray-400">mmol/L</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col justify-center pl-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-2 text-xs text-gray-400 mb-1">
               <Activity size={12} className="text-cyan-500"/>
               <span>血氧</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-bold text-slate-800">98</span>
              <span className="text-[10px] text-gray-400">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-4 animate-fade-in-up delay-300">
         <button 
            onClick={() => openOverlay('report')}
            className="w-full text-left bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white flex items-center justify-between shadow-md active:scale-[0.98] transition-transform group"
         >
            <div>
              <div className="font-bold">健康管理报告</div>
              <div className="text-xs opacity-80 mt-1">点击查看本周中医脏腑调养建议</div>
            </div>
            <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
              <Brain size={20} className="group-hover:rotate-12 transition-transform" />
            </div>
         </button>
      </div>
    </div>
  );
};