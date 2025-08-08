import React from 'react';

const JobStrategyVideoInfo = ({ liveInfo, statusConfig }) => {
  console.log('JobStrategyVideoInfo组件初始化', liveInfo);

  if (!liveInfo) {
    console.log('JobStrategyVideoInfo: 暂无直播信息');
    return (
      <div className="job-strategy-video-info">
        <div className="no-live-info">
          <div className="no-live-icon">👨‍🏫</div>
          <div className="no-live-text">暂无指导老师信息</div>
        </div>
      </div>
    );
  }

  const { 
    title, 
    teacher, 
    teacherAvatar, 
    description, 
    startTime, 
    viewers, 
    status, 
    duration 
  } = liveInfo;

  console.log('JobStrategyVideoInfo: 渲染指导老师信息', {
    teacher,
    status,
    viewers,
    title
  });

  // 格式化开始时间
  const formatStartTime = (timeString) => {
    try {
      const date = new Date(timeString);
      const today = new Date();
      
      // 检查是否是今天
      const isToday = date.toDateString() === today.toDateString();
      
      if (isToday) {
        return `今天 ${date.toLocaleTimeString('zh-CN', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}`;
      } else {
        return date.toLocaleString('zh-CN', {
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    } catch (error) {
      console.error('时间格式化错误:', error);
      return timeString;
    }
  };

  // 格式化观看人数
  const formatViewers = (count) => {
    if (!count || count === 0) return '0';
    if (count < 1000) return count.toString();
    if (count < 10000) return `${(count / 1000).toFixed(1)}k`;
    return `${(count / 10000).toFixed(1)}w`;
  };

  // 获取状态信息
  const getStatusInfo = (status) => {
    return statusConfig?.statusTypes?.[status] || {
      name: status,
      color: '#6b7280',
      bgColor: '#f9fafb'
    };
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className="job-strategy-video-info">
      {/* 求职指导专家信息区域 */}
      <div className="expert-info">
        <div className="expert-avatar"></div>
        <div className="expert-details">
          <h3>{teacher}</h3>
          <p>{title}</p>
        </div>
      </div>

      {/* 直播状态和统计信息 */}
      <div className="live-stats">
        <div className="stat-row">
          <div className="stat-item">
            <span className="stat-label">状态:</span>
            <span 
              className="stat-value status-badge"
              style={{
                backgroundColor: statusInfo.bgColor,
                color: statusInfo.color
              }}
            >
              {status === 'live' && <span className="status-dot"></span>}
              {statusInfo.name}
            </span>
          </div>
          
          {viewers > 0 && (
            <div className="stat-item">
              <span className="stat-label">连线:</span>
              <span className="stat-value">{formatViewers(viewers)}人</span>
            </div>
          )}
        </div>

        <div className="stat-row">
          <div className="stat-item">
            <span className="stat-label">开始:</span>
            <span className="stat-value">{formatStartTime(startTime)}</span>
          </div>
          
          {duration && (
            <div className="stat-item">
              <span className="stat-label">时长:</span>
              <span className="stat-value">{duration}</span>
            </div>
          )}
        </div>
      </div>

      {/* 求职指导介绍 */}
      {description && (
        <div className="guidance-description-section">
          <h4 className="description-title">指导介绍</h4>
          <p className="guidance-description">{description}</p>
        </div>
      )}

      {/* 专家专长信息 */}
      <div className="expert-specialties-section">
        <h4 className="description-title">专家专长</h4>
        <div className="specialties-tags">
          <span className="specialty-tag">简历优化</span>
          <span className="specialty-tag">面试技巧</span>
          <span className="specialty-tag">薪资谈判</span>
          <span className="specialty-tag">职业规划</span>
          <span className="specialty-tag">行业分析</span>
        </div>
      </div>

      {/* 内联样式 */}
      <style>{`
        .job-strategy-video-info {
          padding: 20px;
        }

        .no-live-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          color: #9ca3af;
          text-align: center;
        }

        .no-live-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .no-live-text {
          font-size: 14px;
        }

        .expert-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f0f1f3;
        }

        .expert-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>');
          background-size: 24px;
          background-repeat: no-repeat;
          background-position: center;
          flex-shrink: 0;
          border: 2px solid #e5e7eb;
        }

        .expert-details h3 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .expert-details p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .live-stats {
          margin-bottom: 20px;
          padding: 16px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        .stat-row {
          display: flex;
          gap: 24px;
          margin-bottom: 8px;
        }

        .stat-row:last-child {
          margin-bottom: 0;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
        }

        .stat-label {
          font-size: 13px;
          color: #6b7280;
          font-weight: 500;
          min-width: 40px;
        }

        .stat-value {
          font-size: 13px;
          color: #111827;
          font-weight: 500;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          animation: pulse 2s infinite;
        }

        .description-title {
          margin: 0 0 12px 0;
          font-size: 15px;
          font-weight: 600;
          color: #111827;
        }

        .guidance-description-section {
          border-top: 1px solid #e5e7eb;
          padding-top: 16px;
          margin-bottom: 20px;
        }

        .guidance-description {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
        }

        .expert-specialties-section {
          border-top: 1px solid #e5e7eb;
          padding-top: 16px;
        }

        .specialties-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .specialty-tag {
          display: inline-block;
          background: #eff6ff;
          color: #2563eb;
          font-size: 12px;
          font-weight: 500;
          padding: 4px 12px;
          border-radius: 16px;
          border: 1px solid #dbeafe;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @media (max-width: 768px) {
          .stat-row {
            flex-direction: column;
            gap: 8px;
          }

          .stat-item {
            gap: 6px;
          }

          .stat-label {
            min-width: 36px;
            font-size: 12px;
          }

          .stat-value {
            font-size: 12px;
          }

          .description-title {
            font-size: 14px;
          }

          .guidance-description {
            font-size: 13px;
          }

          .specialties-tags {
            gap: 6px;
          }

          .specialty-tag {
            font-size: 11px;
            padding: 3px 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default JobStrategyVideoInfo; 