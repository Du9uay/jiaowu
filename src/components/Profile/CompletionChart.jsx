import React from 'react';
import { mockData } from '../../data/mockData';

const CompletionChart = () => {
  const { studyStats } = mockData;
  
  console.log('CompletionChart 组件渲染，完成率数据:', {
    attendance: studyStats.attendanceStats,
    courseCompletion: studyStats.courseCompletionStats,
    homeworkCompletion: studyStats.homeworkCompletionStats
  });
  console.log('CompletionChart 优化版本 - 适配统一布局栅格系统');

  // 准备三组数据
  const completionData = [
    {
      label: '出勤率',
      myValue: studyStats.attendanceStats.myAttendance,
      averageValue: studyStats.attendanceStats.classAverageAttendance
    },
    {
      label: '课程完成率成绩',
      myValue: studyStats.courseCompletionStats.myCourseCompletion,
      averageValue: studyStats.courseCompletionStats.classAverageCourseCompletion
    },
    {
      label: '课后作业完成率',
      myValue: studyStats.homeworkCompletionStats.myHomeworkCompletion,
      averageValue: studyStats.homeworkCompletionStats.classAverageHomeworkCompletion
    }
  ];

  // 计算柱状图高度（基于100%为最大值）
  const maxValue = 100;

  return (
    <div className="completion-chart">
      <h3 className="chart-title">学习完成情况</h3>
      
      <div className="completion-chart-container">
        {completionData.map((item, index) => {
          const myHeight = (item.myValue / maxValue) * 80; // 最大高度80px
          const averageHeight = (item.averageValue / maxValue) * 80;
          
          console.log(`完成率数据 ${item.label}:`, {
            myValue: item.myValue,
            averageValue: item.averageValue,
            myHeight,
            averageHeight
          });

          return (
            <div key={index} className="completion-group">
              <div className="completion-bars">
                {/* 我的完成率 */}
                <div 
                  className="completion-bar completion-bar-my"
                  style={{ height: `${myHeight}px` }}
                >
                  <div className="completion-value">{item.myValue}%</div>
                </div>
                
                {/* 班级平均完成率 */}
                <div 
                  className="completion-bar completion-bar-average"
                  style={{ height: `${averageHeight}px` }}
                >
                  <div className="completion-value">{item.averageValue}%</div>
                </div>
              </div>
              <div className="completion-label">{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompletionChart; 