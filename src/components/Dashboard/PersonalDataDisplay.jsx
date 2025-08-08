import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../../data/mockData';

const PersonalDataDisplay = () => {
  const navigate = useNavigate();
  const { studyProgress, classRanking, studyStats } = mockData;

  // 点击跳转到个人档案，并传递上下文状态
  const handleNavigateToProfile = (sourceType) => {
    const contextState = {
      semester: '2024春季学期',
      subject: 'all',
      sourceModule: sourceType // 'learning' 或 'ranking'
    };
    
    navigate('/profile', { 
      state: contextState 
    });
  };

  // 计算环形进度条的参数
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (studyProgress.percentage / 100) * circumference;

  // 模拟多维度学习数据
  const learningMetrics = {
    gradesTrend: [
      { month: '9月', score: 78 },
      { month: '10月', score: 82 },
      { month: '11月', score: 85 },
      { month: '12月', score: 88 },
      { month: '1月', score: 92 }
    ],
    knowledgePoints: [
      { subject: '数据结构', mastery: 85 },
      { subject: '算法设计', mastery: 78 },
      { subject: '数据库', mastery: 92 },
      { subject: '网络编程', mastery: 76 }
    ],
    taskCompletion: 85.6
  };

  // 扩展班级排名数据
  const extendedRankingData = classRanking.map(student => ({
    ...student,
    subjects: {
      math: Math.floor(Math.random() * 20) + 80,
      programming: Math.floor(Math.random() * 20) + 80,
      database: Math.floor(Math.random() * 20) + 80
    },
    trend: Math.random() > 0.5 ? 'up' : 'down',
    trendValue: Math.floor(Math.random() * 5) + 1
  }));

  return (
    <div className="personal-data-display">
      <div className="module-header">
        <h3 className="module-title">个人数据展示区</h3>
        <div className="semester-indicator">2024春季学期</div>
      </div>

      <div className="data-display-layout">
        {/* 左侧面板：学习数据可视化 */}
        <div className="left-panel" onClick={() => handleNavigateToProfile('learning')}>
          <div className="panel-header">
            <h4>学习数据分析</h4>
            <span className="click-hint">点击查看详情</span>
          </div>
          
          <div className="visualization-container">
            {/* 圆环进度图 */}
            <div className="progress-section">
              <div className="progress-circle">
                <svg width="80" height="80">
                  <circle
                    cx="40" cy="40" r={radius}
                    fill="none" stroke="#f3f4f6" strokeWidth="6"
                  />
                  <circle
                    cx="40" cy="40" r={radius}
                    fill="none" stroke="var(--primary-color)" strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                      transform: 'rotate(-90deg)',
                      transformOrigin: '40px 40px',
                      transition: 'stroke-dashoffset 0.5s ease'
                    }}
                  />
                </svg>
                <div className="progress-text">{studyProgress.percentage}%</div>
              </div>
              <p className="progress-label">总体完成率</p>
            </div>

            {/* 成绩趋势折线图（简化版） */}
            <div className="trend-section">
              <h5>成绩趋势</h5>
              <div className="mini-chart">
                {learningMetrics.gradesTrend.map((item, index) => (
                  <div key={index} className="trend-point">
                    <div 
                      className="trend-bar"
                      style={{ height: `${(item.score - 70) * 2}px` }}
                    />
                    <span className="trend-label">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 知识点掌握度 */}
            <div className="knowledge-section">
              <h5>知识点掌握度</h5>
              <div className="knowledge-bars">
                {learningMetrics.knowledgePoints.slice(0, 3).map((point, index) => (
                  <div key={index} className="knowledge-item">
                    <span className="knowledge-name">{point.subject}</span>
                    <div className="knowledge-bar">
                      <div 
                        className="knowledge-fill"
                        style={{ width: `${point.mastery}%` }}
                      />
                    </div>
                    <span className="knowledge-value">{point.mastery}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧面板：班级排名数据表格 */}
        <div className="right-panel" onClick={() => handleNavigateToProfile('ranking')}>
          <div className="panel-header">
            <h4>班级排名</h4>
            <span className="click-hint">点击查看详情</span>
          </div>

          <div className="ranking-table-container">
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>排名</th>
                  <th>姓名</th>
                  <th>综合分</th>
                  <th>数学</th>
                  <th>编程</th>
                  <th>变化</th>
                </tr>
              </thead>
              <tbody>
                {extendedRankingData.slice(0, 5).map(student => (
                  <tr key={student.id}>
                    <td>
                      <div className={`rank-number ${
                        student.rank === 1 ? 'gold' : 
                        student.rank === 2 ? 'silver' : 
                        student.rank === 3 ? 'bronze' : ''
                      }`}>
                        {student.rank <= 3 ? 
                          (student.rank === 1 ? '🥇' : student.rank === 2 ? '🥈' : '🥉') : 
                          student.rank
                        }
                      </div>
                    </td>
                    <td className="student-name">{student.name}</td>
                    <td className="student-score">{student.score}</td>
                    <td className="subject-score">{student.subjects.math}</td>
                    <td className="subject-score">{student.subjects.programming}</td>
                    <td className="trend-cell">
                      <span className={`trend-indicator ${student.trend}`}>
                        {student.trend === 'up' ? '↗' : '↘'} {student.trendValue}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="more-indicator">
              查看完整排名 →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDataDisplay;