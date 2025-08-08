import React, { useEffect } from 'react';
import Portal from '../common/Portal';

const EventDetailModal = ({ isOpen, event, onClose }) => {
  console.log('EventDetailModal组件渲染', { 
    isOpen: isOpen ? '打开' : '关闭', 
    event: event ? event.title : '无事件' 
  });

  // ESC键关闭模态框
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        console.log('按下ESC键 - 关闭事件详情模态框');
        onClose();
      }
    };

    if (isOpen) {
      console.log('事件详情模态框已打开 - 添加ESC键监听');
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      console.log('移除事件详情模态框ESC键监听');
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // 如果未打开或无事件数据，不渲染
  if (!isOpen || !event) {
    console.log('模态框未打开或无事件数据，跳过渲染');
    return null;
  }

  // 事件类型映射
  const eventTypeNames = {
    class: '课程',
    meeting: '会议',
    lab: '实验',
    exam: '考试'
  };

  // 处理遮罩层点击
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      console.log('点击遮罩层 - 关闭事件详情模态框');
      onClose();
    }
  };

  // 处理关闭按钮点击
  const handleCloseClick = () => {
    console.log('点击关闭按钮 - 关闭事件详情模态框');
    onClose();
  };

  // 格式化时间显示
  const formatTimeRange = (startTime, endTime) => {
    const startDate = new Date(startTime.replace(' ', 'T'));
    const endDate = new Date(endTime.replace(' ', 'T'));
    
    const formatTime = (date) => {
      return date.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    };
    
    const formatDate = (date) => {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
    };

    return {
      date: formatDate(startDate),
      timeRange: `${formatTime(startDate)} - ${formatTime(endDate)}`
    };
  };

  const { date, timeRange } = formatTimeRange(event.startTime, event.endTime);

  console.log('渲染事件详情', {
    事件标题: event.title,
    事件类型: event.type,
    时间: timeRange,
    日期: date
  });

  return (
    <Portal className="event-detail-portal">
      <div className="event-detail-overlay" onClick={handleOverlayClick}>
        <div className="event-detail-modal">
          {/* 模态框头部 */}
          <div className="event-detail-header">
            <h3 className="event-detail-title">事件详情</h3>
            <button 
              className="event-detail-close"
              onClick={handleCloseClick}
              type="button"
            >
              ×
            </button>
          </div>

          {/* 模态框内容 */}
          <div className="event-detail-content">
            {/* 事件标题 */}
            <div className="event-detail-field">
              <div className="event-detail-label">事件标题</div>
              <div className="event-detail-value">{event.title}</div>
            </div>

            {/* 事件类型 */}
            <div className="event-detail-field">
              <div className="event-detail-label">事件类型</div>
              <div className="event-detail-value">
                <span className={`event-type-badge event-type-${event.type}`}>
                  {eventTypeNames[event.type] || event.type}
                </span>
              </div>
            </div>

            {/* 日期 */}
            <div className="event-detail-field">
              <div className="event-detail-label">日期</div>
              <div className="event-detail-value">{date}</div>
            </div>

            {/* 时间 */}
            <div className="event-detail-field">
              <div className="event-detail-label">时间</div>
              <div className="event-detail-value">
                <div className="event-time-range">{timeRange}</div>
              </div>
            </div>

            {/* 详细描述 */}
            {event.description && (
              <div className="event-detail-field">
                <div className="event-detail-label">详细描述</div>
                <div className="event-detail-value">{event.description}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default EventDetailModal; 