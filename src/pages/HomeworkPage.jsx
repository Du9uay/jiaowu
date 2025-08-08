import React, { useEffect, useRef } from 'react';
import { mockData } from '../data/mockData';

const HomeworkPage = () => {
  const { homework } = mockData;
  const skillsRowRef1 = useRef(null);
  const skillsRowRef2 = useRef(null);

  console.log('HomeworkPage rendering with data:', homework.title);
  console.log('第一行技能数量:', homework.skills.length);
  console.log('第二行技能数量:', homework.verticalSkills.length);

  const getSkillLevelClass = (level) => {
    switch (level) {
      case 'completed': return 'skill-completed';
      case 'in-progress': return 'skill-in-progress';
      case 'locked': return 'skill-locked';
      default: return 'skill-locked';
    }
  };

  const handleSkillClick = (skill) => {
    console.log('Skill clicked:', skill.name, 'level:', skill.level);
  };

  // 添加鼠标滚轮横向滚动功能
  useEffect(() => {
    const handleWheel = (e, containerRef) => {
      if (containerRef.current) {
        // 检查是否在水平方向可以滚动
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        const canScrollHorizontally = scrollWidth > clientWidth;
        
        if (canScrollHorizontally) {
          e.preventDefault();
          const scrollAmount = e.deltaY > 0 ? 100 : -100;
          containerRef.current.scrollLeft += scrollAmount;
          console.log('横向滚动触发:', { scrollLeft: containerRef.current.scrollLeft, scrollAmount });
        }
      }
    };

    const skillsRow1 = skillsRowRef1.current;
    const skillsRow2 = skillsRowRef2.current;

    const wheelHandler1 = (e) => handleWheel(e, skillsRowRef1);
    const wheelHandler2 = (e) => handleWheel(e, skillsRowRef2);

    if (skillsRow1) {
      skillsRow1.addEventListener('wheel', wheelHandler1, { passive: false });
    }
    if (skillsRow2) {
      skillsRow2.addEventListener('wheel', wheelHandler2, { passive: false });
    }

    return () => {
      if (skillsRow1) {
        skillsRow1.removeEventListener('wheel', wheelHandler1);
      }
      if (skillsRow2) {
        skillsRow2.removeEventListener('wheel', wheelHandler2);
      }
    };
  }, []);

  return (
    <div className="homework-page">
      {/* 页面标题 */}
      <div className="homework-header">
        <h1 className="homework-title">{homework.title}</h1>
        <p className="homework-subtitle">{homework.subtitle}</p>
      </div>

      {/* 第一行技能 - 综合能力提升 */}
      <div className="skills-section">
        <div className="skills-row" ref={skillsRowRef1}>
          {homework.skills.map((skill, index) => (
            <div
              key={skill.id}
              className={`skill-item ${getSkillLevelClass(skill.level)}`}
              onClick={() => handleSkillClick(skill)}
            >
              <div className="skill-icon">
                <div className="skill-box">
                  <div className="skill-cube"></div>
                </div>
              </div>
              <div className="skill-content">
                <div className="skill-name">{skill.name}</div>
                <div className="skill-subtitle">主要工艺路线</div>
              </div>
              {skill.progress === 100 && (
                <div className="skill-status">
                  <span className="status-icon">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 连接线 */}
        <div className="connection-line"></div>

        {/* 第二行技能 - 垂直能力提升 */}
        <div className="skills-row vertical-skills" ref={skillsRowRef2}>
          {homework.verticalSkills.map((skill, index) => (
            <div
              key={skill.id}
              className={`skill-item ${getSkillLevelClass(skill.level)}`}
              onClick={() => handleSkillClick(skill)}
            >
              <div className="skill-icon">
                <div className="skill-diamond">
                  <div className="skill-cube"></div>
                </div>
              </div>
              <div className="skill-content">
                <div className="skill-name">{skill.name}</div>
                <div className="skill-subtitle">主要工艺路线</div>
              </div>
              {skill.level === 'in-progress' && (
                <div className="skill-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{skill.progress}%</span>
                </div>
              )}
              {skill.level === 'locked' && (
                <div className="skill-lock">
                  <span className="lock-icon">🔒</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeworkPage; 