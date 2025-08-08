import React from 'react';
import { mockData } from '../data/mockData';
import StartClass from '../components/Dashboard/StartClass';
import QuickAccess from '../components/Dashboard/QuickAccess';
import CalendarTaskModule from '../components/Dashboard/CalendarTaskModule';
import StudyStatus from '../components/Dashboard/StudyStatus';
import ClassRank from '../components/Dashboard/ClassRank';
import StageProgress from '../components/Dashboard/StageProgress';

const Dashboard = () => {
  const { stages } = mockData;

  return (
    <div className="dashboard">
      {/* 学习阶段进度条 */}
      <StageProgress />

      {/* Dashboard模块网格 - 瀑布流布局 */}
      <div className="dashboard-grid">
        <StartClass />
        <QuickAccess />
        <CalendarTaskModule />
        <StudyStatus />
        <ClassRank />
      </div>
    </div>
  );
};

export default Dashboard; 