import React from 'react';
import { Heart, Wind, Droplet, Activity, Zap, Circle, Bone, Baby } from 'lucide-react';

interface OrganMapProps {
  selectedOrgan?: string;
  onSelect?: (name: string) => void;
}

// Icons mapping with custom SVG for Stomach to look more organic
const iconMap: Record<string, React.ReactNode> = {
  '心': <Heart size={18} fill="currentColor" />,
  '小肠': <Activity size={18} />,
  '肝': <Zap size={18} fill="currentColor" />,
  '胆': <Droplet size={18} />,
  '脾': <Circle size={18} />, 
  // Custom Stomach Icon (Abstract Organ Sac Shape) replacing Utensils
  '胃': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 10c0-3.31-2.69-6-6-6h-2c-3.31 0-6 2.69-6 6v2c0 4.42 3.58 8 8 8h2c2.21 0 4-1.79 4-4v-6z" />
      <path d="M8 5a2 2 0 0 0-2 2v2" opacity="0.5"/>
    </svg>
  ),
  '肺': <Wind size={18} />, 
  '大肠': <Activity size={18} className="rotate-90" />,
  '肾': <Droplet size={18} fill="currentColor" />, 
  '膀胱': <Circle size={18} />,
  '心包': <Heart size={16} />,
  '脊椎': <Bone size={16} />,
  '淋巴': <Activity size={16} />, 
  '生殖': <Baby size={16} />,
};

