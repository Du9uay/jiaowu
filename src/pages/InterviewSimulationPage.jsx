import React, { useState, useEffect } from 'react';
import { mockData } from '../data/mockData';

const InterviewSimulationPage = () => {
  const { interviewSimulation } = mockData;
  
  // 状态管理
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [currentView, setCurrentView] = useState('video'); // 'video' | 'evaluation'
  const [isTransitioning, setIsTransitioning] = useState(false);

  console.log('线上面试模拟页面初始化', {
    interviewCount: interviewSimulation.interviewList.length,
    selectedId: selectedInterview?.id,
    currentView
  });

  // 初始化选择第一个面试记录
  useEffect(() => {
    if (interviewSimulation.interviewList.length > 0 && !selectedInterview) {
      const firstInterview = interviewSimulation.interviewList[0];
      setSelectedInterview(firstInterview);
      console.log('自动选择第一个面试记录', firstInterview);
    }
  }, [interviewSimulation.interviewList, selectedInterview]);

  // 处理面试记录选择
  const handleInterviewSelect = (interview) => {
    console.log('选择面试记录', {
      company: interview.company,
      position: interview.position,
      interviewId: interview.id
    });
    
    setSelectedInterview(interview);
    // 选择新面试时重置为视频视图
    if (currentView !== 'video') {
      setCurrentView('video');
    }
  };

  // 处理视图切换
  const handleViewSwitch = () => {
    if (isTransitioning) return;
    
    console.log('视图切换', {
      from: currentView,
      to: currentView === 'video' ? 'evaluation' : 'video'
    });
    
    setIsTransitioning(true);
    setCurrentView(prev => prev === 'video' ? 'evaluation' : 'video');
    
    // 过渡动画完成后重置状态
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  // 获取面试状态显示样式
  const getStatusClass = (status) => {
    switch (status) {
      case 'evaluated': return 'interview-evaluated';
      case 'completed': return 'interview-completed';
      default: return 'interview-pending';
    }
  };

  // 获取面试状态显示文本
  const getStatusText = (status) => {
    switch (status) {
      case 'evaluated': return '已评分';
      case 'completed': return '已完成';
      default: return '待处理';
    }
  };

  // 格式化日期显示
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  };

  console.log('页面渲染状态', {
    selectedInterview: selectedInterview?.company,
    currentView,
    isTransitioning
  });

  return (
    <div className="interview-simulation-page">
      {/* 左侧面试列表 */}
      <div className="interview-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">{interviewSimulation.title}</h2>
          <div className="interview-count">
            {interviewSimulation.interviewList.length} 场面试
          </div>
        </div>
        
        <div className="interview-list">
          {interviewSimulation.interviewList.map((interview) => (
            <div
              key={interview.id}
              className={`interview-item ${getStatusClass(interview.status)} ${
                selectedInterview?.id === interview.id ? 'active' : ''
              }`}
              onClick={() => handleInterviewSelect(interview)}
            >
              <div className="interview-content">
                <div className="interview-header">
                  <div className="company-name">{interview.company}</div>
                  <div className={`interview-status ${getStatusClass(interview.status)}`}>
                    {getStatusText(interview.status)}
                  </div>
                </div>
                <div className="interview-position">{interview.position}</div>
                <div className="interview-meta">
                  <span className="interview-date">
                    {formatDate(interview.date)} {interview.time}
                  </span>
                  <span className="interview-duration">{interview.duration}</span>
                </div>
                <div className="interview-interviewer">
                  面试官：{interview.interviewer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="content-area">
        <div 
          className={`content-slider ${currentView === 'evaluation' ? 'show-evaluation' : 'show-video'}`}
        >
          {/* 视频播放区域 */}
          <div className="video-section">
            {selectedInterview && (
              <>
                <div className="video-header">
                  <h1 className="video-title">
                    {selectedInterview.company} - {selectedInterview.position}
                  </h1>
                  <div className="video-meta">
                    面试时间：{selectedInterview.date} {selectedInterview.time} | 
                    时长：{selectedInterview.duration} | 
                    面试官：{selectedInterview.interviewer}
                  </div>
                </div>
                
                <div className="video-player-container">
                  <video
                    className="video-player"
                    src={selectedInterview.videoUrl}
                    controls
                    poster="/api/placeholder/800/450"
                  >
                    您的浏览器不支持视频播放
                  </video>
                </div>
                
                <div className="video-actions">
                  <button 
                    className="switch-button"
                    onClick={handleViewSwitch}
                    disabled={isTransitioning}
                  >
                    查看面试评分 ↑
                  </button>
                </div>
              </>
            )}
          </div>

          {/* 评分展示区域 */}
          <div className="evaluation-section">
            {selectedInterview && (
              <>
                <div className="evaluation-header">
                  <div className="evaluation-actions">
                    <button 
                      className="switch-button back"
                      onClick={handleViewSwitch}
                      disabled={isTransitioning}
                    >
                      ↓ 返回视频
                    </button>
                  </div>
                  <h2 className="evaluation-title">面试评分与反馈</h2>
                  <div className="evaluation-meta">
                    {selectedInterview.company} - {selectedInterview.position}
                  </div>
                </div>

                <div className="evaluation-content">
                  {/* 评分表格 */}
                  <div className="score-section">
                    <h3 className="section-title">评分详情</h3>
                    <div className="score-table">
                      <table>
                        <tbody>
                          {interviewSimulation.evaluationData.scores.map((score, index) => (
                            <tr key={index}>
                              <td className="category-name">{score.category}</td>
                              <td className="category-score">
                                {score.score}/{score.total}
                              </td>
                              <td className="category-description">
                                {score.description}
                              </td>
                            </tr>
                          ))}
                          <tr className="total-row">
                            <td className="category-name">总分</td>
                            <td className="category-score">
                              {interviewSimulation.evaluationData.totalScore}/
                              {interviewSimulation.evaluationData.totalPossible}
                            </td>
                            <td className="category-description">
                              <span className="recommendation">
                                建议：{interviewSimulation.evaluationData.recommendation === 'pass' ? '通过' : '待定'}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* HR评语 */}
                  <div className="comments-section">
                    <h3 className="section-title">HR评语</h3>
                    <div className="comments-list">
                      {interviewSimulation.evaluationData.hrComments.map((comment, index) => (
                        <div key={index} className="comment-item">
                          <div className="comment-header">
                            <div className="comment-author">{comment.interviewer}</div>
                            <div className="comment-time">{comment.timestamp}</div>
                          </div>
                          <div className="comment-content">{comment.comment}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 下一步建议 */}
                  <div className="next-steps-section">
                    <h3 className="section-title">下一步建议</h3>
                    <div className="next-steps-content">
                      {interviewSimulation.evaluationData.nextSteps}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSimulationPage; 