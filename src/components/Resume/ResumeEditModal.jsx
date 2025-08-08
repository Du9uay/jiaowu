import React, { useState, useEffect } from 'react';
import '../../styles/resume-edit.css';

const ResumeEditModal = ({ resume, isOpen, onClose, onSave, isEditMode = false }) => {
  const [editData, setEditData] = useState({
    personalInfo: {
      name: '',
      phone: '',
      email: '',
      location: ''
    },
    education: {
      university: '',
      major: '',
      degree: '',
      graduationYear: ''
    },
    experience: {
      company: '',
      position: '',
      duration: '',
      responsibilities: []
    },
    skills: []
  });
  const [isEditing, setIsEditing] = useState(isEditMode);
  const [currentSkill, setCurrentSkill] = useState('');

  useEffect(() => {
    if (resume && isOpen) {
      setEditData({
        personalInfo: {
          name: resume.personalInfo?.name || '',
          phone: resume.personalInfo?.phone || '',
          email: resume.personalInfo?.email || '',
          location: resume.personalInfo?.location || ''
        },
        education: {
          university: resume.education?.university || '',
          major: resume.education?.major || '',
          degree: resume.education?.degree || '',
          graduationYear: resume.education?.graduationYear || ''
        },
        experience: {
          company: resume.company || '',
          position: resume.name || '',
          duration: resume.experience || '',
          responsibilities: ['负责核心业务开发与维护', '参与系统架构设计', '协助团队制定技术规范']
        },
        skills: resume.skills || []
      });
    }
  }, [resume, isOpen]);

  if (!isOpen || !resume) return null;

  const handleInputChange = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !editData.skills.includes(currentSkill.trim())) {
      setEditData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSave = () => {
    onSave({
      ...resume,
      personalInfo: editData.personalInfo,
      education: editData.education,
      experience: editData.experience,
      skills: editData.skills
    });
    setIsEditing(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="resume-edit-modal-overlay" onClick={handleOverlayClick}>
      <div className="resume-edit-modal-content">
        <div className="resume-edit-modal-header">
          <h3 className="resume-edit-modal-title">
            {isEditing ? '编辑简历' : '简历详情'}
          </h3>
          <div className="resume-edit-modal-actions">
            {!isEditing && (
              <button 
                className="btn-edit"
                onClick={() => setIsEditing(true)}
              >
                编辑
              </button>
            )}
            <button className="resume-edit-modal-close" onClick={onClose}>
              ×
            </button>
          </div>
        </div>

        <div className="resume-edit-modal-body">
          {/* 个人信息 */}
          <div className="resume-edit-section">
            <h4 className="resume-edit-section-title">个人信息</h4>
            <div className="resume-edit-content">
              <div className="form-grid">
                <div className="form-item">
                  <label className="form-label">姓名：</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-input"
                      value={editData.personalInfo.name}
                      onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                    />
                  ) : (
                    <span className="form-value">{editData.personalInfo.name}</span>
                  )}
                </div>
                <div className="form-item">
                  <label className="form-label">电话：</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-input"
                      value={editData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    />
                  ) : (
                    <span className="form-value">{editData.personalInfo.phone}</span>
                  )}
                </div>
                <div className="form-item">
                  <label className="form-label">邮箱：</label>
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-input"
                      value={editData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    />
                  ) : (
                    <span className="form-value">{editData.personalInfo.email}</span>
                  )}
                </div>
                <div className="form-item">
                  <label className="form-label">地址：</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-input"
                      value={editData.personalInfo.location}
                      onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                    />
                  ) : (
                    <span className="form-value">{editData.personalInfo.location}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 教育背景 */}
          <div className="resume-edit-section">
            <h4 className="resume-edit-section-title">教育背景</h4>
            <div className="resume-edit-content">
              <div className="form-grid">
                <div className="form-item">
                  <label className="form-label">院校：</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-input"
                      value={editData.education.university}
                      onChange={(e) => handleInputChange('education', 'university', e.target.value)}
                    />
                  ) : (
                    <span className="form-value">{editData.education.university}</span>
                  )}
                </div>
                <div className="form-item">
                  <label className="form-label">专业：</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-input"
                      value={editData.education.major}
                      onChange={(e) => handleInputChange('education', 'major', e.target.value)}
                    />
                  ) : (
                    <span className="form-value">{editData.education.major}</span>
                  )}
                </div>
                <div className="form-item">
                  <label className="form-label">学历：</label>
                  {isEditing ? (
                    <select
                      className="form-input"
                      value={editData.education.degree}
                      onChange={(e) => handleInputChange('education', 'degree', e.target.value)}
                    >
                      <option value="">请选择学历</option>
                      <option value="专科">专科</option>
                      <option value="本科">本科</option>
                      <option value="硕士">硕士</option>
                      <option value="博士">博士</option>
                    </select>
                  ) : (
                    <span className="form-value">{editData.education.degree}</span>
                  )}
                </div>
                <div className="form-item">
                  <label className="form-label">毕业年份：</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-input"
                      value={editData.education.graduationYear}
                      onChange={(e) => handleInputChange('education', 'graduationYear', e.target.value)}
                    />
                  ) : (
                    <span className="form-value">{editData.education.graduationYear}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 工作经历 */}
          <div className="resume-edit-section">
            <h4 className="resume-edit-section-title">工作经历</h4>
            <div className="resume-edit-content">
              <div className="experience-item">
                <div className="form-grid">
                  <div className="form-item">
                    <label className="form-label">公司：</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-input"
                        value={editData.experience.company}
                        onChange={(e) => handleInputChange('experience', 'company', e.target.value)}
                      />
                    ) : (
                      <span className="form-value">{editData.experience.company}</span>
                    )}
                  </div>
                  <div className="form-item">
                    <label className="form-label">职位：</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-input"
                        value={editData.experience.position}
                        onChange={(e) => handleInputChange('experience', 'position', e.target.value)}
                      />
                    ) : (
                      <span className="form-value">{editData.experience.position}</span>
                    )}
                  </div>
                  <div className="form-item form-item-full">
                    <label className="form-label">工作时间：</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-input"
                        value={editData.experience.duration}
                        onChange={(e) => handleInputChange('experience', 'duration', e.target.value)}
                      />
                    ) : (
                      <span className="form-value">{editData.experience.duration}</span>
                    )}
                  </div>
                </div>
                <div className="responsibilities-section">
                  <label className="form-label">工作职责：</label>
                  <ul className="responsibilities-list">
                    {editData.experience.responsibilities.map((resp, index) => (
                      <li key={index} className="responsibility-item">{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 技能特长 */}
          <div className="resume-edit-section">
            <h4 className="resume-edit-section-title">技能特长</h4>
            <div className="resume-edit-content">
              <div className="skills-container">
                <div className="skills-list">
                  {editData.skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <span className="skill-text">{skill}</span>
                      {isEditing && (
                        <button 
                          className="skill-remove"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <div className="skill-add-form">
                    <input
                      type="text"
                      className="skill-input"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      placeholder="添加技能"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    />
                    <button className="skill-add-btn" onClick={handleAddSkill}>
                      添加
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="resume-edit-modal-footer">
          <div className="modal-actions">
            <button className="btn-secondary" onClick={onClose}>
              取消
            </button>
            {isEditing && (
              <button className="btn-primary" onClick={handleSave}>
                保存
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditModal;