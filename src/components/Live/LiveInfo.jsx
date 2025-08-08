import React from 'react';

const LiveInfo = ({ liveInfo, statusConfig }) => {
  if (!liveInfo) {
    return (
      <div className="live-info">
        <div className="no-live-info">
          <div className="no-live-icon">📺</div>
          <div className="no-live-text">暂无直播信息</div>
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
    <div className="live-info">
             {/* 老师信息区域 */}
       <div className="teacher-info">
         <div className="teacher-avatar"></div>
         <div className="teacher-details">
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
              <span className="stat-label">观看:</span>
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

      {/* 课程描述 */}
      {description && (
        <div className="course-description-section">
          <h4 className="description-title">课程介绍</h4>
          <p className="course-description">{description}</p>
        </div>
      )}

      {/* 内联样式 */}
      <style>{`
        .no-live-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          color: var(--text-muted);
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

        .live-info {
          padding: 20px;
        }

        .teacher-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f0f1f3;
        }

        .teacher-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #e5e7eb;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>');
          background-size: 24px;
          background-repeat: no-repeat;
          background-position: center;
          flex-shrink: 0;
        }

        .teacher-details h3 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .teacher-details p {
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
          color: var(--text-secondary);
          font-weight: 500;
          min-width: 40px;
        }

        .stat-value {
          font-size: 13px;
          color: var(--text-primary);
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
          color: var(--text-primary);
        }

        .course-description-section {
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
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
        }
      `}</style>
    </div>
  );
};

export default LiveInfo; 