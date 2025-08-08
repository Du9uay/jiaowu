import React from 'react';
import { mockData } from '../../data/mockData';

const AchievementSection = () => {
  const { achievements } = mockData;

  console.log('AchievementSection component rendering');
  console.log('AchievementSection 优化版本 - 适配右侧栏布局');

  const handleRecommendationClick = (recommendation) => {
    console.log('Recommendation clicked:', recommendation);
  };

  return (
    <div className="achievement-section">
      {/* 成就文本 */}
      <div className="achievement-text">
        {achievements.text.map((line, index) => (
          <div key={index} className="achievement-line">
            {index === 2 ? (
              <span>单元<span className="achievement-highlight">xxxxx</span>表现出色</span>
            ) : index === 3 ? (
              <span>熟悉掌握了<span className="achievement-highlight">技术xxxx</span></span>
            ) : index === 4 ? (
              <span>熟练运用了<span className="achievement-highlight">工具xxxx</span></span>
            ) : index === 1 ? (
              <span>在<span className="achievement-highlight">物联网就业管家课程</span>中</span>
            ) : (
              line
            )}
          </div>
        ))}
      </div>

      {/* 职位推荐标签 */}
      <div className="recommendation-tags">
        {achievements.recommendations.map((recommendation, index) => (
          <div 
            key={index} 
            className="recommendation-tag"
            onClick={() => handleRecommendationClick(recommendation)}
          >
            {recommendation}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementSection; 