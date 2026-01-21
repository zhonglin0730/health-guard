import React, { useEffect, useState } from 'react';

interface RiskGaugeProps {
  percentage: number;
  label: string;
  color: string;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ percentage, label, color }) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  
  // Animate the percentage on mount
  useEffect(() => {
    // Small timeout to ensure DOM is ready for transition
    const timer = setTimeout(() => {
      setDisplayPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const strokeDashoffset = circumference - (displayPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300 h-full w-full">
      <div className="relative w-full max-w-[8rem] aspect-square flex items-center justify-center">
        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 128 128">
          {/* Background Track */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="#f1f5f9"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress Arc */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-[1500ms] ease-out"
          />
        </svg>
        
        {/* Centered Text Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-slate-800 leading-none">
            {displayPercentage}%
          </span>
          <span className="text-[10px] text-gray-400 font-medium mt-0.5">风险值</span>
        </div>
      </div>
      
      {/* Label outside the circle */}
      <h3 className="mt-2 font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors text-center">
        {label}
      </h3>
    </div>
  );
};