import React from 'react';
import { Heart, Wind, Utensils, Droplet, Activity, Zap, Circle, Bone, Baby } from 'lucide-react';

// Icons mapping to simulate the screenshot visual
const iconMap: Record<string, React.ReactNode> = {
  '心': <Heart size={18} fill="currentColor" />,
  '小肠': <Activity size={18} />,
  '肝': <Zap size={18} fill="currentColor" />,
  '胆': <Droplet size={18} />,
  '脾': <Circle size={18} />, 
  '胃': <Utensils size={18} />, 
  '肺': <Wind size={18} />, 
  '大肠': <Activity size={18} className="rotate-90" />,
  '肾': <Droplet size={18} fill="currentColor" />, 
  '膀胱': <Circle size={18} />,
  '心包': <Heart size={16} />,
  '脊椎': <Bone size={16} />,
  '淋巴': <Activity size={16} />, 
  '生殖': <Baby size={16} />,
};

export const OrganMap: React.FC = () => {
  // Coordinate system based on SVG viewBox 0 0 300 300
  // Vertices: (100,20), (200,20), (280,100), (280,200), (200,280), (100,280), (20,200), (20,100)
  // Percentages: 
  // 20/300 = 6.67%
  // 100/300 = 33.33%
  // 200/300 = 66.67%
  // 280/300 = 93.33%

  const outerOrgans = [
    { name: '小肠', left: '33.33%', top: '6.67%', color: 'bg-[#4ade80]', icon: '小肠' }, // Top Left
    { name: '心', left: '66.67%', top: '6.67%', color: 'bg-[#4ade80]', icon: '心' }, // Top Right
    
    { name: '大肠', left: '93.33%', top: '33.33%', color: 'bg-[#4ade80]', icon: '大肠' }, // Right Top
    { name: '肺', left: '93.33%', top: '66.67%', color: 'bg-[#4ade80]', icon: '肺' }, // Right Bottom

    { name: '膀胱', left: '66.67%', top: '93.33%', color: 'bg-[#4ade80]', icon: '膀胱' }, // Bottom Right
    { name: '肾', left: '33.33%', top: '93.33%', color: 'bg-[#4ade80]', icon: '肾' }, // Bottom Left
    
    { name: '胆', left: '6.67%', top: '66.67%', color: 'bg-[#4ade80]', icon: '胆' }, // Left Bottom
    { name: '肝', left: '6.67%', top: '33.33%', color: 'bg-[#4ade80]', icon: '肝' }, // Left Top
  ];

  // Inner Circle Organs (Yin Yang Surroundings)
  const innerOrgans = [
    { name: '胃', top: '25%', left: '50%', color: 'text-[#4ade80]', icon: '胃' },
    { name: '脾', top: '75%', left: '50%', color: 'text-[#4ade80]', icon: '脾' },
  ];

  // Bottom Row Separate Organs
  const bottomRow = [
    { name: '淋巴', icon: '淋巴' },
    { name: '心包', icon: '心包' },
    { name: '脊椎', icon: '脊椎' },
    { name: '生殖', icon: '生殖' },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Hexagonal Map Container - Responsive Width */}
      <div className="relative w-full max-w-[280px] aspect-square my-4">
        {/* Connection Lines (Hexagon Shape) */}
        <svg className="absolute inset-0 w-full h-full text-gray-200 pointer-events-none" viewBox="0 0 300 300">
           <path d="M100,20 L200,20 L280,100 L280,200 L200,280 L100,280 L20,200 L20,100 Z" fill="none" stroke="currentColor" strokeWidth="1" />
           {/* Inner circle line */}
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
          {/* Inner Organs inside Tai Chi */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 font-bold text-[#4ade80] flex flex-col items-center z-10">
             <Utensils size={20} />
             <span className="text-xs mt-0.5">胃</span>
          </div>
          <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 font-bold text-[#4ade80] flex flex-col items-center z-10">
             <Circle size={20} />
             <span className="text-xs mt-0.5">脾</span>
          </div>
        </div>

        {/* Outer Organs */}
        {outerOrgans.map((organ, i) => (
          <div 
            key={i} 
            className="absolute flex flex-col items-center z-10 transition-transform hover:scale-110"
            style={{ 
              left: organ.left, 
              top: organ.top,
              transform: 'translate(-50%, -50%)' // Ensure center of icon aligns with coordinate
            }}
          >
            <div className={`w-9 h-9 rounded-full ${organ.color} flex items-center justify-center text-white shadow-md border-2 border-white mb-1`}>
              {iconMap[organ.icon]}
            </div>
            <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap">{organ.name}</span>
          </div>
        ))}
      </div>

      {/* Bottom Row Extra Organs - Adjusted spacing */}
      <div className="flex justify-around w-full px-4 mt-2 mb-6 max-w-xs">
         {bottomRow.map((organ, i) => (
           <div key={i} className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-[#4ade80] flex items-center justify-center text-white shadow-sm border border-white mb-1">
                 {iconMap[organ.icon]}
              </div>
              <span className="text-[10px] text-gray-500">{organ.name}</span>
           </div>
         ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] text-gray-400 bg-gray-50 px-4 py-2 rounded-full max-w-full">
         <div className="flex items-center"><div className="w-3 h-1 bg-[#4ade80] rounded-full mr-1"></div>健康</div>
         <div className="flex items-center"><div className="w-3 h-1 bg-orange-400 rounded-full mr-1"></div>亚健康</div>
         <div className="flex items-center"><div className="w-3 h-1 bg-red-500 rounded-full mr-1"></div>疾病</div>
         <div className="flex items-center"><div className="w-3 h-1 bg-gray-300 rounded-full mr-1"></div>未知</div>
      </div>

    </div>
  );
};