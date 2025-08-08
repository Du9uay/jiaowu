import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../data/mockData';
import ResumeEditModal from '../components/Resume/ResumeEditModal';
import ResumeHistoryModal from '../components/Resume/ResumeHistoryModal';

const ResumeInterviewPage = () => {
  console.log('ResumeInterviewPage rendering with new structure');
  
  const navigate = useNavigate();
  const { resumeInterview } = mockData;
  const [activeIndustry, setActiveIndustry] = useState('frontend');
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isResumeEditModalOpen, setIsResumeEditModalOpen] = useState(false);
  const [isResumeHistoryModalOpen, setIsResumeHistoryModalOpen] = useState(false);
  const sectionsRef = useRef({});

  console.log('Industries data:', resumeInterview.industries);

  // 导航到指定行业段落
  const handleNavClick = (industryId) => {
    console.log('Navigation clicked:', industryId);
    setActiveIndustry(industryId);
    sectionsRef.current[industryId]?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // 岗位卡片点击处理 - 打开简历弹窗
  const handlePositionClick = (industry, position) => {
    console.log('Position clicked:', industry.id, position.id, position.name);
    setSelectedPosition(position);
    setIsResumeModalOpen(true);
  };

  // 关闭简历弹窗
  const handleCloseResumeModal = () => {
    setIsResumeModalOpen(false);
    setSelectedPosition(null);
  };

  // 编辑简历
  const handleEditResume = () => {
    setIsResumeModalOpen(false);
    setIsResumeEditModalOpen(true);
  };

  // 查看修改历史
  const handleViewHistory = () => {
    setIsResumeModalOpen(false);
    setIsResumeHistoryModalOpen(true);
  };

  // 保存简历
  const handleSaveResume = (updatedResume) => {
    console.log('保存简历:', updatedResume);
    // 这里可以添加保存逻辑
    setIsResumeEditModalOpen(false);
    alert('简历保存成功！');
  };

  // 钩子题目点击处理
  const handleHookQuestionClick = (industry, position) => {
    console.log('Hook question clicked:', industry.id, position.id);
    navigate(`/interview-qa/${industry.id}/${position.id}`);
  };

  // 搜索功能
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // 过滤岗位
  const getFilteredPositions = (positions) => {
    if (!searchKeyword) return positions;
    return positions.filter(position => 
      position.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      position.company.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      position.level.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  };

  // 监听滚动位置更新导航状态
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      resumeInterview.industries.forEach(industry => {
        const section = sectionsRef.current[industry.id];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveIndustry(industry.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [resumeInterview.industries]);

  return (
    <div className="resume-interview-page">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">{resumeInterview.title}</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="搜索岗位、公司或级别..."
            value={searchKeyword}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>

      {/* 顶部导航栏 */}
      <div className="navigation-container">
        <nav className="industry-navigation">
          {resumeInterview.industries.map((industry) => (
            <button
              key={industry.id}
              className={`nav-item ${activeIndustry === industry.id ? 'active' : ''}`}
              onClick={() => handleNavClick(industry.id)}
            >
              {industry.name}
            </button>
          ))}
        </nav>
      </div>

      {/* 行业段落 */}
      <div className="industries-container">
        {resumeInterview.industries.map((industry) => (
          <section
            key={industry.id}
            className="industry-section"
            ref={el => sectionsRef.current[industry.id] = el}
          >
            <div className="section-header">
              <h2 className="section-title">{industry.name}</h2>
            </div>

            <div className="section-content">
              {/* 左侧：岗位网格 */}
              <div className="positions-container">
                <h3 className="container-title">
                  热门简历 
                  <span className="position-count">({getFilteredPositions(industry.positions).length}个)</span>
                </h3>
                <div className="positions-grid">
                  {getFilteredPositions(industry.positions).map((position) => (
                    <div
                      key={position.id}
                      className="position-card"
                      onClick={() => handlePositionClick(industry, position)}
                    >
                      <div className="position-info">
                        <h4 className="position-name">{position.name}</h4>
                        <p className="position-company">{position.company}</p>
                        <div className="position-meta">
                          <span className="position-level">{position.level}</span>
                          <span className="position-salary">{position.salary || '8-15K'}</span>
                        </div>
                      </div>
                      <div className="position-hover-overlay">
                        <span className="view-details">点击查看简历</span>
                      </div>
                    </div>
                  ))}
                </div>
                {getFilteredPositions(industry.positions).length === 0 && (
                  <div className="no-results">
                    <p>未找到相关岗位</p>
                  </div>
                )}
              </div>

              {/* 右侧：热门面试题（固定显示） */}
              <div className="interview-container">
                <h3 className="container-title">
                  {industry.name}热门面试题
                </h3>
                
                <div className="industry-interview-questions">
                  <div className="questions-section">
                    <h5>高频面试题</h5>
                    <div className="questions-list">
                      {industry.positions.slice(0, 4).map((position, pIndex) => 
                        position.interviews.hookQuestions.slice(0, 2).map((question, qIndex) => (
                          <div 
                            key={`${position.id}-${qIndex}`} 
                            className="question-item"
                            onClick={() => handleHookQuestionClick(industry, position)}
                          >
                            <span className="question-number">{pIndex * 2 + qIndex + 1}</span>
                            <span className="question-text">{question}</span>
                          </div>
                        ))
                      ).flat()}
                    </div>
                    <button 
                      className="view-all-questions-btn"
                      onClick={() => navigate(`/interview-qa/${industry.id}`)}
                    >
                      查看{industry.name}完整题库 (200+题)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* 简历详情弹窗 */}
      {isResumeModalOpen && selectedPosition && (
        <div className="resume-modal-overlay" onClick={handleCloseResumeModal}>
          <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <h3 className="resume-modal-title">简历详情</h3>
              <div className="resume-modal-actions">
                <button 
                  className="btn-edit"
                  onClick={handleEditResume}
                >
                  编辑
                </button>
                <button 
                  className="btn-history"
                  onClick={handleViewHistory}
                  title="查看修改历史"
                >
                  📝
                </button>
                <button className="resume-modal-close" onClick={handleCloseResumeModal}>
                  ×
                </button>
              </div>
            </div>
            <div className="resume-modal-body">
              <div className="position-detail-header">
                <div className="position-basic-info">
                  <h4>{selectedPosition.name}</h4>
                  <span className="company-badge">{selectedPosition.company}</span>
                  <span className="level-badge">{selectedPosition.level}</span>
                </div>
              </div>
              
              <div className="resume-sections">
                {/* 个人信息 */}
                <div className="resume-section">
                  <h5>个人信息</h5>
                  <div className="resume-content">
                    <div className="info-item">
                      <span className="info-label">姓名：</span>
                      <span className="info-value">{selectedPosition.resume?.personalInfo?.name || '张三'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">电话：</span>
                      <span className="info-value">{selectedPosition.resume?.personalInfo?.phone || '138****8888'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">邮箱：</span>
                      <span className="info-value">{selectedPosition.resume?.personalInfo?.email || 'example@email.com'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">地址：</span>
                      <span className="info-value">{selectedPosition.resume?.personalInfo?.location || '北京市朝阳区'}</span>
                    </div>
                  </div>
                </div>

                {/* 教育背景 */}
                <div className="resume-section">
                  <h5>教育背景</h5>
                  <div className="resume-content">
                    <div className="info-item">
                      <span className="info-label">院校：</span>
                      <span className="info-value">{selectedPosition.resume?.education?.university || '华南理工大学'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">专业：</span>
                      <span className="info-value">{selectedPosition.resume?.education?.major || '计算机科学与技术'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">学历：</span>
                      <span className="info-value">{selectedPosition.resume?.education?.degree || '本科'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">毕业年份：</span>
                      <span className="info-value">{selectedPosition.resume?.education?.graduationYear || '2021'}</span>
                    </div>
                  </div>
                </div>

                {/* 工作经历 */}
                <div className="resume-section">
                  <h5>工作经历</h5>
                  <div className="resume-content">
                    <div className="experience-item">
                      <div className="experience-header">
                        <span className="company-name">{selectedPosition.company}</span>
                        <span className="position-title">{selectedPosition.name}</span>
                      </div>
                      <div className="experience-duration">{selectedPosition.experience || '2-3年'}</div>
                      <div className="experience-responsibilities">
                        <ul>
                          <li>负责{selectedPosition.name}相关业务的开发与维护</li>
                          <li>参与核心系统架构设计，优化系统性能</li>
                          <li>协助团队制定技术规范，提升开发效率</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 技能特长 */}
                <div className="resume-section">
                  <h5>技能特长</h5>
                  <div className="resume-content">
                    <div className="skills-list">
                      {selectedPosition.resume?.skills ? 
                        selectedPosition.resume.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        )) :
                        ['JavaScript', 'React', 'Node.js', 'Python', 'MySQL'].map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 简历编辑弹窗 */}
      <ResumeEditModal
        resume={selectedPosition}
        isOpen={isResumeEditModalOpen}
        onClose={() => setIsResumeEditModalOpen(false)}
        onSave={handleSaveResume}
        isEditMode={true}
      />

      {/* 简历修改历史弹窗 */}
      <ResumeHistoryModal
        resume={selectedPosition}
        isOpen={isResumeHistoryModalOpen}
        onClose={() => setIsResumeHistoryModalOpen(false)}
      />
    </div>
  );
};

export default ResumeInterviewPage; 