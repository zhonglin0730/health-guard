import React, { useState, useEffect, useRef } from 'react';
import { Clock, ThumbsUp, AlertCircle, Info, Sparkles, Moon, Sun, ChevronRight, X, Music, Coffee, Moon as MoonIcon, MapPin } from 'lucide-react';
import { OrganMap } from './OrganMap';

// 12 Shichen (Two-hour period) Data Mapping
const SHICHEN_MAP = [
  { id: 'zi', name: '子时', time: '23:00-01:00', organ: '胆', icon: Moon, label: '少阳' },
  { id: 'chou', name: '丑时', time: '01:00-03:00', organ: '肝', icon: Moon, label: '厥阴' },
  { id: 'yin', name: '寅时', time: '03:00-05:00', organ: '肺', icon: Moon, label: '太阴' },
  { id: 'mao', name: '卯时', time: '05:00-07:00', organ: '大肠', icon: Sun, label: '阳明' },
  { id: 'chen', name: '辰时', time: '07:00-09:00', organ: '胃', icon: Sun, label: '阳明' },
  { id: 'si', name: '巳时', time: '09:00-11:00', organ: '脾', icon: Sun, label: '太阴' },
  { id: 'wu', name: '午时', time: '11:00-13:00', organ: '心', icon: Sun, label: '少阴' },
  { id: 'wei', name: '未时', time: '13:00-15:00', organ: '小肠', icon: Sun, label: '太阳' },
  { id: 'shen', name: '申时', time: '15:00-17:00', organ: '膀胱', icon: Sun, label: '太阳' },
  { id: 'you', name: '酉时', time: '17:00-19:00', organ: '肾', icon: Sun, label: '少阴' },
  { id: 'xu', name: '戌时', time: '19:00-21:00', organ: '心包', icon: Moon, label: '厥阴' },
  { id: 'hai', name: '亥时', time: '21:00-23:00', organ: '淋巴', icon: Moon, label: '少阳' }, // Mapped San Jiao to Lymph
];

// Detailed data mock
const organDetails: Record<string, { status: string; advice: string; type: 'risk' | 'healthy' | 'sub-health' }> = {
  '胆': { status: '胆气虚弱', advice: '子时胆经当令，建议23点前入睡，利于胆汁代谢与骨髓造血。', type: 'sub-health' },
  '肝': { status: '肝火旺盛', advice: '检测到夜间深度睡眠不足，易导致急躁易怒。建议饮用菊花茶，按揉太冲穴。', type: 'risk' },
  '肺': { status: '肺气宣发', advice: '寅时肺经当令，深度睡眠有助于气血分配。建议晨起开窗通风，做深呼吸。', type: 'healthy' },
  '大肠': { status: '传导正常', advice: '卯时大肠蠕动增强，建议晨起喝一杯温水，养成排便习惯。', type: 'healthy' },
  '胃': { status: '受纳良好', advice: '辰时胃经活跃，消化能力最强。建议吃营养丰富的早餐。', type: 'healthy' },
  '脾': { status: '运化正常', advice: '巳时脾经当令，精力充沛，适合脑力工作和思考。', type: 'healthy' },
  '心': { status: '心气充足', advice: '午时心经当令，建议午饭后小憩15-30分钟，养护心神。', type: 'healthy' },
  '小肠': { status: '泌别清浊', advice: '未时小肠吸收营养，建议午餐后适当休息，避免剧烈运动。', type: 'healthy' },
  '膀胱': { status: '气化正常', advice: '申时膀胱经活跃，多喝水利于排毒，适合运动学习。', type: 'healthy' },
  '肾': { status: '肾气充沛', advice: '酉时肾经当令，适合整理工作，存储能量，不宜过劳。', type: 'healthy' },
  '心包': { status: '护卫心主', advice: '戌时心包经当令，保持心情愉悦，适合散步放松。', type: 'healthy' },
  '淋巴': { status: '水道通调', advice: '亥时三焦经（淋巴系统）修整，建议停止进食，准备入睡。', type: 'sub-health' },
  'default': { status: '监测中', advice: '请保持良好的生活作息习惯。', type: 'healthy' }
};

