import React, { useState } from 'react';
import { Home, Activity, FileText, User } from 'lucide-react';
import { Tab } from './types';
import { HomeView } from './components/HomeView';
import { MonitorView } from './components/MonitorView';
import { TCMView } from './components/TCMView';
import { ProfileView } from './components/ProfileView';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<Tab>('home');

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-slate-800 flex justify-center">
      {/* Mobile Container Constraint */}
      <div className="w-full max-w-md bg-gray-50 min-h-screen shadow-2xl relative flex flex-col">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-[calc(4rem+env(safe-area-inset-bottom))]">
          {currentTab === 'home' && <HomeView />}
          {currentTab === 'monitor' && <MonitorView />}
          {currentTab === 'tcm' && <TCMView />}
          {currentTab === 'profile' && <ProfileView />}
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full max-w-md z-40 pb-[env(safe-area-inset-bottom)]">
          <div className="flex justify-around items-center h-16">
            <button 
              onClick={() => setCurrentTab('home')}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:bg-gray-50 transition-colors ${
                currentTab === 'home' ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <Home size={24} strokeWidth={currentTab === 'home' ? 2.5 : 2} />
              <span className="text-[10px] font-medium">健康</span>
            </button>
            
            <button 
              onClick={() => setCurrentTab('monitor')}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:bg-gray-50 transition-colors ${
                currentTab === 'monitor' ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <Activity size={24} strokeWidth={currentTab === 'monitor' ? 2.5 : 2} />
              <span className="text-[10px] font-medium">监测</span>
            </button>
            
            <button 
              onClick={() => setCurrentTab('tcm')}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:bg-gray-50 transition-colors ${
                currentTab === 'tcm' ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <FileText size={24} strokeWidth={currentTab === 'tcm' ? 2.5 : 2} />
              <span className="text-[10px] font-medium">中医</span>
            </button>
            
            <button 
              onClick={() => setCurrentTab('profile')}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:bg-gray-50 transition-colors ${
                currentTab === 'profile' ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <User size={24} strokeWidth={currentTab === 'profile' ? 2.5 : 2} />
              <span className="text-[10px] font-medium">我的</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default App;