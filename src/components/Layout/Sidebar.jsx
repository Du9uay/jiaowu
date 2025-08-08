import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockData } from '../../data/mockData';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, navigation } = mockData;
  
  // 侧边栏折叠状态，从localStorage恢复状态
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved === 'true';
  });

  // 保存状态到localStorage并发送事件
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', isCollapsed.toString());
    // 发送自定义事件通知Layout组件状态变化
    const event = new CustomEvent('sidebarToggle', {
      detail: { isCollapsed }
    });
    window.dispatchEvent(event);
  }, [isCollapsed]);

  const handleNavClick = (path) => {
    navigate(path);
  };

  // 切换侧边栏展开/折叠状态
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* 顶部Logo和标题 */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          多
        </div>
        {!isCollapsed && (
          <div>
            <div className="sidebar-title">多多畅职教务系统</div>
          </div>
        )}
      </div>

      {/* 用户信息 - 纯静态展示 */}
      <div className="user-profile">
        <div className="user-avatar"></div>
        {!isCollapsed && (
          <div className="user-info">
            <h4>{user.name}</h4>
          </div>
        )}
      </div>

      {/* 导航菜单 */}
      <div className="nav-menu">
        {navigation.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="nav-section">
            {!isCollapsed && (
              <div className="nav-section-title">
                {section.title}
              </div>
            )}
            {isCollapsed && (
              <div className="nav-section-title-collapsed">
                {section.title.charAt(0)}
              </div>
            )}
            {section.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''} ${
                  section.title !== '个人区块' ? 'nav-subitem' : ''
                }`}
                onClick={() => handleNavClick(item.path)}
                title={isCollapsed ? item.name : ''}
              >
                {isCollapsed ? item.name.split(' ')[0] : item.name}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* 折叠/展开切换按钮 */}
      <div className="sidebar-toggle">
        <button
          className="toggle-btn"
          onClick={toggleSidebar}
          title={isCollapsed ? '展开侧边栏' : '折叠侧边栏'}
        >
          {isCollapsed ? '▶' : '◀'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 