// TCM Detail Overlay Component
const TCMDetailOverlay: React.FC<{ organ: string; onClose: () => void }> = ({ organ, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl h-[85vh] sm:h-[800px] flex flex-col relative animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl z-10">
           <div>
              <h2 className="text-xl font-bold text-slate-800">{organ}经 · 深度调理方案</h2>
              <p className="text-xs text-gray-400 mt-1">AI根据您的体征生成的个性化建议</p>
           </div>
           <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
             <X size={20} className="text-gray-600" />
           </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6">
           {/* Section 1: Diet */}
           <div>
              <div className="flex items-center space-x-2 mb-3">
                 <div className="p-1.5 bg-green-100 text-green-600 rounded-lg"><Coffee size={18} /></div>
                 <h3 className="font-bold text-slate-700">食疗方</h3>
              </div>
              <div className="bg-green-50/50 rounded-xl p-4 border border-green-100">
                 <h4 className="font-bold text-green-800 text-sm mb-2">推荐：杞菊决明子茶</h4>
                 <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    适用于{organ}火旺盛者。枸杞子10克，菊花5克，决明子15克。开水冲泡代茶饮。
                 </p>
                 <div className="flex gap-2">
                   <span className="text-[10px] bg-white px-2 py-1 rounded border border-green-100 text-green-600">清肝明目</span>
                   <span className="text-[10px] bg-white px-2 py-1 rounded border border-green-100 text-green-600">润肠通便</span>
                 </div>
              </div>
           </div>

           {/* Section 2: Acupoints */}
           <div>
              <div className="flex items-center space-x-2 mb-3">
                 <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg"><MapPin size={18} /></div>
                 <h3 className="font-bold text-slate-700">经络穴位</h3>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="h-32 bg-gray-100 relative flex items-center justify-center">
                    {/* Placeholder for acupoint image */}
                    <div className="text-gray-400 text-xs flex flex-col items-center">
                       <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 mb-2"></div>
                       {organ === '肝' ? '太冲穴示意图' : '相关穴位示意图'}
                    </div>
                 </div>
                 <div className="p-4">
                    <h4 className="font-bold text-slate-700 text-sm mb-1">{organ === '肝' ? '太冲穴' : '关键穴位'}</h4>
                    <p className="text-xs text-gray-500">
                       位于足背侧，第一、二跖骨结合部之前凹陷处。建议每晚睡前按揉3-5分钟，至有酸胀感为宜。
                    </p>
                 </div>
              </div>
           </div>

           {/* Section 3: Music */}
           <div>
              <div className="flex items-center space-x-2 mb-3">
                 <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg"><Music size={18} /></div>
                 <h3 className="font-bold text-slate-700">五音疗愈</h3>
              </div>
              <div className="flex items-center p-3 bg-purple-50 rounded-xl border border-purple-100">
                 <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Music size={20} className="text-purple-600" />
                 </div>
                 <div className="flex-1">
                    <div className="font-bold text-sm text-slate-700">角调式乐曲 (木音)</div>
                    <div className="text-xs text-gray-500">疏肝理气，条达情志</div>
                 </div>
                 <button className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-full font-bold">播放</button>
              </div>
           </div>

           {/* Section 4: Lifestyle */}
           <div>
              <div className="flex items-center space-x-2 mb-3">
                 <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg"><MoonIcon size={18} /></div>
                 <h3 className="font-bold text-slate-700">起居建议</h3>
              </div>
              <ul className="space-y-2 text-xs text-gray-600">
                 <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 mr-2 flex-shrink-0"></div>
                    建议每晚23:00前入睡，保证肝胆经修复时间。
                 </li>
                 <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 mr-2 flex-shrink-0"></div>
                    保持心情舒畅，避免大怒大悲，以防伤肝。
                 </li>
                 <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 mr-2 flex-shrink-0"></div>
                    适度进行拉伸运动，如瑜伽或八段锦，疏通经络。
                 </li>
              </ul>
           </div>
        </div>

        {/* Footer Button */}
        <div className="p-4 border-t border-gray-100 bg-white pb-8 sm:pb-4 rounded-b-3xl">
           <button 
             onClick={onClose}
             className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-transform"
           >
             已了解，添加至日程
           </button>
        </div>
      </div>
    </div>
  );
};

