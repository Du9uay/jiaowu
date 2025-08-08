import React from 'react';
import '../../styles/company-jobs.css';

const JobDetailModal = ({ job, isOpen, onClose, onApply }) => {
  if (!isOpen || !job) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="job-detail-modal">
        <div className="modal-header">
          <div className="modal-title-section">
            <h2 className="modal-title">{job.position}</h2>
            <div className="company-badge">{job.company}</div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <span>×</span>
          </button>
        </div>

        <div className="modal-content">
          <div className="job-basic-info">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">薪资待遇：</span>
                <span className="info-value salary">{job.salary}</span>
              </div>
              <div className="info-item">
                <span className="info-label">工作地点：</span>
                <span className="info-value">{job.details?.location || '苏州'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">工作经验：</span>
                <span className="info-value">{job.details?.experience || '1-3年'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">学历要求：</span>
                <span className="info-value">{job.details?.education || '本科及以上'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">招聘人数：</span>
                <span className="info-value">{job.details?.positions || '5人'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">截止时间：</span>
                <span className="info-value deadline">{job.deadline}</span>
              </div>
            </div>
          </div>

          <div className="job-tags-section">
            <h3>职位标签</h3>
            <div className="tags-list">
              {job.tags.map((tag, index) => (
                <span key={index} className="job-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="job-description-section">
            <h3>职位描述</h3>
            <div className="job-description">
              <p>{job.details?.description || `
作为物联网实施工程师，您将负责物联网解决方案的部署、实施和维护工作。主要职责包括：

• 负责物联网设备的安装、调试和配置工作
• 参与物联网系统架构设计和技术方案制定
• 协助客户完成物联网项目的部署和上线
• 提供技术支持和故障排除服务
• 编写相关技术文档和操作手册
• 与产品、开发团队协作，优化产品功能和用户体验
              `}</p>
            </div>
          </div>

          <div className="job-requirements-section">
            <h3>任职要求</h3>
            <div className="job-requirements">
              <ul>
                {(job.details?.requirements || [
                  '本科及以上学历，计算机、电子工程、通信工程等相关专业',
                  '熟悉物联网技术架构，了解传感器、网关、云平台等核心组件',
                  '具备Linux系统操作经验，熟悉常用网络协议（TCP/IP、HTTP、MQTT等）',
                  '有嵌入式开发或硬件调试经验者优先',
                  '具备良好的沟通协调能力和团队合作精神',
                  '责任心强，具备较强的学习能力和问题解决能力'
                ]).map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="company-benefits-section">
            <h3>公司福利</h3>
            <div className="benefits-grid">
              {(job.details?.benefits || [
                '五险一金', '双休', '年终奖金', '带薪年假', 
                '员工培训', '弹性工作', '团队建设', '节日福利'
              ]).map((benefit, index) => (
                <div key={index} className="benefit-item">{benefit}</div>
              ))}
            </div>
          </div>

          <div className="company-info-section">
            <h3>公司介绍</h3>
            <div className="company-description">
              <p>{job.details?.companyInfo || `
${job.company}是一家专注于物联网技术解决方案的高新技术企业，致力于为各行业客户提供专业的物联网产品和服务。公司拥有完善的技术团队和丰富的项目经验，在智能制造、智慧城市、智能家居等领域有着广泛的应用案例。

我们为员工提供良好的发展平台和职业成长空间，注重技术创新和团队协作，期待有志之士的加入！
              `}</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-actions">
            <button className="btn-secondary" onClick={onClose}>
              关闭
            </button>
            <button 
              className="btn-primary apply-btn"
              onClick={() => {
                onClose();
                onApply && onApply(job);
              }}
            >
              立即投递
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;