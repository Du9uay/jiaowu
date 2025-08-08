import React from 'react';
import { mockData } from '../../data/mockData';

const ClassRank = () => {
  const { classRanking } = mockData;

  console.log('ClassRank component rendering');

  const getRankClass = (rank) => {
    if (rank === 1) return 'gold';
    if (rank === 2) return 'silver';
    if (rank === 3) return 'bronze';
    return '';
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  return (
    <div className="dashboard-module module-class-rank">
      <div className="module-header">
        <h3 className="module-title">班级排名</h3>
      </div>

      <div className="module-content">
        <div className="rank-list">
          {classRanking.map(student => {
            console.log('ClassRank模块内容区域已应用固定高度和滚动条 - 渲染学生排名:', student.name, '排名:', student.rank);
            return (
              <div key={student.id} className="rank-item">
                <div className={`rank-number ${getRankClass(student.rank)}`}>
                  {student.rank <= 3 ? getRankIcon(student.rank) : student.rank}
                </div>
                <div className="rank-info">
                  <div className="rank-name">{student.name}</div>
                  <div className="rank-score">{student.score} 分</div>
                </div>
              </div>
            );
          })}
          
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
    </div>
  );
};

export default ClassRank; 