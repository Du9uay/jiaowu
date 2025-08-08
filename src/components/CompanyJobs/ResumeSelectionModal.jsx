import React, { useState } from 'react';
import { mockData } from '../../data/mockData';
import ResumeEditModal from '../Resume/ResumeEditModal';
import '../../styles/company-jobs.css';

const ResumeSelectionModal = ({ job, isOpen, onClose, onSubmit }) => {
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewResume, setPreviewResume] = useState(null);
  const [editResume, setEditResume] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!isOpen || !job) return null;

  const { userResumes } = mockData;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleResumeSelect = (resumeId) => {
    setSelectedResumeId(resumeId);
  };

  const handleSubmit = async () => {
    if (!selectedResumeId) {
      alert('请选择要投递的简历');
      return;
    }

    setIsSubmitting(true);
    
    // 模拟投递过程
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(selectedResumeId);
      alert('简历投递成功！');
      onClose();
    }, 1500);
  };

  // 预览简历
  const handlePreviewResume = (resume) => {
    setPreviewResume(resume);
    setIsPreviewModalOpen(true);
  };

  // 编辑简历
  const handleEditResume = (resume) => {
    setEditResume(resume);
    setIsEditModalOpen(true);
  };

  // 保存简历
  const handleSaveResume = (updatedResume) => {
    console.log('保存简历:', updatedResume);
    setIsEditModalOpen(false);
    alert('简历保存成功！');
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="resume-selection-modal">
        <div className="modal-header">
          <div className="modal-title-section">
            <h2 className="modal-title">选择投递简历</h2>
            <p className="modal-subtitle">
              投递至：{job.company} - {job.position}
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <span>×</span>
          </button>
        </div>

        <div className="modal-content">
          <div className="resume-list">
            {userResumes.map((resume) => (
              <div 
                key={resume.id}
                className={`resume-card ${selectedResumeId === resume.id ? 'selected' : ''}`}
                onClick={() => handleResumeSelect(resume.id)}
              >
                <div className="resume-header">
                  <div className="resume-info">
                    <h3 className="resume-title">{resume.title}</h3>
                    <p className="resume-target">{resume.targetPosition}</p>
                  </div>
                  <div className="resume-status">
                    <span className={`status-badge ${resume.status}`}>
                      {resume.statusText}
                    </span>
                  </div>
                </div>

                <div className="resume-details">
                  <div className="detail-row">
                    <span className="detail-label">更新时间：</span>
                    <span className="detail-value">{resume.updateTime}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">投递次数：</span>
                    <span className="detail-value">{resume.submitCount}次</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">简历类型：</span>
                    <span className="detail-value">{resume.type}</span>
                  </div>
                </div>

                <div className="resume-tags">
                  {resume.skills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                  {resume.skills.length > 4 && (
                    <span className="more-skills">+{resume.skills.length - 4}</span>
                  )}
                </div>

                <div className="resume-actions">
                  <button 
                    className="view-resume-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreviewResume(resume);
                    }}
                  >
                    预览
                  </button>
                  <button 
                    className="edit-resume-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditResume(resume);
                    }}
                  >
                    编辑
                  </button>
                </div>

                {selectedResumeId === resume.id && (
                  <div className="selection-indicator">
                    <span className="checkmark">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {userResumes.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <h3>暂无简历</h3>
              <p>您还没有创建简历，请先创建简历后再投递岗位</p>
              <button className="create-resume-btn">
                创建简历
              </button>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <div className="modal-actions">
            <button className="btn-secondary" onClick={onClose}>
              取消
            </button>
            <button 
              className={`btn-primary ${isSubmitting ? 'loading' : ''}`}
              onClick={handleSubmit}
              disabled={!selectedResumeId || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  投递中...
                </>
              ) : (
                '确认投递'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 简历预览弹窗 */}
      <ResumeEditModal
        resume={previewResume}
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onSave={() => {}}
        isEditMode={false}
      />

      {/* 简历编辑弹窗 */}
      <ResumeEditModal
        resume={editResume}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveResume}
        isEditMode={true}
      />
    </div>
  );
};

export default ResumeSelectionModal;