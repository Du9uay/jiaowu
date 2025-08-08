import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../components/Profile/Breadcrumb';
import ProfileCard from '../components/Profile/ProfileCard';
import StudyChart from '../components/Profile/StudyChart';
import CompletionChart from '../components/Profile/CompletionChart';
import ProgressPie from '../components/Profile/ProgressPie';
import AchievementSection from '../components/Profile/AchievementSection';
import ClassRankChart from '../components/Profile/ClassRankChart';

const PersonalProfile = () => {
  const location = useLocation();
  const [contextState, setContextState] = useState(null);

  console.log('PersonalProfile 个人档案页面渲染 - 统一布局模式');
  console.log('页面组件加载: StudyChart, CompletionChart, ProgressPie, ClassRankChart, AchievementSection');

  // 处理从个人数据展示区跳转过来的状态
  useEffect(() => {
    if (location.state) {
      setContextState(location.state);
      console.log('接收到上下文状态:', location.state);
    }
  }, [location.state]);

  const breadcrumbItems = ['主页', '个人档案'];

  console.log('渲染统一个人档案布局');

  return (
    <div className="personal-profile">
      {/* 面包屑导航 */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* 统一布局内容区域 */}
      <div className="unified-profile-layout">
        {/* 左侧区域 */}
        <div className="profile-left-section">
          <ProfileCard />
          <ClassRankChart />
        </div>
        
        {/* 中央区域 */}
        <div className="profile-center-section">
          <div className="study-stats-grid">
            <StudyChart />
            <CompletionChart />
          </div>
          <ProgressPie />
        </div>
        
        {/* 右侧区域 */}
        <div className="profile-right-section">
          <AchievementSection />
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile; 