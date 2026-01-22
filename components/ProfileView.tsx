import React, { useState } from 'react';
import { User, Settings, Phone, ChevronRight, Watch, LogOut, FileText, Bell, Shield, ChevronLeft, Calendar, AlertCircle, Battery, Trash2, Smartphone, Lock, Plus, MapPin, RefreshCw, X, Sliders, Activity, Heart, Droplet, Info } from 'lucide-react';

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

// --- Sub-View: Device Management (NEW) ---
const DeviceView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-300">
      <div className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="mr-2 p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="text-gray-600" />
        </button>
        <h2 className="text-lg font-bold text-slate-800">设备管理</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Device */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center">
           <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
             <Watch size={48} className="text-blue-600" />
           </div>
           <h3 className="text-lg font-bold text-slate-800">普济预警手表 3S</h3>
           <p className="text-sm text-gray-500 mb-6">SN: PJ-88219032-X</p>
           
           <div className="grid grid-cols-2 gap-4 w-full">
             <div className="bg-gray-50 p-3 rounded-xl flex flex-col items-center">
                <Battery size={20} className="text-green-500 mb-1" />
                <span className="text-xs text-gray-400">电量</span>
                <span className="font-bold text-slate-800">82%</span>
             </div>
             <div className="bg-gray-50 p-3 rounded-xl flex flex-col items-center">
                <Activity size={20} className="text-blue-500 mb-1" />
                <span className="text-xs text-gray-400">状态</span>
                <span className="font-bold text-slate-800">已连接</span>
             </div>
           </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-gray-50">
          <button className="w-full p-4 flex items-center justify-between active:bg-gray-50">
            <div className="flex items-center space-x-3 text-slate-700">
              <MapPin size={18} />
              <span className="text-sm font-medium">查找设备</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center justify-between active:bg-gray-50">
            <div className="flex items-center space-x-3 text-slate-700">
              <RefreshCw size={18} />
              <span className="text-sm font-medium">固件升级</span>
            </div>
            <div className="flex items-center">
               <span className="text-xs text-gray-400 mr-2">已是最新版本</span>
               <ChevronRight size={16} className="text-gray-400" />
            </div>
          </button>
          <button className="w-full p-4 flex items-center justify-between active:bg-gray-50">
            <div className="flex items-center space-x-3 text-slate-700">
              <Settings size={18} />
              <span className="text-sm font-medium">佩戴习惯设置</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>

        <button className="w-full bg-white text-red-500 p-4 rounded-xl shadow-sm font-medium border border-gray-100 active:bg-red-50">
           解除绑定
        </button>
      </div>
    </div>
  );
};

// --- Sub-View: Emergency Contacts (NEW) ---
const ContactsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const contacts = [
    { name: '张强', relation: '儿子', phone: '138****8888', isPrimary: true },
    { name: '李梅', relation: '配偶', phone: '139****9999', isPrimary: false },
  ];

  return (
    <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-300">
      <div className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="mr-2 p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="text-gray-600" />
        </button>
        <h2 className="text-lg font-bold text-slate-800">紧急联系人</h2>
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 mb-4 px-1">
          当检测到重大健康风险或触发SOS时，系统将自动通知以下联系人。
        </div>

        <div className="space-y-3 mb-6">
          {contacts.map((contact, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
               <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                   {contact.relation[0]}
                 </div>
                 <div>
                   <div className="font-bold text-slate-800 text-sm flex items-center">
                     {contact.name} ({contact.relation})
                     {contact.isPrimary && <span className="ml-2 text-[10px] bg-red-100 text-red-500 px-1.5 py-0.5 rounded">首选</span>}
                   </div>
                   <div className="text-xs text-gray-400 mt-0.5">{contact.phone}</div>
                 </div>
               </div>
               <button className="text-gray-400 p-2">
                 <Settings size={18} />
               </button>
            </div>
          ))}
        </div>

        <button className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 flex items-center justify-center space-x-2 font-bold active:bg-gray-50">
           <Plus size={18} />
           <span>添加联系人</span>
        </button>
      </div>
    </div>
  );
};

