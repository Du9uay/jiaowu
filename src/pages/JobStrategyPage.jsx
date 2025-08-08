import React, { useState, useEffect } from 'react';
import { mockData } from '../data/mockData';
import VideoPlayer from '../components/Live/VideoPlayer';
import JobStrategyNotes from '../components/JobStrategy/JobStrategyNotes';
import JobStrategyVideoInfo from '../components/JobStrategy/JobStrategyVideoInfo';
import JobStrategyCarousel from '../components/JobStrategy/JobStrategyCarousel';

const JobStrategyPage = () => {
  console.log('JobStrategyPage组件初始化 - 新直播间布局');
  
  // 从mockData获取数据
  const { jobStrategyLive, jobStrategyNotes, liveConfig } = mockData;
  
  // 状态管理
  const [currentLive, setCurrentLive] = useState(jobStrategyLive);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageMode, setPageMode] = useState('live'); // 'live' | 'strategy'

  console.log('JobStrategyPage初始化完成:', {
    title: currentLive?.title,
    teacher: currentLive?.teacher,
    status: currentLive?.status,
    notesTitle: jobStrategyNotes?.title
  });

  // 处理全屏状态变化
  const handleFullscreenChange = (fullscreen) => {
    console.log('JobStrategyPage全屏状态变化:', fullscreen);
    setIsFullscreen(fullscreen);
  };

  // 处理回放请求（虽然求职策略直播一般不需要回放，但保持接口一致性）
  const handleReplayRequest = () => {
    console.log('用户请求查看求职策略回放');
    if (currentLive) {
      const replayLiveInfo = {
        ...currentLive,
        status: 'replay'
      };
      setCurrentLive(replayLiveInfo);
      console.log('求职策略直播状态已切换为回放模式');
    }
  };

  // 处理查看求职策略
  const handleViewStrategy = () => {
    console.log('用户点击查看求职策略，切换到策略模式');
    setPageMode('strategy');
  };

  // 处理返回直播间
  const handleBackToLive = () => {
    console.log('用户返回直播间，切换到直播模式');
    setPageMode('live');
  };

  console.log('JobStrategyPage渲染参数:', {
    pageMode,
    isFullscreen,
    liveTitle: currentLive?.title,
    liveStatus: currentLive?.status,
    hasNotes: !!jobStrategyNotes
  });

  // 根据页面模式渲染不同内容
  if (pageMode === 'strategy') {
    return (
      <JobStrategyCarousel onBackToLive={handleBackToLive} />
    );
  }

  return (
    <div className={`job-strategy-page ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* 左侧区域：视频 + 专家信息 */}
      <div className="left-section">
        {/* 视频区域 */}
        <div className="video-area">
          {/* 视频标题栏 */}
          <div className="video-title-bar">
            <h1 className="course-title">{currentLive?.title || '1V1求职策略指导'}</h1>
            <div className="course-status-info">
              <div className={`status-indicator ${currentLive?.status || 'offline'}`}>
                <span className="status-dot"></span>
                {liveConfig?.statusTypes?.[currentLive?.status]?.name || '离线'}
              </div>
              {currentLive?.viewers > 0 && (
                <div className="viewer-count">
                  👥 {currentLive.viewers}人连线中
                </div>
              )}
            </div>
          </div>

          {/* 视频播放器容器 */}
          <div className="video-container">
            <VideoPlayer
              title={currentLive?.title}
              isLive={currentLive?.status === 'live'}
              courseStatus={currentLive?.status}
              startTime={currentLive?.startTime}
              endTime={currentLive?.endTime}
              onReplayRequest={handleReplayRequest}
              onFullscreenChange={handleFullscreenChange}
            />
          </div>
        </div>

        {/* 专家信息区域（仅非全屏时显示） */}
        {!isFullscreen && (
          <div className="expert-section">
            <JobStrategyVideoInfo 
              liveInfo={currentLive}
              statusConfig={liveConfig}
            />
          </div>
        )}
      </div>

      {/* 右侧区域：直播纪要（仅非全屏时显示） */}
      {!isFullscreen && (
        <div className="right-section">
          <JobStrategyNotes
            notesData={jobStrategyNotes}
            onViewStrategy={handleViewStrategy}
          />
        </div>
      )}
    </div>
  );
};

export default JobStrategyPage; 