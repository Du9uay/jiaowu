import React from 'react';
import { mockData } from '../../data/mockData';

const ProgressPie = () => {
  const { studyStats } = mockData;
  const percentage = studyStats.completionRate;

  console.log('ProgressPie component rendering with percentage:', percentage);
  console.log('ProgressPie 优化版本 - 适配中央区域布局');

  // 计算SVG饼图参数
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-pie">
      <h3 className="chart-title">课程完成情况</h3>
      
      <div className="pie-chart">
        <svg width="120" height="120">
          {/* 背景圆环 */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="8"
          />
          {/* 进度圆环 */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="var(--primary-color)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 0.5s ease'
            }}
          />
        </svg>
        <div className="pie-percentage">{percentage}%</div>
      </div>
    </div>
  );
};

export default ProgressPie; 