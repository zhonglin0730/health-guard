import React, { useState } from 'react';
import { User, Settings, Phone, ChevronRight, Watch, LogOut, FileText, Bell, Shield, ChevronLeft, Calendar, AlertCircle, Battery, Trash2, Smartphone, Lock } from 'lucide-react';

// --- Sub-View: History Archive ---
const HistoryView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'week' | 'month'>('week');

  const weeklyReports = [
    { title: '第43周健康周报', date: '2023-10-23 ~ 2023-10-29', score: 88, status: '良好', color: 'text-blue-600' },
    { title: '第42周健康周报', date: '2023-10-16 ~ 2023-10-22', score: 75, status: '亚健康', color: 'text-orange-500' },
    { title: '第41周健康周报', date: '2023-10-09 ~ 2023-10-15', score: 92, status: '优秀', color: 'text-green-600' },
    { title: '第40周健康周报', date: '2023-10-02 ~ 2023-10-08', score: 90, status: '优秀', color: 'text-green-600' },
    { title: '第39周健康周报', date: '2023-09-25 ~ 2023-10-01', score: 93, status: '优秀', color: 'text-green-600' },
  ];

  const monthlyReports = [
    { title: '2023年10月健康月报', date: '2023-10-01 ~ 2023-10-31', score: 91, status: '优秀', color: 'text-green-600' },
    { title: '2023年9月健康月报', date: '2023-09-01 ~ 2023-09-30', score: 95, status: '优秀', color: 'text-green-600' },
    { title: '2023年8月健康月报', date: '2023-08-01 ~ 2023-08-31', score: 85, status: '良好', color: 'text-blue-600' },
    { title: '2023年7月健康月报', date: '2023-07-01 ~ 2023-07-31', score: 88, status: '良好', color: 'text-blue-600' },
  ];

  const currentReports = activeTab === 'week' ? weeklyReports : monthlyReports;

  return (
    <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-300">
      <div className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="mr-2 p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="text-gray-600" />
        </button>
        <h2 className="text-lg font-bold text-slate-800">历史健康档案</h2>
      </div>
      
      <div className="p-4">
         {/* Tab Switcher */}
         <div className="flex bg-gray-200/50 p-1 rounded-xl mb-4">
            <button
              onClick={() => setActiveTab('week')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === 'week' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              健康周报
            </button>
            <button
              onClick={() => setActiveTab('month')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === 'month' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              健康月报
            </button>
         </div>

         <div className="space-y-3">
           {currentReports.map((report, i) => (
             <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center active:bg-gray-50 transition-colors animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                <div>
                  <div className="font-bold text-slate-700 text-sm sm:text-base">{report.title}</div>
                  <div className="flex items-center text-xs text-gray-400 mt-1 space-x-2">
                     <Calendar size={12} />
                     <span>{report.date}</span>
                  </div>
                </div>
                <div className="text-right pl-4">
                  <div className={`text-lg font-bold ${report.color}`}>{report.score}分</div>
                  <div className="text-xs text-gray-400">{report.status}</div>
                </div>
             </div>
           ))}
         </div>
         
         <div className="text-center text-xs text-gray-400 mt-8 mb-4">
           {activeTab === 'week' ? '每周一上午 08:00 生成上周报告' : '每月1号上午 09:00 生成上月报告'}
         </div>
      </div>
    </div>
  );
};

// --- Sub-View: Notifications ---
const NotificationsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const notifications = [
    { title: '心率异常预警', desc: '监测到今日14:30心率出现短时过速，请注意休息。', time: '14:30', type: 'alert' },
    { title: '周报生成提醒', desc: '您的第43周健康周报已生成，点击查看详情。', time: '昨天', type: 'system' },
    { title: '设备电量低', desc: '您的普济预警手表电量低于20%，请及时充电。', time: '前天', type: 'device' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-300">
      <div className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="mr-2 p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="text-gray-600" />
        </button>
        <h2 className="text-lg font-bold text-slate-800">消息通知</h2>
      </div>

      <div className="p-4 space-y-3">
        {notifications.map((note, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-3">
             <div className={`p-2 rounded-full flex-shrink-0 ${
               note.type === 'alert' ? 'bg-red-100 text-red-500' :
               note.type === 'device' ? 'bg-gray-100 text-gray-500' :
               'bg-blue-100 text-blue-500'
             }`}>
               {note.type === 'alert' ? <AlertCircle size={20} /> : 
                note.type === 'device' ? <Battery size={20} /> : 
                <FileText size={20} />}
             </div>
             <div className="flex-1">
               <div className="flex justify-between items-start">
                 <h3 className="font-bold text-slate-800 text-sm">{note.title}</h3>
                 <span className="text-xs text-gray-400">{note.time}</span>
               </div>
               <p className="text-xs text-gray-500 mt-1 leading-relaxed">{note.desc}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Sub-View: Settings ---
const SettingsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-300">
      <div className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="mr-2 p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="text-gray-600" />
        </button>
        <h2 className="text-lg font-bold text-slate-800">系统设置</h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
           <div className="p-4 flex items-center justify-between border-b border-gray-50">
              <span className="text-sm font-bold text-slate-700">推送通知</span>
              <div className="w-10 h-6 bg-blue-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
           </div>
           <div className="p-4 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700">短信预警</span>
              <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
           </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-gray-50">
           <button className="w-full p-4 flex items-center justify-between active:bg-gray-50">
              <div className="flex items-center space-x-3 text-slate-700">
                <Smartphone size={18} />
                <span className="text-sm font-medium">通用</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
           </button>
           <button className="w-full p-4 flex items-center justify-between active:bg-gray-50">
              <div className="flex items-center space-x-3 text-slate-700">
                <Lock size={18} />
                <span className="text-sm font-medium">隐私与权限</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
           </button>
           <button className="w-full p-4 flex items-center justify-between active:bg-gray-50">
              <div className="flex items-center space-x-3 text-slate-700">
                <Trash2 size={18} />
                <span className="text-sm font-medium">清除缓存</span>
              </div>
              <span className="text-xs text-gray-400">24.5MB</span>
           </button>
        </div>

        <div className="text-center mt-8">
           <div className="text-xs text-gray-400">当前版本 3.2.0</div>
           <div className="text-[10px] text-gray-300 mt-1">普济健康科技 版权所有</div>
        </div>
      </div>
    </div>
  );
};


// --- Main Profile View ---
export const ProfileView: React.FC = () => {
  const [currentView, setCurrentView] = useState<'main' | 'history' | 'notifications' | 'settings'>('main');

  if (currentView === 'history') return <HistoryView onBack={() => setCurrentView('main')} />;
  if (currentView === 'notifications') return <NotificationsView onBack={() => setCurrentView('main')} />;
  if (currentView === 'settings') return <SettingsView onBack={() => setCurrentView('main')} />;

  return (
    <div className="pb-24 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="bg-blue-600 pt-12 pb-8 px-6 rounded-b-3xl text-white shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center border-2 border-white/30 text-2xl font-bold">
            普
          </div>
          <div>
            <h1 className="text-xl font-bold">普济用户_8821</h1>
            <p className="text-blue-200 text-sm mt-1">ID: 88219032</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6 space-y-4">
        {/* Device Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
           <div className="flex items-center space-x-3">
             <div className="bg-slate-100 p-2 rounded-lg">
               <Watch className="text-slate-700" size={24} />
             </div>
             <div>
               <h3 className="font-bold text-slate-800 text-sm">普济预警手表 3S</h3>
               <div className="flex items-center mt-1 space-x-2">
                 <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                 <span className="text-xs text-gray-500">已连接 | 电量 82%</span>
               </div>
             </div>
           </div>
           <button className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
             管理
           </button>
        </div>

        {/* SOS Settings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
             <h3 className="font-bold text-slate-700 text-sm">紧急预警设置</h3>
          </div>
          
          <div className="divide-y divide-gray-50">
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-red-500" />
                <span className="text-sm text-slate-700">紧急联系人</span>
              </div>
              <div className="flex items-center text-gray-400">
                <span className="text-xs mr-2">已设置 (儿子)</span>
                <ChevronRight size={16} />
              </div>
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Shield size={18} className="text-blue-500" />
                <span className="text-sm text-slate-700">预警阈值灵敏度</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
             <h3 className="font-bold text-slate-700 text-sm">通用功能</h3>
          </div>
          
          <div className="divide-y divide-gray-50">
            <button 
              onClick={() => setCurrentView('history')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FileText size={18} className="text-gray-500" />
                <span className="text-sm text-slate-700">历史健康档案</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
            <button 
              onClick={() => setCurrentView('notifications')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Bell size={18} className="text-gray-500" />
                <span className="text-sm text-slate-700">消息通知</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
            <button 
              onClick={() => setCurrentView('settings')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Settings size={18} className="text-gray-500" />
                <span className="text-sm text-slate-700">系统设置</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        <button className="w-full bg-white text-red-500 p-4 rounded-xl shadow-sm font-medium flex items-center justify-center space-x-2 active:bg-red-50 transition-colors">
          <LogOut size={18} />
          <span>退出登录</span>
        </button>

        <p className="text-center text-xs text-gray-400 pt-4">Version 3.2.0 (Build 20231025)</p>
      </div>
    </div>
  );
};