// --- Sub-View: Threshold Settings (NEW) ---
const ThresholdView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="bg-gray-50 min-h-screen animate-in slide-in-from-right duration-300">
      <div className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="mr-2 p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="text-gray-600" />
        </button>
        <h2 className="text-lg font-bold text-slate-800">预警阈值设置</h2>
      </div>

      <div className="p-4 space-y-6">
         <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-600 leading-relaxed flex items-start">
            <Info size={16} className="mr-2 flex-shrink-0 mt-0.5" />
            系统默认阈值基于AI大数据模型，建议非专业人士保持默认设置。调整过低可能导致频繁误报。
         </div>

         {/* Heart Rate */}
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Heart size={18} className="text-red-500" />
              <h3 className="font-bold text-slate-700">心率预警</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-500">静态心率过高阈值</span>
                  <span className="font-bold text-slate-800">100 bpm</span>
                </div>
                <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" min="80" max="140" defaultValue="100" />
                <div className="flex justify-between text-[10px] text-gray-300 mt-1">
                  <span>80</span>
                  <span>140</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-500">静态心率过低阈值</span>
                  <span className="font-bold text-slate-800">50 bpm</span>
                </div>
                <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" min="30" max="60" defaultValue="50" />
              </div>
            </div>
         </div>

         {/* Blood Pressure */}
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Activity size={18} className="text-blue-500" />
              <h3 className="font-bold text-slate-700">血压预警</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-500">收缩压(高压)上限</span>
                  <span className="font-bold text-slate-800">140 mmHg</span>
                </div>
                <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" min="120" max="180" defaultValue="140" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-500">舒张压(低压)上限</span>
                  <span className="font-bold text-slate-800">90 mmHg</span>
                </div>
                <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" min="80" max="110" defaultValue="90" />
              </div>
            </div>
         </div>

         {/* SpO2 */}
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Droplet size={18} className="text-cyan-500" />
              <h3 className="font-bold text-slate-700">血氧预警</h3>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-500">血氧饱和度下限</span>
                <span className="font-bold text-slate-800">90%</span>
              </div>
              <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" min="80" max="95" defaultValue="90" />
            </div>
         </div>

         <div className="flex justify-end">
           <button className="text-sm text-blue-600 font-bold active:opacity-60">恢复默认设置</button>
         </div>
      </div>
    </div>
  );
};


// --- Main Profile View ---
export const ProfileView: React.FC = () => {
  const [currentView, setCurrentView] = useState<'main' | 'history' | 'notifications' | 'settings' | 'device' | 'contacts' | 'threshold'>('main');

  if (currentView === 'history') return <HistoryView onBack={() => setCurrentView('main')} />;
  if (currentView === 'notifications') return <NotificationsView onBack={() => setCurrentView('main')} />;
  if (currentView === 'settings') return <SettingsView onBack={() => setCurrentView('main')} />;
  if (currentView === 'device') return <DeviceView onBack={() => setCurrentView('main')} />;
  if (currentView === 'contacts') return <ContactsView onBack={() => setCurrentView('main')} />;
  if (currentView === 'threshold') return <ThresholdView onBack={() => setCurrentView('main')} />;

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
           <button 
             onClick={() => setCurrentView('device')}
             className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full active:bg-blue-100 transition-colors"
           >
             管理
           </button>
        </div>

        {/* SOS Settings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
             <h3 className="font-bold text-slate-700 text-sm">紧急预警设置</h3>
          </div>
          
          <div className="divide-y divide-gray-50">
            <button 
              onClick={() => setCurrentView('contacts')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-red-500" />
                <span className="text-sm text-slate-700">紧急联系人</span>
              </div>
              <div className="flex items-center text-gray-400">
                <span className="text-xs mr-2">已设置 (儿子)</span>
                <ChevronRight size={16} />
              </div>
            </button>
            <button 
              onClick={() => setCurrentView('threshold')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
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