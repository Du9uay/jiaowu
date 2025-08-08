import React, { useState, useRef, useEffect } from 'react';
import CourseEvaluationModal from './CourseEvaluationModal';

const VideoPlayer = ({ title, isLive, courseStatus, startTime, endTime, onReplayRequest, onFullscreenChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [hasVideoEnded, setHasVideoEnded] = useState(false);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  console.log('VideoPlayer 初始化，课程状态:', courseStatus, '标题:', title);

  // 格式化课程时间显示
  const formatCourseTime = (timeString) => {
    try {
      const date = new Date(timeString);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const courseDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      
      const diffDays = Math.floor((courseDate - today) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        return `今天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
      } else if (diffDays === 1) {
        return `明天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
      } else if (diffDays === -1) {
        return `昨天 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
      } else {
        return date.toLocaleString('zh-CN', {
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    } catch (error) {
      console.error('时间格式化错误:', error);
      return timeString;
    }
  };

  // 处理回放请求
  const handleReplayRequest = () => {
    console.log('用户点击查看回放按钮，课程:', title);
    if (onReplayRequest) {
      onReplayRequest();
    }
  };

  // 处理播放/暂停
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  // 处理静音
  const handleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  // 处理音量调节
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  // 处理全屏
  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // 处理鼠标移动显示控制栏
  const handleMouseMove = () => {
    setShowControls(true);
    
    // 清除之前的定时器
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    // 3秒后隐藏控制栏（仅在播放时）
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // 处理课程评价弹窗关闭
  const handleEvaluationClose = () => {
    console.log('课程评价弹窗关闭');
    setShowEvaluationModal(false);
  };

  // 处理课程评价提交
  const handleEvaluationSubmit = (evaluationData) => {
    console.log('课程评价已提交:', evaluationData);
    setShowEvaluationModal(false);
    // 这里可以调用API提交评价数据
  };

  // 视频事件处理
  const handleVideoEvents = {
    onPlay: () => {
      console.log('视频开始播放');
      setIsPlaying(true);
      setIsLoading(false);
      setHasError(false);
      setHasVideoEnded(false);
    },
    onPause: () => {
      setIsPlaying(false);
    },
    onLoadStart: () => {
      setIsLoading(true);
      setHasError(false);
    },
    onCanPlay: () => {
      setIsLoading(false);
    },
    onError: (e) => {
      console.error('视频播放错误:', e);
      setIsLoading(false);
      setHasError(true);
    },
    onVolumeChange: () => {
      if (videoRef.current) {
        setVolume(videoRef.current.volume);
        setIsMuted(videoRef.current.muted);
      }
    },
    onEnded: () => {
      console.log('视频播放完成，显示课程评价弹窗');
      setIsPlaying(false);
      setHasVideoEnded(true);
      // 延迟一点显示弹窗，让用户看到视频结束
      setTimeout(() => {
        setShowEvaluationModal(true);
      }, 500);
    }
  };

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreen = !!document.fullscreenElement;
      setIsFullscreen(fullscreen);
      if (onFullscreenChange) {
        onFullscreenChange(fullscreen);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onFullscreenChange]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // 统一使用固定的视频源
  const videoSrc = '/live.mp4';

  // 根据课程状态决定是否显示视频播放器
  const shouldShowVideo = courseStatus === 'live' || courseStatus === 'replay';
  
  console.log('视频显示状态判断 - 固定尺寸版本:', { 
    courseStatus, 
    shouldShowVideo, 
    containerSize: containerRef.current?.getBoundingClientRect(),
    containerSizeFixed: '容器尺寸已固定为16:9比例'
  });

  // 添加容器尺寸监控日志
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      console.log('VideoPlayer容器尺寸监控 - 固定尺寸版本:', {
        width: rect.width,
        height: rect.height,
        aspectRatio: rect.width / rect.height,
        expectedHeight: rect.width / (16/9),
        courseStatus: courseStatus,
        containerFixed: '已修复为固定尺寸'
      });
    }
  }, [shouldShowVideo, courseStatus]);

  // 添加视频元素尺寸监控日志
  useEffect(() => {
    if (videoRef.current && shouldShowVideo) {
      const video = videoRef.current;
      const handleLoadedMetadata = () => {
        console.log('视频元数据加载完成，视频尺寸信息:', {
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight,
          videoAspectRatio: video.videoWidth / video.videoHeight,
          containerWidth: video.clientWidth,
          containerHeight: video.clientHeight
        });
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [shouldShowVideo]);

  return (
    <div 
      ref={containerRef}
      className="video-player-container unified-container"
      onMouseMove={shouldShowVideo ? handleMouseMove : undefined}
      onMouseLeave={() => shouldShowVideo && isPlaying && setShowControls(false)}
    >
      {/* 根据状态渲染不同内容 */}
      {shouldShowVideo ? (
        <>
          {/* 视频元素 */}
          <video
            ref={videoRef}
            className="video-player"
            src={videoSrc}
            poster="/api/placeholder/800/450"
            autoPlay={courseStatus === 'live'}
            muted={false}
            {...handleVideoEvents}
          />

          {/* 加载状态 */}
          {isLoading && (
            <div className="video-overlay loading-overlay">
              <div className="loading-spinner"></div>
              <div>加载中...</div>
            </div>
          )}

          {/* 错误状态 */}
          {hasError && (
            <div className="video-overlay error-overlay">
              <div className="error-icon">⚠️</div>
              <div>视频加载失败</div>
              <button 
                className="retry-button"
                onClick={() => {
                  console.log('用户点击重试按钮');
                  setHasError(false);
                  setIsLoading(true);
                  if (videoRef.current) {
                    videoRef.current.load();
                  }
                }}
              >
                重试
              </button>
            </div>
          )}

          {/* 播放按钮覆盖层 */}
          {!isPlaying && !isLoading && !hasError && (
            <div className="video-overlay play-overlay">
              <button 
                className="play-button-large"
                onClick={handlePlayPause}
              >
                ▶
              </button>
            </div>
          )}

          {/* 控制栏 */}
          <div className={`video-controls ${showControls ? 'visible' : ''}`}>
            {/* 播放/暂停按钮 */}
            <button 
              className="control-button"
              onClick={handlePlayPause}
              title={isPlaying ? '暂停' : '播放'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            {/* 音量控制 */}
            <div className="volume-control">
              <button 
                className="control-button"
                onClick={handleMute}
                title={isMuted ? '取消静音' : '静音'}
              >
                {isMuted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
                title="音量"
              />
            </div>

            {/* 直播状态指示器 */}
            {courseStatus === 'live' && (
              <div className="live-indicator">
                <span className="live-dot"></span>
                直播中
              </div>
            )}

            {/* 回放状态指示器 */}
            {courseStatus === 'replay' && (
              <div className="replay-indicator">
                <span className="replay-icon">📺</span>
                课程回放中
              </div>
            )}

            {/* 右侧控制 */}
            <div className="controls-right">
              {/* 测试评价弹窗按钮（仅开发测试用） */}
              <button 
                className="control-button test-evaluation-button"
                onClick={() => {
                  console.log('手动触发课程评价弹窗（测试功能）');
                  setShowEvaluationModal(true);
                }}
                title="测试课程评价（开发测试功能）"
                style={{ background: 'rgba(255, 193, 7, 0.8)', borderRadius: '4px' }}
              >
                📝
              </button>
              
              {/* 全屏按钮 */}
              <button 
                className="control-button"
                onClick={handleFullscreen}
                title={isFullscreen ? '退出全屏' : '全屏'}
              >
                {isFullscreen ? '⛶' : '⛶'}
              </button>
            </div>
          </div>
        </>
      ) : (
        /* 非播放状态的提示界面 */
        <div className="course-status-overlay">
          {courseStatus === 'upcoming' && (
            <div className="upcoming-content">
              <div className="status-icon">⏰</div>
              <h3 className="status-title">此课程即将开始</h3>
              <p className="status-message">
                开始时间：{startTime ? formatCourseTime(startTime) : '待定'}
              </p>
              <div className="status-description">
                请耐心等待课程开始，届时将自动开启直播
              </div>
            </div>
          )}
          
          {courseStatus === 'completed' && (
            <div className="completed-content">
              <div className="status-icon">✅</div>
              <h3 className="status-title">此课程已结束</h3>
              <p className="status-message">
                结束时间：{endTime ? formatCourseTime(endTime) : ''}
              </p>
              <button 
                className="replay-button"
                onClick={handleReplayRequest}
              >
                查看课程回放
              </button>
            </div>
          )}
        </div>
      )}

      {/* 课程评价弹窗 */}
      <CourseEvaluationModal
        isVisible={showEvaluationModal}
        onClose={handleEvaluationClose}
        onSubmit={handleEvaluationSubmit}
        courseInfo={{
          title: title,
          teacher: "顾华",
          course: "机械与智能制造班"
        }}
      />

      {/* 样式定义 */}
      <style>{`
        .video-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: white;
          font-size: 16px;
          z-index: 5;
        }

        .loading-overlay {
          background: rgba(0, 0, 0, 0.7);
          padding: 24px;
          border-radius: 8px;
        }

        .error-overlay {
          background: rgba(0, 0, 0, 0.8);
          padding: 24px;
          border-radius: 8px;
          text-align: center;
        }

        .error-icon {
          font-size: 48px;
          margin-bottom: 8px;
        }

        .retry-button {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 8px;
        }

        .play-overlay {
          background: rgba(0, 0, 0, 0.3);
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          transform: none;
          justify-content: center;
        }

        .play-button-large {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          font-size: 32px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .play-button-large:hover {
          background: white;
          transform: scale(1.1);
        }

        .video-controls {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: 20px 16px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 10;
        }

        .video-controls.visible {
          opacity: 1;
        }

        .control-button {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          transition: background-color 0.15s ease;
        }

        .control-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .volume-control {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .volume-slider {
          width: 80px;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }

        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
        }

        .live-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #ef4444;
          font-size: 14px;
          font-weight: 500;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          animation: pulse 2s infinite;
        }

        .replay-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
        }

        .replay-icon {
          font-size: 18px;
        }

        .controls-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .video-player-container {
          width: 100%;
          height: 100%;
        }

        .unified-container {
          aspect-ratio: 16/9;
          min-height: 400px;
          width: 100%;
          position: relative;
          background: #000;
        }

        .video-player {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        .course-status-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          z-index: 5;
        }

        .upcoming-content, .completed-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          text-align: center;
          padding: 40px 20px;
          max-width: 600px;
          margin: 0 auto;
        }

        .status-icon {
          font-size: 64px;
          margin-bottom: 8px;
          opacity: 0.9;
        }

        .status-title {
          font-size: 28px;
          font-weight: 600;
          color: white;
          margin: 0;
          line-height: 1.2;
        }

        .status-message {
          font-size: 18px;
          color: #e5e7eb;
          margin: 0;
          line-height: 1.4;
        }

        .status-description {
          font-size: 16px;
          color: #d1d5db;
          margin: 0;
          line-height: 1.4;
        }

        .replay-button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 12px 32px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 200ms ease;
          margin-top: 8px;
        }

        .replay-button:hover {
          background: #2563eb;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer; 