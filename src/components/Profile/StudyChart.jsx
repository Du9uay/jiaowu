import React from 'react';
import { mockData } from '../../data/mockData';

const StudyChart = () => {
  const { studyStats } = mockData;

  console.log('StudyChart 组件渲染，学习时长数据:', studyStats);
  console.log('StudyChart 优化版本 - 适配统一布局栅格系统');

  // 计算柱状图高度（基于最大值的比例）
  const maxValue = Math.max(studyStats.myHours, studyStats.classAverage);
  const myHeight = (studyStats.myHours / maxValue) * 80; // 最大高度80px
  const averageHeight = (studyStats.classAverage / maxValue) * 80;

  return (
    <div className="study-chart">
      <h3 className="chart-title">学习时长统计</h3>
      
      <div className="chart-container">
        {/* 我的学习时长 */}
        <div className="chart-bar">
          <div 
            className="bar bar-my"
            style={{ height: `${myHeight}px` }}
          >
            <div className="bar-value">{studyStats.myHours}h</div>
          </div>
          <div className="bar-label">我的学习时长</div>
        </div>

        {/* 班级平均学习时长 */}
        <div className="chart-bar">
          <div 
            className="bar bar-average"
            style={{ height: `${averageHeight}px` }}
          >
            <div className="bar-value">{studyStats.classAverage}h</div>
          </div>
          <div className="bar-label">班级平均学习时长</div>
        </div>
      </div>
    </div>
  );
};

export default StudyChart; 