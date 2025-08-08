import React, { useEffect, useRef } from 'react';
import { mockData } from '../../data/mockData';
import Portal from '../common/Portal';

const MessageNotification = ({ isOpen, onClose, onMarkAllRead }) => {
  const { notifications } = mockData;
  const popupRef = useRef(null);

  // 点击外部关闭浮窗
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // 获取消息类型图标
  const getMessageIcon = (type) => {
    const icons = {
      system: '⚙️',
      course: '📚',
      assignment: '📝',
      announcement: '📢'
    };
    return icons[type] || '📬';
  };

  // 获取优先级颜色
  const getPriorityColor = (priority) => {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    };
    return colors[priority] || '#6b7280';
  };

  // 格式化时间显示
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return '刚刚';
    } else if (diffInHours < 24) {
      return `${diffInHours}小时前`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}天前`;
    }
  };

  // 处理消息点击
  const handleMessageClick = (message) => {
    // 这里可以添加具体的消息处理逻辑
  };

  // 处理全部标记已读
  const handleMarkAllReadClick = () => {
    onMarkAllRead();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Portal className="message-notification-portal">
      <div 
        ref={popupRef} 
        className="message-notification-popup" 
        style={{ 
          animation: 'notificationFadeIn 200ms ease-out forwards',
          position: 'fixed',
          top: '120px',
          left: '280px',
          zIndex: 'var(--z-modal, 10000)'
        }}
      >
        {/* 浮窗头部 */}
        <div className="message-notification-header">
          <h4 className="message-notification-title">系统消息</h4>
          <div className="message-notification-actions">
            {notifications.unreadCount > 0 && (
              <button 
                className="mark-all-read-btn"
                onClick={handleMarkAllReadClick}
              >
                全部已读
              </button>
            )}
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
        </div>

        {/* 消息列表 */}
        <div className="message-notification-content">
          {notifications.messages.length === 0 ? (
            <div className="empty-messages">
              <div className="empty-icon">📭</div>
              <p>暂无消息通知</p>
            </div>
          ) : (
            <div className="message-list">
              {notifications.messages.map(message => (
                <div 
                  key={message.id}
                  className={`message-item ${!message.isRead ? 'unread' : 'read'}`}
                  onClick={() => handleMessageClick(message)}
                >
                    <div className="message-icon-wrapper">
                      <span className="message-type-icon">
                        {getMessageIcon(message.type)}
                      </span>
                      {!message.isRead && (
                        <div 
                          className="message-priority-dot"
                          style={{ backgroundColor: getPriorityColor(message.priority) }}
                        ></div>
                      )}
                    </div>
                    
                    <div className="message-content">
                      <div className="message-header">
                        <h5 className="message-title">{message.title}</h5>
                        <span className="message-time">{formatTime(message.time)}</span>
                      </div>
                      <p className="message-text">{message.content}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* 浮窗底部 */}
        <div className="message-notification-footer">
          <span className="message-count">
            共 {notifications.messages.length} 条消息
          </span>
        </div>
      </div>
    </Portal>
  );
};

export default MessageNotification; 