import React from 'react';
import { mockData } from '../../data/mockData';

const ClassRankChart = () => {
  const { classRanking } = mockData;

  console.log('ClassRankChart component rendering');
  console.log('ClassRankChart 优化版本 - 适配左侧栏垂直布局');

  return (
    <div className="class-rank-chart">
      {/* 圆形排名图表容器 */}
      <div className="rank-chart-container">
        <div className="rank-title">班级排名</div>
        
        {/* 奖牌圆圈 */}
        <div className="rank-circles">
          <div className="rank-circle gold">🥇</div>
          <div className="rank-circle silver">🥈</div>
          <div className="rank-circle bronze">🥉</div>
        </div>
      </div>

      {/* 排名列表 */}
      <div className="rank-list">
        {classRanking.slice(0, 3).map(student => (
          <div key={student.id} className="rank-item">
            <div className={`rank-number ${
              student.rank === 1 ? 'gold' : 
              student.rank === 2 ? 'silver' : 
              student.rank === 3 ? 'bronze' : ''
            }`}>
              {student.rank}
            </div>
            <div className="rank-info">
              <div className="rank-name">{student.name}</div>
              <div className="rank-score">{student.score} 分</div>
            </div>
          </div>
        ))}
        
        {/* 更多指示 */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '12px',
          fontSize: '12px',
          color: 'var(--text-muted)'
        }}>
          ...
        </div>
      </div>
    </div>
  );
};

export default ClassRankChart; 