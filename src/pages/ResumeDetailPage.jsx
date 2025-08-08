import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockData } from '../data/mockData';

const ResumeDetailPage = () => {
  console.log('ResumeDetailPage rendering');
  
  const { industry: industryId, position: positionId } = useParams();
  const navigate = useNavigate();
  const { resumeInterview } = mockData;

  console.log('URL params:', { industryId, positionId });

  // 查找对应的行业和岗位数据
  const industry = resumeInterview.industries?.find(ind => ind.id === industryId);
  const position = industry?.positions?.find(pos => pos.id === positionId);

  console.log('Found industry:', industry?.name);
  console.log('Found position:', position?.name);

  // 返回按钮处理
  const handleBackClick = () => {
    console.log('Back button clicked');
    navigate('/resume-interview');
  };

  // 打印简历
  const handlePrint = () => {
    console.log('Print resume clicked');
    window.print();
  };

  // 如果未找到数据
  if (!industry || !position) {
    return (
      <div className="resume-detail-page">
        <div className="page-header">
          <button className="back-button" onClick={handleBackClick}>
            ← 返回
          </button>
          <h1 className="page-title">简历未找到</h1>
        </div>
        <div className="resume-not-found">
          <p>抱歉，未找到对应的简历信息。</p>
          <button className="back-button" onClick={handleBackClick}>
            返回列表
          </button>
        </div>
      </div>
    );
  }

  const { resume } = position;

  return (
    <div className="resume-detail-page">
      {/* 页面头部 */}
      <div className="page-header">
        <button className="back-button" onClick={handleBackClick}>
          ← 返回
        </button>
        <div className="header-title">
          <h1 className="page-title">{position.name} - 简历</h1>
          <p className="page-subtitle">{position.company} · {position.level}</p>
        </div>
        <button className="print-button" onClick={handlePrint}>
          打印简历
        </button>
      </div>

      {/* 简历内容 */}
      <div className="resume-container">
        <div className="resume-content">
          {/* 个人信息 */}
          {resume.personalInfo && (
            <section className="resume-section">
              <h2 className="section-title">个人信息</h2>
              <div className="personal-info">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">姓名：</span>
                    <span className="info-value">{resume.personalInfo.name || '未提供'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">电话：</span>
                    <span className="info-value">{resume.personalInfo.phone || '未提供'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">邮箱：</span>
                    <span className="info-value">{resume.personalInfo.email || '未提供'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">地址：</span>
                    <span className="info-value">{resume.personalInfo.location || '未提供'}</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 教育背景 */}
          {resume.education && (
            <section className="resume-section">
              <h2 className="section-title">教育背景</h2>
              <div className="education-info">
                <div className="education-item">
                  <div className="education-header">
                    <h3 className="education-university">{resume.education.university || '未提供'}</h3>
                    <span className="education-year">{resume.education.graduationYear || '未提供'}</span>
                  </div>
                  <div className="education-details">
                    <p className="education-major">{resume.education.major || '未提供'} · {resume.education.degree || '未提供'}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 工作经验 */}
          {resume.experience && resume.experience.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">工作经验</h2>
              <div className="experience-list">
                {resume.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <div className="experience-title">
                        <h3 className="experience-position">{exp.position || '未提供'}</h3>
                        <p className="experience-company">{exp.company || '未提供'}</p>
                      </div>
                      <span className="experience-duration">{exp.duration || '未提供'}</span>
                    </div>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <div className="experience-responsibilities">
                        <ul className="responsibilities-list">
                          {exp.responsibilities.map((resp, respIndex) => (
                            <li key={respIndex} className="responsibility-item">{resp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 技能特长 */}
          {resume.skills && resume.skills.length > 0 && (
            <section className="resume-section">
              <h2 className="section-title">技能特长</h2>
              <div className="skills-container">
                <div className="skills-list">
                  {resume.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 如果简历信息不完整，显示占位符 */}
          {(!resume.personalInfo && !resume.education && !resume.experience && !resume.skills) && (
            <section className="resume-section">
              <div className="placeholder-content">
                <p className="placeholder-text">该岗位的详细简历信息正在完善中...</p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeDetailPage; 