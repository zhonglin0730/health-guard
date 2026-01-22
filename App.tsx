import React, { useState, useEffect } from 'react';
import { Home, Activity, FileText, User } from 'lucide-react';
import { Tab } from './types';
import { HomeView } from './components/HomeView';
import { MonitorView } from './components/MonitorView';
import { TCMView } from './components/TCMView';
import { ProfileView } from './components/ProfileView';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation reset on tab change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [currentTab]);

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-slate-800 flex justify-center items-start pt-0 sm:pt-10">
      {/* Mobile Container Constraint - Added border on desktop for realism */}
      <div className="w-full max-w-md bg-gray-50 h-screen sm:h-[844px] sm:rounded-[3rem] sm:border-8 sm:border-slate-900 shadow-2xl relative flex flex-col overflow-hidden ring-4 ring-slate-900/5">
        
        {/* Dynamic Island Notch Simulation (Desktop only visual) */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50"></div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-[calc(4rem+env(safe-area-inset-bottom))] bg-gray-50 relative">
          <div 
            key={currentTab}
            className={`min-h-full ${isAnimating ? 'animate-in fade-in slide-in-from-bottom-2 duration-300' : ''}`}
          >
            {currentTab === 'home' && <HomeView />}
            {currentTab === 'monitor' && <MonitorView />}
            {currentTab === 'tcm' && <TCMView />}
            {currentTab === 'profile' && <ProfileView />}
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-white/90 backdrop-blur-md border-t border-gray-200 fixed sm:absolute bottom-0 w-full z-40 pb-[env(safe-area-inset-bottom)]">
          <div className="flex justify-around items-center h-16">
            <button 
              onClick={() => setCurrentTab('home')}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-90 transition-transform duration-200 group`}
            >
              <div className={`p-1 rounded-xl transition-colors ${currentTab === 'home' ? 'bg-blue-50' : 'bg-transparent'}`}>
                <Home size={24} className={currentTab === 'home' ? 'text-blue-600 fill-blue-600' : 'text-gray-400 group-hover:text-gray-600'} strokeWidth={currentTab === 'home' ? 2 : 2} />
              </div>
              <span className={`text-[10px] font-medium ${currentTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>健康</span>
            </button>
            
            <button 
              onClick={() => setCurrentTab('monitor')}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-90 transition-transform duration-200 group`}
            >
              <div className={`p-1 rounded-xl transition-colors ${currentTab === 'monitor' ? 'bg-blue-50' : 'bg-transparent'}`}>
                <Activity size={24} className={currentTab === 'monitor' ? 'text-blue-600 fill-blue-600' : 'text-gray-400 group-hover:text-gray-600'} strokeWidth={currentTab === 'monitor' ? 2 : 2} />
              </div>
              <span className={`text-[10px] font-medium ${currentTab === 'monitor' ? 'text-blue-600' : 'text-gray-400'}`}>监测</span>
            </button>
            
            <button 
              onClick={() => setCurrentTab('tcm')}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-90 transition-transform duration-200 group`}
            >
              <div className={`p-1 rounded-xl transition-colors ${currentTab === 'tcm' ? 'bg-blue-50' : 'bg-transparent'}`}>
                <FileText size={24} className={currentTab === 'tcm' ? 'text-blue-600 fill-blue-600' : 'text-gray-400 group-hover:text-gray-600'} strokeWidth={currentTab === 'tcm' ? 2 : 2} />
              </div>
              <span className={`text-[10px] font-medium ${currentTab === 'tcm' ? 'text-blue-600' : 'text-gray-400'}`}>中医</span>
            </button>
            
            <button 
              onClick={() => setCurrentTab('profile')}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-90 transition-transform duration-200 group`}
            >
               <div className={`p-1 rounded-xl transition-colors ${currentTab === 'profile' ? 'bg-blue-50' : 'bg-transparent'}`}>
                <User size={24} className={currentTab === 'profile' ? 'text-blue-600 fill-blue-600' : 'text-gray-400 group-hover:text-gray-600'} strokeWidth={currentTab === 'profile' ? 2 : 2} />
              </div>
              <span className={`text-[10px] font-medium ${currentTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}>我的</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default App;