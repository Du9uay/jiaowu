import React, { useEffect, useRef } from 'react';

const EventTooltip = ({ events, position, visible, onClose }) => {
  const tooltipRef = useRef(null);

  console.log('EventTooltip 渲染:', { 
    visible, 
    eventsCount: events?.length, 
    position 
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        console.log('点击悬浮窗外部，关闭悬浮窗');
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        console.log('按下ESC键，关闭悬浮窗');
        onClose();
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [visible, onClose]);

  if (!visible || !events || events.length === 0) {
    return null;
  }

  // 计算悬浮窗位置，确保不超出视窗边界
  const calculatePosition = () => {
    const tooltipWidth = 280;
    const tooltipHeight = Math.min(events.length * 80 + 60, 300);
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let left = position.x + 10;
    let top = position.y - 10;

    // 右边界检测
    if (left + tooltipWidth > viewport.width - 20) {
      left = position.x - tooltipWidth - 10;
    }

    // 下边界检测  
    if (top + tooltipHeight > viewport.height - 20) {
      top = position.y - tooltipHeight + 10;
    }

    // 左边界检测
    if (left < 20) {
      left = 20;
    }

    // 上边界检测
    if (top < 20) {
      top = 20;
    }

    console.log('悬浮窗位置计算:', { 
      original: position, 
      calculated: { left, top },
      tooltipSize: { width: tooltipWidth, height: tooltipHeight }
    });

    return { left, top };
  };

  const finalPosition = calculatePosition();

  console.log('Dashboard悬浮框应用样式类名:', 'dashboard-event-tooltip');
  console.log('悬浮框最终位置和样式:', { position: finalPosition, className: 'dashboard-event-tooltip' });
  console.log('EventTooltip层级调试 - 使用var(--z-tooltip)确保低于消息弹窗', {
    tooltipZIndex: 'var(--z-tooltip)',
    modalZIndex: 'var(--z-modal)',
    positionType: 'fixed',
    shouldBeBelow: '消息弹窗'
  });

  return (
    <div
      ref={tooltipRef}
      className="dashboard-event-tooltip"
      style={{
        position: 'fixed',
        left: `${finalPosition.left}px`,
        top: `${finalPosition.top}px`,
        zIndex: 'var(--z-tooltip)' /* 使用全局tooltip层级，确保不会遮挡消息弹窗 */
      }}
    >
      <div className="dashboard-event-tooltip-arrow"></div>
      <div className="dashboard-event-tooltip-header">
        <h4>今日安排</h4>
        <span className="dashboard-event-count">{events.length}项</span>
      </div>
      <div className="dashboard-event-tooltip-content">
        {events.map((event, index) => (
          <div key={event.id || index} className="dashboard-event-item">
            <div className="dashboard-event-time">
              {event.startTime?.split(' ')[1]} - {event.endTime?.split(' ')[1]}
            </div>
            <div className="dashboard-event-title">{event.title}</div>
            <div className="dashboard-event-description">{event.description}</div>
            <div 
              className="dashboard-event-type-indicator"
              style={{ backgroundColor: event.color || '#3b82f6' }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTooltip; 