export const TCMView: React.FC = () => {
  const [selectedOrgan, setSelectedOrgan] = useState<string>('肝'); 
  const [showDetail, setShowDetail] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentDetail = organDetails[selectedOrgan] || organDetails['default'];
  const currentShichen = SHICHEN_MAP.find(s => s.organ === selectedOrgan);

  // Auto-scroll to selected time
  useEffect(() => {
    if (scrollRef.current && currentShichen) {
      const index = SHICHEN_MAP.findIndex(s => s.id === currentShichen.id);
      if (index !== -1) {
        const itemWidth = 80; // approximate width of item + margin
        scrollRef.current.scrollTo({
          left: index * itemWidth - scrollRef.current.clientWidth / 2 + itemWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedOrgan]);

  return (
    // Changed h-full to min-h-full to prevent layout compression on small screens
    <div className="pb-24 font-sans min-h-full w-full flex flex-col relative">
      {/* Detail Overlay */}
      {showDetail && (
        <TCMDetailOverlay organ={selectedOrgan} onClose={() => setShowDetail(false)} />
      )}

      {/* Sticky Header Section to prevent overlap */}
      <div className="sticky top-0 z-20 bg-gray-50 pt-4 pb-2 shadow-sm border-b border-gray-100/50 backdrop-blur-sm bg-gray-50/95 flex-shrink-0">
        <div className="flex items-end justify-between mb-4 px-4">
          <div>
             <h2 className="text-xl font-bold text-slate-800">中医子午流注</h2>
             <p className="text-xs text-gray-500">十二时辰脏腑经络运行图</p>
          </div>
          <div className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full flex items-center">
             <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span>
             实时对应
          </div>
        </div>

        {/* Horizontal Time Scroll (Zi Wu Liu Zhu) */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar px-4 space-x-3 pb-2 snap-x"
        >
          {SHICHEN_MAP.map((item) => {
            const isActive = selectedOrgan === item.organ;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedOrgan(item.organ)}
                className={`
                  flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl border transition-all duration-300 snap-center
                  ${isActive 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' 
                    : 'bg-white text-gray-400 border-gray-100 hover:border-blue-200'}
                `}
              >
                <span className="text-xs font-medium mb-1">{item.name}</span>
                <div className={`text-[10px] mb-1 ${isActive ? 'text-blue-200' : 'text-gray-300'}`}>
                  {isActive ? <item.icon size={12} className="animate-spin-slow" /> : <item.icon size={12} />}
                </div>
                <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-600'}`}>
                  {item.organ}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area - Added flex-shrink-0 */}
      <div className="px-4 mt-4 flex-shrink-0">
        {/* Main Visual Map */}
        <div className="bg-white rounded-3xl py-6 px-2 shadow-sm border border-slate-100 flex flex-col items-center relative overflow-hidden min-h-[340px]">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <Clock size={120} />
          </div>
          
          <h3 className="font-semibold text-sm text-slate-700 w-full px-4 flex items-center justify-between z-10">
             <div className="flex items-center">
               <span className="bg-blue-100 p-1 rounded-md mr-2 text-blue-600"><Sparkles size={14} /></span>
               <span>经络可视化</span>
             </div>
             <div className="flex items-center text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
               {currentShichen?.time}
             </div>
          </h3>
          
          <OrganMap selectedOrgan={selectedOrgan} onSelect={setSelectedOrgan} />
          
          <div className="absolute bottom-3 text-[10px] text-gray-300">
            点击器官或上方时辰进行切换
          </div>
        </div>
      </div>

      {/* Dynamic Detail Card - Added flex-shrink-0 and margin bottom */}
      <div className="px-4 mt-4 mb-4 animate-in slide-in-from-bottom-4 duration-500 flex-shrink-0">
        <div className={`
          p-5 rounded-2xl shadow-sm border-l-4 transition-all duration-300 relative overflow-hidden
          ${currentDetail.type === 'risk' ? 'bg-red-50 border-red-400' : 
            currentDetail.type === 'sub-health' ? 'bg-orange-50 border-orange-400' : 
            'bg-white border-green-400'}
        `}>
           {/* Decorative Background Icon */}
           <div className={`absolute -right-4 -bottom-4 opacity-10 transform -rotate-12 ${
              currentDetail.type === 'risk' ? 'text-red-500' : 'text-green-500'
           }`}>
             <ThumbsUp size={100} />
           </div>

           <div className="flex items-start relative z-10">
             <div className={`p-2 rounded-full mr-4 flex-shrink-0 shadow-sm ${
                currentDetail.type === 'risk' ? 'bg-red-100 text-red-500' : 
                currentDetail.type === 'sub-health' ? 'bg-orange-100 text-orange-500' :
                'bg-green-100 text-green-500'
             }`}>
                {currentDetail.type === 'risk' ? <AlertCircle size={20} /> : 
                 currentDetail.type === 'sub-health' ? <Info size={20} /> :
                 <ThumbsUp size={20} />}
             </div>
             
             <div className="flex-1">
               <div className="flex items-center justify-between mb-2">
                 <h4 className={`font-bold text-base ${currentDetail.type === 'risk' ? 'text-red-700' : 'text-slate-700'}`}>
                   {selectedOrgan}经 · {currentDetail.status}
                 </h4>
                 {currentDetail.type === 'risk' && (
                   <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold animate-pulse">需关注</span>
                 )}
               </div>
               <p className="text-sm text-gray-600 leading-relaxed text-justify">
                 {currentDetail.advice}
               </p>
               
               {/* Action Button */}
               <div className="mt-3 flex justify-end">
                 <button 
                   onClick={() => setShowDetail(true)}
                   className="flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 active:opacity-70 transition-colors"
                 >
                   查看详细调理方案 <ChevronRight size={12} className="ml-1" />
                 </button>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};