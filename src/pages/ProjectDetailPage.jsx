import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockData } from '../data/mockData';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  console.log('ProjectDetailPage 渲染，项目ID:', id);
  
  // 查找对应的项目数据
  const project = mockData.projectLibrary.projects.find(p => p.id === parseInt(id));
  
  if (!project) {
    console.log('未找到项目数据，项目ID:', id);
    return (
      <div className="project-detail-page">
        <div className="project-not-found">
          <h2>项目未找到</h2>
          <button onClick={() => navigate('/project-library')} className="back-button">
            返回项目库
          </button>
        </div>
      </div>
    );
  }

  console.log('找到项目数据:', project.title, '详情数据:', project.details ? '已加载' : '未加载');

  const handleBackClick = () => {
    console.log('返回按钮被点击，准备返回项目库');
    navigate('/project-library');
  };

  const handleAttachmentClick = (attachment) => {
    console.log('附件被点击:', attachment.name, '文件类型:', attachment.type);
    // 模拟文件下载
    const link = document.createElement('a');
    link.href = attachment.url;
    link.download = attachment.name;
    link.click();
    console.log('文件下载已触发:', attachment.name);
  };

  const getFileIcon = (type) => {
    const icons = {
      'pdf': '📄',
      'excel': '📊',
      'word': '📝',
      'ppt': '📋'
    };
    return icons[type] || '📁';
  };

  // 如果项目数据不完整，使用基础数据显示
  const details = project.details || {
    overview: '项目概述数据加载中...',
    teamConfig: [],
    dataInterface: [],
    businessFlow: [],
    keyTechnologies: [],
    attachments: []
  };

  return (
    <div className="project-detail-page">
      {/* 页面头部 */}
      <div className="page-header">
        <button onClick={handleBackClick} className="back-button">
          ← 返回项目库
        </button>
        <h1 className="project-title">{project.title}</h1>
        <p className="project-subtitle">{project.subtitle}</p>
      </div>

      {/* 项目概述 */}
      <section className="detail-section">
        <h2 className="section-title">一、项目概述</h2>
        <div className="section-content">
          <p className="overview-text">{details.overview}</p>
        </div>
      </section>

      {/* 团队配置 */}
      <section className="detail-section">
        <h2 className="section-title">二、团队配置</h2>
        <div className="section-content">
          {details.teamConfig.length > 0 ? (
            <div className="team-grid">
              {details.teamConfig.map((member, index) => (
                <div key={index} className="team-member">
                  <span className="member-role">{member.role}：</span>
                  <span className="member-name">{member.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="placeholder-text">团队配置信息加载中...</p>
          )}
        </div>
      </section>

      {/* 对接数据 */}
      <section className="detail-section">
        <h2 className="section-title">三、对接数据</h2>
        <div className="section-content">
          {details.dataInterface.length > 0 ? (
            <div className="data-list">
              {details.dataInterface.map((item, index) => (
                <div key={index} className="data-item">
                  <span className="data-label">{item.label}：</span>
                  <span className="data-value">{item.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="placeholder-text">对接数据信息加载中...</p>
          )}
        </div>
      </section>

      {/* 业务流程分析 */}
      <section className="detail-section">
        <h2 className="section-title">四、项目业务流程分析</h2>
        <div className="section-content">
          {details.businessFlow.length > 0 ? (
            <ol className="flow-list">
              {details.businessFlow.map((step, index) => (
                <li key={index} className="flow-item">
                  <strong>{step.title}：</strong>
                  {step.description}
                </li>
              ))}
            </ol>
          ) : (
            <p className="placeholder-text">业务流程分析加载中...</p>
          )}
        </div>
      </section>

      {/* 关键技术 */}
      <section className="detail-section">
        <h2 className="section-title">五、项目的关键技术</h2>
        <div className="section-content">
          {details.keyTechnologies.length > 0 ? (
            <ol className="tech-list">
              {details.keyTechnologies.map((tech, index) => (
                <li key={index} className="tech-item">
                  {tech}
                </li>
              ))}
            </ol>
          ) : (
            <p className="placeholder-text">关键技术信息加载中...</p>
          )}
        </div>
      </section>

      {/* 附件 */}
      <section className="detail-section">
        <h2 className="section-title">六、附件</h2>
        <div className="section-content">
          {details.attachments.length > 0 ? (
            <div className="attachments-grid">
              {details.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="attachment-item"
                  onClick={() => handleAttachmentClick(attachment)}
                >
                  <div className="attachment-icon">
                    {getFileIcon(attachment.type)}
                  </div>
                  <div className="attachment-info">
                    <span className="attachment-name">{attachment.name}</span>
                    <span className="attachment-size">{attachment.size}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="placeholder-text">附件信息加载中...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage; 