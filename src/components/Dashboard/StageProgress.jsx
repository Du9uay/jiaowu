import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData, updateStageStatuses, getOverallProgress, checkMilestoneBlockage } from '../../data/mockData';

const StageProgress = () => {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());
  const [stageData, setStageData] = useState(null);
  const [milestoneBlockage, setMilestoneBlockage] = useState({ isBlocked: false });
  
  useEffect(() => {
    // 动态更新学习阶段状态
    const updatedStages = updateStageStatuses({
      learningStages: mockData.learningStages,
      milestones: mockData.milestones
    }, currentDate);
    
    // 检查里程碑阻塞情况
    const blockageInfo = checkMilestoneBlockage(
      updatedStages,
      mockData.milestones,
      currentDate
    );
    
    setStageData({
      stages: updatedStages,
      overallProgress: getOverallProgress(updatedStages)
    });
    
    setMilestoneBlockage(blockageInfo);
  }, [currentDate]);
  
  // 如果数据还在加载中
  if (!stageData) {
    return <div className="stage-progress-container">加载中...</div>;
  }
  
  const { stages } = stageData;
  const totalDuration = stages.reduce((sum, stage) => sum + stage.duration, 0);
  
  // 计算每个阶段的位置和状态
  let accumulatedDuration = 0;
  const stagePositions = stages.map(stage => {
    const startPosition = (accumulatedDuration / totalDuration) * 100;
    accumulatedDuration += stage.duration;
    const endPosition = (accumulatedDuration / totalDuration) * 100;
    return {
      ...stage,
      startPosition,
      endPosition,
      widthPercentage: ((stage.duration / totalDuration) * 100)
    };
  });
  
  // 获取当前活跃阶段
  const currentStage = stages.find(stage => stage.status === 'in_progress') || 
                      stages.find(stage => stage.status === 'stalled');

  // 处理里程碑点击事件
  const handleMilestoneClick = (milestone) => {
    if (!milestone.interaction.clickable) return;
    
    console.log(`点击里程碑: ${milestone.name}, 跳转到: ${milestone.interaction.targetRoute}`);
    
    // 使用React Router导航
    navigate(milestone.interaction.targetRoute);
    
    // 可选：显示用户提示
    if (milestone.status === 'pending') {
      // 这里可以添加toast提示："请完成垂直方向选择以解锁下一阶段"
      console.log(`提示：请在${milestone.interaction.targetModule}中完成${milestone.name}`);
    }
  };
  
  return (
    <div className="stage-progress-container">
      {/* 阶段名称显示 */}
      <div className="stage-labels">
        {stagePositions.map((stage, index) => (
          <div key={stage.id} className="stage-wrapper" style={{ width: `${stage.widthPercentage}%` }}>
            <div 
              className={`stage-label ${
                stage.status === 'in_progress' ? 'active' : ''
              } ${
                stage.status === 'stalled' ? 'stalled' : ''
              } ${
                stage.status === 'locked' ? 'locked' : ''
              }`}
            >
              <div className="stage-name">
                {stage.name}
                {stage.status === 'stalled' && (
                  <span className="waiting-indicator">等待选择</span>
                )}
                {stage.status === 'locked' && (
                  <span className="locked-indicator">🔒</span>
                )}
              </div>
              <div className="stage-duration">{stage.duration}个月</div>
              <div className="stage-progress-text">
                {stage.progressPercentage.toFixed(1)}%
              </div>
            </div>
            
            {/* 里程碑事件标记 */}
            {mockData.milestones.map(milestone => {
              if (milestone.position.afterStageId === stage.id) {
                return (
                  <div 
                    key={milestone.id}
                    className={`milestone-marker ${milestone.status} ${milestone.interaction.clickable ? 'clickable' : ''}`}
                    onClick={() => handleMilestoneClick(milestone)}
                    title={`${milestone.name}: ${milestone.description}${milestone.status === 'pending' ? ' (点击前往完成)' : ''}`}
                  >
                    <span className="milestone-icon">
                      {milestone.visual.icon}
                    </span>
                    <div className="milestone-label">{milestone.name}</div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
      
      {/* 统一进度条 */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${stageData.overallProgress}%` }}
        ></div>
      </div>
      
      {/* 当前状态描述 */}
      <div className="current-stage-description">
        {currentStage ? (
          <div>
            <span className="current-stage-name">当前阶段：{currentStage.name}</span>
            <span className="current-stage-desc">- {currentStage.description}</span>
            {currentStage.status === 'stalled' && (
              <div className="blockage-warning">
                ⚠️ {milestoneBlockage.message}
              </div>
            )}
          </div>
        ) : (
          <span>学习计划已完成</span>
        )}
      </div>
      
      {/* 停滞状态警示 */}
      {milestoneBlockage.isBlocked && (
        <div className="milestone-blockage-alert">
          <div className="alert-content">
            <span className="alert-icon">🚧</span>
            <div className="alert-text">
              <div className="alert-title">阶段进展受阻</div>
              <div className="alert-message">{milestoneBlockage.message}</div>
              <div className="alert-action">
                请前往
                <a href="/career-tree" className="alert-link">
                  {milestoneBlockage.blockingMilestone?.interaction.targetModule}
                </a>
                完成相关任务
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StageProgress;