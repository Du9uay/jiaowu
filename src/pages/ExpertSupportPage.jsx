import React, { useState, useEffect, useRef } from 'react';

const ExpertSupportPage = () => {
  console.log('ExpertSupportPage组件初始化 - 新对话界面设计');
  
  // 对话管理
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [conversations, setConversations] = useState({});
  const [showResolutionModal, setShowResolutionModal] = useState(null);
  const [isNewConversation, setIsNewConversation] = useState(false);
  
  // 用于跟踪最后活动时间
  const lastActivityRef = useRef({});
  const inactivityTimerRef = useRef({});

  // 初始对话数据
  const [conversationGroups, setConversationGroups] = useState({
    '今天': [
      {
        id: 1,
        title: 'TypeScript类型定义疑问',
        lastMessage: '我需要了解更多关于泛型的使用',
        time: '16:45',
        status: '进行中',
        statusType: 'in-progress',
        hasInactivityAlert: false,
        lastActivityTime: Date.now() - 15 * 60 * 1000 // 15分钟前（模拟超时）
      },
      {
        id: 2,
        title: '数据库设计方案讨论',
        lastMessage: '当前的表结构设计是否合理？',
        time: '15:30',
        status: '进行中',
        statusType: 'in-progress',
        hasInactivityAlert: false,
        lastActivityTime: Date.now() - 5 * 60 * 1000 // 5分钟前
      }
    ],
    '7天内': [
      {
        id: 3,
        title: '前端开发环境配置问题',
        lastMessage: '问题已解决，感谢专家指导',
        time: '01-07',
        status: '已解决',
        statusType: 'resolved',
        hasInactivityAlert: false,
        lastActivityTime: Date.now() - 24 * 60 * 60 * 1000
      },
      {
        id: 4,
        title: 'React组件性能优化咨询',
        lastMessage: '优化方案已实施，性能提升明显',
        time: '01-06',
        status: '已解决',
        statusType: 'resolved',
        hasInactivityAlert: false,
        lastActivityTime: Date.now() - 2 * 24 * 60 * 60 * 1000
      },
      {
        id: 5,
        title: 'Vue3升级迁移指导',
        lastMessage: '迁移过程中遇到的兼容性问题',
        time: '01-05',
        status: '已解决',
        statusType: 'resolved',
        hasInactivityAlert: false,
        lastActivityTime: Date.now() - 3 * 24 * 60 * 60 * 1000
      },
      {
        id: 6,
        title: 'Node.js性能调优建议',
        lastMessage: '内存泄漏排查和解决方案',
        time: '01-04',
        status: '已解决',
        statusType: 'resolved',
        hasInactivityAlert: false,
        lastActivityTime: Date.now() - 4 * 24 * 60 * 60 * 1000
      },
      {
        id: 7,
        title: 'Git分支管理策略',
        lastMessage: '多人协作开发的最佳实践',
        time: '01-03',
        status: '已解决',
        statusType: 'resolved',
        hasInactivityAlert: false,
        lastActivityTime: Date.now() - 5 * 24 * 60 * 60 * 1000
      }
    ],
    '30天内': [
      {
        id: 8,
        title: '微服务架构设计咨询',
        lastMessage: '希望专家能提供详细的实施方案',
        time: '12-20',
        status: '已解决',
        statusType: 'resolved',
        hasInactivityAlert: false,
        lastActivityTime: Date.now() - 18 * 24 * 60 * 60 * 1000
      },
      {
        id: 9,
        title: 'Docker容器化部署问题',
        lastMessage: '生产环境部署的最佳配置',
        time: '12-18',
        status: '已解决',
        statusType: 'resolved',
        hasInactivityAlert: false,
        lastActivityTime: Date.now() - 20 * 24 * 60 * 60 * 1000
      },
      {
        id: 10,
        title: 'Redis缓存策略优化',
        lastMessage: '缓存穿透和雪崩的防护措施',
        time: '12-15',
        status: '已解决',
        statusType: 'resolved',
        hasInactivityAlert: false,
        lastActivityTime: Date.now() - 23 * 24 * 60 * 60 * 1000
      },
      {
        id: 11,
        title: 'MySQL索引优化指导',
        lastMessage: '慢查询分析和索引设计建议',
        time: '12-12',
        status: '已解决',
        statusType: 'resolved',
        hasInactivityAlert: false,
        lastActivityTime: Date.now() - 26 * 24 * 60 * 60 * 1000
      }
    ]
  });

  // 当前活跃对话的消息记录
  const conversationMessages = [
    {
      id: 1,
      type: 'user',
      content: '您好，我在使用TypeScript时遇到了一些泛型定义的问题',
      time: '2025-01-08 16:45',
      avatar: '👤'
    },
    {
      id: 2,
      type: 'expert',
      content: '您好！我是王开发专家，很高兴为您解答TypeScript相关问题。请详细描述一下您遇到的具体问题。',
      time: '2025-01-08 16:46',
      avatar: '👨‍💻',
      expertName: '王开发专家'
    },
    {
      id: 3,
      type: 'user',
      content: '我需要了解更多关于泛型的使用，特别是在复杂数据结构中的应用',
      time: '2025-01-08 16:48',
      avatar: '👤'
    }
  ];

  // 创建新对话
  const createNewConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: '新的问题咨询',
      lastMessage: '',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      status: '进行中',
      statusType: 'in-progress',
      hasInactivityAlert: false,
      lastActivityTime: Date.now()
    };
    
    setConversationGroups(prev => ({
      ...prev,
      '今天': [newConversation, ...prev['今天']]
    }));
    
    setSelectedConversation(newConversation);
    setMessages([]);
    setIsNewConversation(true);
    console.log('创建新对话:', newConversation.title);
  };

  // 检查非活跃状态
  const checkInactivityStatus = () => {
    const currentTime = Date.now();
    const INACTIVITY_THRESHOLD = 10 * 60 * 1000; // 10分钟
    
    setConversationGroups(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(groupKey => {
        updated[groupKey] = updated[groupKey].map(conversation => {
          if (conversation.statusType === 'in-progress') {
            const timeSinceLastActivity = currentTime - conversation.lastActivityTime;
            const shouldShowAlert = timeSinceLastActivity >= INACTIVITY_THRESHOLD;
            
            if (shouldShowAlert !== conversation.hasInactivityAlert) {
              return { ...conversation, hasInactivityAlert: shouldShowAlert };
            }
          }
          return conversation;
        });
      });
      return updated;
    });
  };

  // 处理对话选择
  const handleConversationSelect = (conversation) => {
    console.log('选择对话:', conversation.title);
    
    // 如果是带有红点的对话，点击时询问是否已解决
    if (conversation.hasInactivityAlert && conversation.statusType === 'in-progress') {
      setShowResolutionModal(conversation);
    } else {
      setSelectedConversation(conversation);
      setMessages(conversationMessages);
      setIsNewConversation(false);
    }
  };

  // 标记问题为已解决
  const markAsResolved = (conversationId) => {
    setConversationGroups(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(groupKey => {
        updated[groupKey] = updated[groupKey].map(conversation => {
          if (conversation.id === conversationId) {
            return {
              ...conversation,
              status: '已解决',
              statusType: 'resolved',
              hasInactivityAlert: false,
              lastMessage: '问题已解决'
            };
          }
          return conversation;
        });
      });
      return updated;
    });
    setShowResolutionModal(null);
    
    // 如果当前选中的是这个对话，取消选择
    if (selectedConversation?.id === conversationId) {
      setSelectedConversation(null);
      setMessages([]);
    }
  };

  // 继续对话
  const continueConversation = (conversation) => {
    // 更新最后活动时间
    setConversationGroups(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(groupKey => {
        updated[groupKey] = updated[groupKey].map(conv => {
          if (conv.id === conversation.id) {
            return {
              ...conv,
              hasInactivityAlert: false,
              lastActivityTime: Date.now()
            };
          }
          return conv;
        });
      });
      return updated;
    });
    
    setSelectedConversation(conversation);
    setMessages(conversationMessages);
    setShowResolutionModal(null);
    setIsNewConversation(false);
  };

  // 发送消息
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    console.log('发送消息:', inputMessage);
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      time: new Date().toLocaleString('zh-CN'),
      avatar: '👤'
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    
    // 更新当前对话的标题和最后消息（如果是新对话）
    if (selectedConversation && isNewConversation && messages.length === 0) {
      const title = inputMessage.length > 20 ? inputMessage.substring(0, 20) + '...' : inputMessage;
      setConversationGroups(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(groupKey => {
          updated[groupKey] = updated[groupKey].map(conversation => {
            if (conversation.id === selectedConversation.id) {
              return {
                ...conversation,
                title: title,
                lastMessage: inputMessage,
                lastActivityTime: Date.now()
              };
            }
            return conversation;
          });
        });
        return updated;
      });
      
      setSelectedConversation(prev => ({
        ...prev,
        title: title,
        lastMessage: inputMessage,
        lastActivityTime: Date.now()
      }));
      
      setIsNewConversation(false);
    } else if (selectedConversation) {
      // 更新现有对话的最后活动时间
      setConversationGroups(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(groupKey => {
          updated[groupKey] = updated[groupKey].map(conversation => {
            if (conversation.id === selectedConversation.id) {
              return {
                ...conversation,
                lastMessage: inputMessage,
                lastActivityTime: Date.now(),
                hasInactivityAlert: false
              };
            }
            return conversation;
          });
        });
        return updated;
      });
    }
  };

  // 组件生命周期
  useEffect(() => {
    // 页面加载时自动创建新对话
    createNewConversation();
    
    // 定时检查非活跃状态
    const interval = setInterval(checkInactivityStatus, 30000); // 每30秒检查一次
    
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 组件挂载后进行初始检查
  useEffect(() => {
    const timeoutId = setTimeout(checkInactivityStatus, 1000);
    return () => clearTimeout(timeoutId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 转专家服务
  const handleTransferToExpert = () => {
    console.log('转专家服务 - 转交人工专家');
    if (selectedConversation && selectedConversation.statusType === 'in-progress') {
      // 更新对话状态逻辑
      alert('已转交人工专家，将有专业老师为您服务');
    }
  };

  return (
    <div className="expert-support-page">
      {/* 左侧对话记录区域 */}
      <div className="conversation-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">对话记录</h2>
          <button className="new-conversation-btn" onClick={createNewConversation}>
            <span className="btn-icon">💬</span>
            <span className="btn-text">新建对话</span>
          </button>
        </div>
        
        {/* 按时间分组的对话列表 */}
        <div className="conversation-groups">
          {Object.entries(conversationGroups).map(([groupName, conversations]) => (
            <div key={groupName} className="conversation-group">
              <div className="group-header">
                <h3 className="group-title">{groupName}</h3>
              </div>
              <div className="conversation-list">
                {conversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className={`conversation-item ${selectedConversation?.id === conversation.id ? 'selected' : ''} ${conversation.hasInactivityAlert ? 'has-alert' : ''}`}
                    onClick={() => handleConversationSelect(conversation)}
                  >
                    <div className="conversation-content">
                      <div className="conversation-title-row">
                        <h4 className="conversation-title">{conversation.title}</h4>
                        {conversation.hasInactivityAlert && (
                          <div className="inactivity-alert">
                            <span className="alert-dot"></span>
                          </div>
                        )}
                      </div>
                      <p className="conversation-preview">{conversation.lastMessage}</p>
                    </div>
                    <div className="conversation-meta">
                      <span className="conversation-time">{conversation.time}</span>
                      <span className={`conversation-status status-${conversation.statusType}`}>
                        {conversation.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 右侧问答界面 */}
      <div className="chat-interface">
        {/* 顶部信息栏 */}
        <div className="chat-header">
          <div className="header-info">
            <div className="service-badge">
              <span className="badge-icon">🎓</span>
              <span className="badge-text">专家客服</span>
            </div>
            <div className="service-title">学有所问，向必有答</div>
            <div className="service-subtitle">「我们有创新学习习惯养成方案」</div>
          </div>
          <div className="service-actions">
            <div className="service-tag">专家答疑</div>
            <div className="service-tag">快速响应</div>
            <div className="service-tag">24小时服务</div>
          </div>
        </div>

        {/* 对话内容区域 */}
        <div className="chat-content">
          {selectedConversation ? (
            <>
              <div className="chat-title-bar">
                <h3 className="active-conversation-title">{selectedConversation.title}</h3>
                                 {selectedConversation.statusType === 'in-progress' && (
                  <button 
                    className="transfer-expert-btn"
                    onClick={handleTransferToExpert}
                  >
                    转专家服务
                  </button>
                )}
              </div>
              
              <div className="messages-container">
                {messages.map(message => (
                  <div key={message.id} className={`message ${message.type}-message`}>
                    <div className="message-avatar">{message.avatar}</div>
                    <div className="message-bubble">
                      {message.type === 'expert' && (
                        <div className="expert-name">{message.expertName}</div>
                      )}
                      <div className="message-text">{message.content}</div>
                      <div className="message-time">{message.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-conversation-selected">
              <div className="placeholder-icon">💬</div>
              <div className="placeholder-text">请选择一个对话开始</div>
              <div className="placeholder-subtitle">从左侧列表中选择对话记录</div>
            </div>
          )}
        </div>

        {/* 输入区域 */}
        {selectedConversation && (
          <div className="chat-input-area">
            <div className="input-container">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="请输入您的问题..."
                className="message-input"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                className="send-button"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              >
                发送
              </button>
            </div>
            <div className="input-tips">
              <span className="tip-text">Shift + Enter 可以换行，Enter 发送消息</span>
            </div>
          </div>
        )}
      </div>

      {/* 问题解决确认模态框 */}
      {showResolutionModal && (
        <div className="resolution-modal-overlay">
          <div className="resolution-modal">
            <div className="modal-header">
              <h3 className="modal-title">问题解决确认</h3>
              <button 
                className="modal-close" 
                onClick={() => setShowResolutionModal(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="modal-icon">❓</div>
              <p className="modal-text">
                您在「{showResolutionModal.title}」中已经超过10分钟没有活动，
                请问这个问题是否已经得到解决？
              </p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={() => continueConversation(showResolutionModal)}
              >
                继续讨论
              </button>
              <button 
                className="btn-primary"
                onClick={() => markAsResolved(showResolutionModal.id)}
              >
                已解决
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertSupportPage; 