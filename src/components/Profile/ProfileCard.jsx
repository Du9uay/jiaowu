import React from 'react';
import { mockData } from '../../data/mockData';

const ProfileCard = () => {
  const { profile } = mockData;

  console.log('ProfileCard component rendering with profile:', profile.name);
  console.log('ProfileCard 优化版本 - 符合统一布局设计');

  return (
    <div className="profile-card">
      {/* 个人头像和基本信息 */}
      <div className="profile-header">
        <div className="profile-avatar"></div>
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <div className="profile-basic">
            性别：{profile.gender} 学号：{profile.studentId}
          </div>
        </div>
      </div>

      {/* 详细信息 */}
      <div className="profile-details">
        <div className="detail-row">
          <span className="detail-label">学校</span>
          <span className="detail-value">{profile.school}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">专业</span>
          <span className="detail-value">{profile.major}</span>
        </div>
      </div>

      {/* 课程信息 */}
      <div className="profile-courses">
        <div className="courses-title">就业管家课程</div>
        <div className="course-tags">
          {profile.courses.map((course, index) => (
            <span key={index} className="course-tag">
              {course}
            </span>
          ))}
        </div>
      </div>

      {/* 个人徽章 */}
      <div className="profile-badges">
        <div className="badge">学分 {profile.badges.credits}</div>
        <div className="badge">班级排名 {profile.badges.classRank}</div>
        <div className="badge">MBTI {profile.badges.mbti}</div>
      </div>
    </div>
  );
};

export default ProfileCard; 