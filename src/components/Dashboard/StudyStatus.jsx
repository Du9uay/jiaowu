import React from 'react';
import { mockData } from '../../data/mockData';

const StudyStatus = () => {
  const { studyStats } = mockData;

  console.log('StudyStatus组件渲染完成 - 同心环学习时长对比');

  // 计算最大值用于比例缩放
  const maxHours = Math.max(studyStats.myHours, studyStats.classAverage) * 1.2; // 增加20%缓冲

  // 外环参数 - 我的学习时长
  const outerRadius = 35;
  const outerCircumference = 2 * Math.PI * outerRadius;
  const myHoursRatio = studyStats.myHours / maxHours;
  const outerStrokeDashoffset = outerCircumference - (myHoursRatio * outerCircumference);

  // 内环参数 - 班级平均学习时长
  const innerRadius = 25;
  const innerCircumference = 2 * Math.PI * innerRadius;
  const classAverageRatio = studyStats.classAverage / maxHours;
  const innerStrokeDashoffset = innerCircumference - (classAverageRatio * innerCircumference);

  return (
    <div className="dashboard-module module-study-status">
      <div className="module-header">
        <h3 className="module-title">学习情况</h3>
      </div>

      <div className="module-content">
        <div className="concentric-progress-circle">
          <svg width="90" height="90" style={{ position: 'absolute' }}>
            {/* 外环背景 */}
            <circle
              cx="45"
              cy="45"
              r={outerRadius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="5"
            />
            {/* 内环背景 */}
            <circle
              cx="45"
              cy="45"
              r={innerRadius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="4"
            />
            
            {/* 外环进度 - 我的学习时长 */}
            <circle
              cx="45"
              cy="45"
              r={outerRadius}
              fill="none"
              stroke="#10b981"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={outerCircumference}
              strokeDashoffset={outerStrokeDashoffset}
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '45px 45px',
                transition: 'stroke-dashoffset 0.8s ease'
              }}
            />
            
            {/* 内环进度 - 班级平均学习时长 */}
            <circle
              cx="45"
              cy="45"
              r={innerRadius}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={innerCircumference}
              strokeDashoffset={innerStrokeDashoffset}
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '45px 45px',
                transition: 'stroke-dashoffset 0.8s ease 0.2s'
              }}
            />
          </svg>
          
          {/* 中心文字显示 */}
          <div className="concentric-progress-text">
            <div className="my-hours">{studyStats.myHours}h</div>
            <div className="vs-text">VS</div>
            <div className="class-avg">{studyStats.classAverage}h</div>
          </div>
        </div>

        {/* 图例说明 */}
        <div className="study-legend">
          <div className="legend-item">
            <div className="legend-color my-color"></div>
            <span className="legend-text">我的学习时长</span>
          </div>
          <div className="legend-item">
            <div className="legend-color class-color"></div>
            <span className="legend-text">班级平均时长</span>
          </div>
        </div>
        
        {/* 对比分析 */}
        <div className="study-analysis">
          {studyStats.myHours > studyStats.classAverage ? (
            <p className="analysis-text positive">
              💪 超出班级平均 {studyStats.myHours - studyStats.classAverage} 小时
            </p>
          ) : studyStats.myHours < studyStats.classAverage ? (
            <p className="analysis-text negative">
              📈 落后班级平均 {studyStats.classAverage - studyStats.myHours} 小时
            </p>
          ) : (
            <p className="analysis-text neutral">
              ⚖️ 与班级平均持平
            </p>
          )}
        </div>
        
        {console.log('StudyStatus同心环数据:', { myHours: studyStats.myHours, classAverage: studyStats.classAverage })}
      </div>
    </div>
  );
};

export default StudyStatus; 