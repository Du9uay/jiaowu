import React from 'react';

const JobStrategyNotes = ({ notesData, onViewStrategy }) => {
  console.log('JobStrategyNotes组件初始化', notesData);

  if (!notesData) {
    console.log('JobStrategyNotes: 暂无纪要数据');
    return (
      <div className="job-strategy-notes">
        <div className="notes-header">
          <h2 className="notes-title">直播纪要</h2>
        </div>
        <div className="no-notes">
          <div className="no-notes-icon">📝</div>
          <div className="no-notes-text">暂无直播纪要</div>
        </div>
      </div>
    );
  }

  const { title, keyPoints } = notesData;

  console.log('JobStrategyNotes: 渲染纪要数据', {
    keyPointsCount: keyPoints?.length || 0
  });

  // 获取类型图标
  const getTypeIcon = (type) => {
    const icons = {
      strategy: '🎯',
      advice: '💡',
      timeline: '⏰',
      action: '📋'
    };
    return icons[type] || '📝';
  };



  return (
    <div className="job-strategy-notes">
      {/* 纪要标题 */}
      <div className="notes-header">
        <h2 className="notes-title">{title}</h2>
        <div className="notes-meta">
          <span className="live-indicator">
            <span className="live-dot"></span>
            直播进行中
          </span>
        </div>
      </div>

      {/* 滚动内容区域 */}
      <div className="notes-content">
        {/* 关键要点记录 */}
        {keyPoints && keyPoints.length > 0 && (
          <div className="notes-section">
            <h3 className="section-title">关键要点记录</h3>
            <div className="key-points-list">
              {keyPoints.map(point => (
                <div key={point.id} className="key-point-item">
                  <div className="point-header">
                    <span className="point-icon">{getTypeIcon(point.type)}</span>
                    <span className="point-time">{point.time}</span>
                    <h4 className="point-title">{point.title}</h4>
                  </div>
                  <p className="point-content">{point.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 查看求职策略按钮 */}
        <div className="strategy-action-section">
          <button 
            className="view-strategy-button"
            onClick={onViewStrategy}
          >
            <span className="button-icon">📊</span>
            查看求职策略
          </button>
        </div>
      </div>

      {/* 内联样式 */}
      <style>{`
        .job-strategy-notes {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
        }

        .notes-header {
          padding: 20px 24px;
          border-bottom: 1px solid #f0f1f3;
          background: #fafbfc;
          flex-shrink: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .notes-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .notes-meta {
          display: flex;
          align-items: center;
        }

        .live-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #ef4444;
          font-size: 13px;
          font-weight: 500;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef4444;
          animation: pulse-live 2s infinite;
        }

        @keyframes pulse-live {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .notes-content {
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }

        .notes-section {
          padding: 20px 24px;
          border-bottom: 1px solid #f3f4f6;
        }

        .notes-section:last-child {
          border-bottom: none;
        }

        .section-title {
          margin: 0 0 16px 0;
          font-size: 15px;
          font-weight: 600;
          color: #374151;
        }

        /* 关键要点样式 */
        .key-points-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .key-point-item {
          background: #f8fafc;
          border-radius: 8px;
          padding: 16px;
          border: 1px solid #e5e7eb;
        }

        .point-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .point-icon {
          font-size: 16px;
        }

        .point-time {
          font-size: 12px;
          color: #6b7280;
          background: #ffffff;
          padding: 2px 8px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        .point-title {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }

        .point-content {
          margin: 0;
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        /* 查看策略按钮样式 */
        .strategy-action-section {
          padding: 24px;
          text-align: center;
          border-top: 1px solid #f3f4f6;
          background: #fafbfc;
        }

        .view-strategy-button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease;
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 auto;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .view-strategy-button:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
        }

        .button-icon {
          font-size: 18px;
        }

        /* 空状态样式 */
        .no-notes {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          color: #9ca3af;
          text-align: center;
        }

        .no-notes-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .no-notes-text {
          font-size: 14px;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
          .notes-header {
            padding: 16px;
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }

          .notes-section {
            padding: 16px;
          }

          .point-header {
            flex-wrap: wrap;
          }

          .action-header {
            flex-wrap: wrap;
          }

          .plan-companies, .plan-skills {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default JobStrategyNotes; 