export const OrganMap: React.FC<OrganMapProps> = ({ selectedOrgan = '心', onSelect }) => {
  
  const outerOrgans = [
    { name: '小肠', left: '33.33%', top: '6.67%', color: 'bg-[#4ade80]', icon: '小肠' },
    { name: '心', left: '66.67%', top: '6.67%', color: 'bg-[#4ade80]', icon: '心' },
    
    { name: '大肠', left: '93.33%', top: '33.33%', color: 'bg-[#4ade80]', icon: '大肠' },
    { name: '肺', left: '93.33%', top: '66.67%', color: 'bg-[#4ade80]', icon: '肺' },

    { name: '膀胱', left: '66.67%', top: '93.33%', color: 'bg-[#4ade80]', icon: '膀胱' },
    { name: '肾', left: '33.33%', top: '93.33%', color: 'bg-[#4ade80]', icon: '肾' },
    
    { name: '胆', left: '6.67%', top: '66.67%', color: 'bg-[#4ade80]', icon: '胆' },
    { name: '肝', left: '6.67%', top: '33.33%', color: 'bg-[#4ade80]', icon: '肝' },
  ];

  const innerOrgans = [
    // Adjusted inner positioning for better centering
    { name: '胃', top: '28%', left: '50%', color: 'text-[#4ade80]', icon: '胃' },
    { name: '脾', top: '72%', left: '50%', color: 'text-[#4ade80]', icon: '脾' },
  ];

  const bottomRow = [
    { name: '淋巴', icon: '淋巴' },
    { name: '心包', icon: '心包' },
    { name: '脊椎', icon: '脊椎' },
    { name: '生殖', icon: '生殖' },
  ];

  const handleSelect = (name: string) => {
    if (onSelect) onSelect(name);
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Hexagonal Map Container */}
      <div className="relative w-full max-w-[280px] aspect-square my-4">
        {/* Background Lines */}
        <svg className="absolute inset-0 w-full h-full text-gray-200 pointer-events-none" viewBox="0 0 300 300">
           <path d="M100,20 L200,20 L280,100 L280,200 L200,280 L100,280 L20,200 L20,100 Z" fill="none" stroke="currentColor" strokeWidth="1" />
           <circle cx="150" cy="150" r="70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {/* Central Tai Chi */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44%] h-[44%] rounded-full border border-gray-100 flex items-center justify-center overflow-hidden bg-white shadow-sm z-0">
          <div className="w-full h-full relative opacity-20">
             <div className="absolute left-0 top-0 w-1/2 h-full bg-black rounded-l-full"></div>
             <div className="absolute right-0 top-0 w-1/2 h-full bg-white rounded-r-full border-l border-black"></div>
             <div className="absolute left-1/2 bottom-0 w-[50%] h-[50%] bg-black rounded-full -translate-x-1/2"></div>
             <div className="absolute left-1/2 top-0 w-[50%] h-[50%] bg-white rounded-full -translate-x-1/2"></div>
          </div>
          
          {/* Inner Organs (Stomach & Spleen) */}
          {innerOrgans.map((organ) => (
            <div 
              key={organ.name}
              onClick={() => handleSelect(organ.name)}
              className={`absolute left-1/2 -translate-x-1/2 z-10 cursor-pointer transition-all duration-300 group ${
                 selectedOrgan === organ.name ? 'scale-110' : 'hover:scale-105'
              }`}
              style={{ top: organ.top }}
            >
               <div className={`flex flex-col items-center justify-center gap-0.5 ${organ.color} ${selectedOrgan === organ.name ? 'drop-shadow-md font-bold' : ''}`}>
                 {/* Icon Container */}
                 <div className="relative">
                    {iconMap[organ.icon]}
                 </div>
                 <span className="text-xs leading-none">{organ.name}</span>
               </div>
            </div>
          ))}
        </div>

        {/* Outer Organs */}
        {outerOrgans.map((organ, i) => (
          <button 
            key={i} 
            onClick={() => handleSelect(organ.name)}
            className="absolute flex flex-col items-center z-10 transition-all duration-300"
            style={{ 
              left: organ.left, 
              top: organ.top,
              transform: selectedOrgan === organ.name ? 'translate(-50%, -50%) scale(1.15)' : 'translate(-50%, -50%) scale(1)'
            }}
          >
            <div className={`
              w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md border-2 
              transition-all duration-300
              ${selectedOrgan === organ.name ? 'ring-4 ring-blue-100 border-blue-500 scale-105' : 'border-white hover:scale-105'}
              ${organ.name === '肝' ? 'bg-orange-400' : 'bg-[#4ade80]'} 
            `}>
              {iconMap[organ.icon]}
            </div>
            <span className={`text-[10px] font-bold mt-1 transition-colors ${selectedOrgan === organ.name ? 'text-blue-600' : 'text-gray-500'}`}>
              {organ.name}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="flex justify-around w-full px-4 mt-2 mb-6 max-w-xs border-t border-gray-100 pt-4">
         {bottomRow.map((organ, i) => (
           <button 
            key={i} 
            onClick={() => handleSelect(organ.name)}
            className="flex flex-col items-center transition-all duration-300 active:scale-95"
           >
              <div className={`
                w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm border
                transition-all duration-300
                ${selectedOrgan === organ.name ? 'bg-blue-500 ring-2 ring-blue-200 border-blue-500' : 'bg-[#4ade80] border-white'}
              `}>
                 {iconMap[organ.icon]}
              </div>
              <span className={`text-[10px] mt-1 ${selectedOrgan === organ.name ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                {organ.name}
              </span>
           </button>
         ))}
      </div>

      {/* Dynamic Status Legend */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] text-gray-400 bg-white shadow-sm border border-gray-100 px-4 py-2 rounded-full max-w-full">
         <div className="flex items-center"><div className="w-2 h-2 bg-[#4ade80] rounded-full mr-1.5 shadow-sm shadow-green-200"></div>健康</div>
         <div className="flex items-center"><div className="w-2 h-2 bg-orange-400 rounded-full mr-1.5 shadow-sm shadow-orange-200"></div>亚健康</div>
         <div className="flex items-center"><div className="w-2 h-2 bg-red-500 rounded-full mr-1.5 shadow-sm shadow-red-200"></div>风险</div>
      </div>

    </div>
  );
};