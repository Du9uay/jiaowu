import React, { useState } from 'react';
import '../../styles/resume-history.css';

const ResumeHistoryModal = ({ resume, isOpen, onClose }) => {
  if (!isOpen || !resume) return null;

  // Mock修改历史数据
  const historyData = [
    {
      id: 1,
      date: '2024-01-15 14:30',
      type: 'edit',
      editor: '张同学',
      editorType: 'student',
      changes: ['更新了个人联系方式', '新增了工作经历'],
      version: '1.5'
    },
    {
      id: 2,
      date: '2024-01-12 10:20',
      type: 'teacher_edit',
      editor: '李老师',
      editorType: 'teacher',
      changes: ['优化了技能描述', '调整了教育背景格式', '添加了项目经验'],
      version: '1.4'
    },
    {
      id: 3,
      date: '2024-01-10 16:45',
      type: 'edit',
      editor: '张同学',
      editorType: 'student',
      changes: ['更新了求职意向'],
      version: '1.3'
    },
    {
      id: 4,
      date: '2024-01-08 09:15',
      type: 'teacher_edit',
      editor: '王老师',
      editorType: 'teacher',
      changes: ['修正了语法错误', '完善了工作职责描述'],
      version: '1.2'
    },
    {
      id: 5,
      date: '2024-01-05 11:30',
      type: 'create',
      editor: '张同学',
      editorType: 'student',
      changes: ['创建了简历'],
      version: '1.0'
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'create': return '📝';
      case 'edit': return '✏️';
      case 'teacher_edit': return '👨‍🏫';
      default: return '📄';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'create': return '创建';
      case 'edit': return '编辑';
      case 'teacher_edit': return '老师修改';
      default: return '未知操作';
    }
  };

  const getEditorBadgeClass = (editorType) => {
    return editorType === 'teacher' ? 'editor-teacher' : 'editor-student';
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="resume-history-modal-overlay" onClick={handleOverlayClick}>
      <div className="resume-history-modal-content">
        <div className="resume-history-modal-header">
          <h3 className="resume-history-modal-title">
            简历修改历史
          </h3>
          <button className="resume-history-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="resume-history-modal-body">
          <div className="history-info">
            <div className="resume-title">{resume.title || '简历'}</div>
            <div className="current-version">当前版本：v{historyData[0]?.version}</div>
          </div>

          <div className="history-timeline">
            {historyData.map((item, index) => (
              <div key={item.id} className="history-item">
                <div className="history-dot">
                  <span className="history-icon">{getTypeIcon(item.type)}</span>
                </div>
                
                <div className="history-content">
                  <div className="history-header">
                    <div className="history-action">
                      <span className="action-type">{getTypeText(item.type)}</span>
                      <span className="version-tag">v{item.version}</span>
                    </div>
                    <div className="history-meta">
                      <span className={`editor-badge ${getEditorBadgeClass(item.editorType)}`}>
                        {item.editor}
                      </span>
                      <span className="history-date">{item.date}</span>
                    </div>
                  </div>
                  
                  <div className="history-changes">
                    {item.changes.map((change, changeIndex) => (
                      <div key={changeIndex} className="change-item">
                        <span className="change-bullet">•</span>
                        <span className="change-text">{change}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {index < historyData.length - 1 && (
                  <div className="history-line"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="resume-history-modal-footer">
          <div className="history-stats">
            <div className="stat-item">
              <span className="stat-label">总修改次数：</span>
              <span className="stat-value">{historyData.length - 1}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">老师修改次数：</span>
              <span className="stat-value">
                {historyData.filter(item => item.editorType === 'teacher').length}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">最近更新：</span>
              <span className="stat-value">{historyData[0]?.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeHistoryModal;