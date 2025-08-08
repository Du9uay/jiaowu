import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mockData } from '../data/mockData';
import VideoPlayer from '../components/Live/VideoPlayer';
import CourseList from '../components/Live/CourseList';
import LiveInfo from '../components/Live/LiveInfo';

const LivePage = () => {
  // 从mockData获取数据
  const { courseUnits, currentLive, liveConfig } = mockData;
  const location = useLocation();
  
  // 状态管理
  const [currentCourse, setCurrentCourse] = useState(currentLive);
  const [isFullscreen, setIsFullscreen] = useState(false);

  console.log('直播页面初始化完成');
  console.log('直播页面样式独立加载完成');
  console.log('不再依赖其他页面的CSS变量');
  console.log('直播间布局已优化为舒展占满模式');

  // 处理从Dashboard传递的课程参数
  useEffect(() => {
    if (location.state?.courseId) {
      console.log('从Dashboard接收到课程ID:', location.state.courseId);
      console.log('课程名称:', location.state.courseName);
      
      // 在courseUnits中查找对应的课程
      let targetCourse = null;
      for (const unit of courseUnits) {
        const foundCourse = unit.courses.find(course => course.id === location.state.courseId);
        if (foundCourse) {
          targetCourse = foundCourse;
          break;
        }
      }
      
      if (targetCourse) {
        console.log('找到目标课程:', targetCourse.title);
        // 创建新的直播信息对象
        const newLiveInfo = {
          courseId: targetCourse.id,
          title: targetCourse.title,
          teacher: targetCourse.teacher,
          startTime: targetCourse.startTime,
          endTime: targetCourse.endTime,
          viewers: targetCourse.viewCount,
          description: targetCourse.description,
          status: targetCourse.status,
          duration: '1小时30分钟'
        };
        setCurrentCourse(newLiveInfo);
        console.log('课程信息已更新为:', newLiveInfo);
      } else {
        console.log('未找到对应的课程，使用默认课程');
      }
    }
  }, [location.state, courseUnits]);

  // 处理课程选择
  const handleCourseSelect = (course) => {
    console.log('用户选择课程:', course.title);
    
    // 创建新的直播信息对象，包含完整的课程信息
    const newLiveInfo = {
      courseId: course.id,
      title: course.title,
      teacher: course.teacher,
      startTime: course.startTime || `${course.date.replace(/\./g, '-')} ${course.time.split('-')[0]}`,
      endTime: course.endTime,
      viewers: course.viewCount,
      description: course.description,
      status: course.status,
      duration: '1小时30分钟'
    };
    
    setCurrentCourse(newLiveInfo);
    console.log('课程信息已更新:', newLiveInfo);
  };

  // 处理全屏状态变化
  const handleFullscreenChange = (fullscreen) => {
    setIsFullscreen(fullscreen);
  };

  // 处理回放请求
  const handleReplayRequest = () => {
    console.log('用户请求观看回放，课程:', currentCourse?.title);
    if (currentCourse) {
      // 创建回放状态的课程信息
      const replayLiveInfo = {
        ...currentCourse,
        status: 'replay'
      };
      setCurrentCourse(replayLiveInfo);
      console.log('课程状态已切换为回放模式');
    }
  };

  return (
    <div className={`live-page ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* 左侧区域：视频 + 老师信息 */}
      <div className="left-section">
        {/* 视频区域 */}
        <div className="video-area">
          {/* 视频标题栏 */}
          <div className="video-title-bar">
            <h1 className="course-title">{currentCourse?.title || '课程直播间'}</h1>
            <div className="course-status-info">
              <div className={`status-indicator ${currentCourse?.status || 'offline'}`}>
                <span className="status-dot"></span>
                {liveConfig?.statusTypes?.[currentCourse?.status]?.name || '离线'}
              </div>
              {currentCourse?.viewers > 0 && (
                <div className="viewer-count">
                  👁 {currentCourse.viewers}人观看
                </div>
              )}
            </div>
          </div>

          {/* 视频播放器容器 */}
          <div className="video-container">
            <VideoPlayer
              title={currentCourse?.title}
              isLive={currentCourse?.status === 'live'}
              courseStatus={currentCourse?.status}
              startTime={currentCourse?.startTime}
              endTime={currentCourse?.endTime}
              onReplayRequest={handleReplayRequest}
              onFullscreenChange={handleFullscreenChange}
            />
          </div>
        </div>

        {/* 老师信息区域（仅非全屏时显示） */}
        {!isFullscreen && (
          <div className="teacher-section">
            <LiveInfo 
              liveInfo={currentCourse}
              statusConfig={liveConfig}
            />
          </div>
        )}
      </div>

      {/* 右侧区域：课程列表（仅非全屏时显示） */}
      {!isFullscreen && (
        <div className="right-section">
          <CourseList
            courseUnits={courseUnits}
            currentCourseId={currentCourse?.courseId}
            onCourseSelect={handleCourseSelect}
            statusConfig={liveConfig}
          />
        </div>
      )}
    </div>
  );
};

export default LivePage;