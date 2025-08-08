import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../../data/mockData';

const QuickAccess = () => {
  const [quickAccessItems, setQuickAccessItems] = useState([]);
  const [isNewUser, setIsNewUser] = useState(true); // 模拟新用户状态
  const navigate = useNavigate();

  // 模拟用户状态检查和动态排序逻辑
  useEffect(() => {
    // 模拟检查用户是否为新用户（这里可以基于localStorage或其他方式判断）
    const userVisitHistory = localStorage.getItem('userVisitHistory');
    const hasVisitHistory = userVisitHistory && JSON.parse(userVisitHistory).length > 0;
    
    if (!hasVisitHistory) {
      // 新用户：显示预设的三个功能
      setQuickAccessItems(mockData.quickAccess);
      setIsNewUser(true);
    } else {
      // 老用户：根据访问频率动态排序，取前三个
      const sortedByAccess = [...mockData.allQuickAccessOptions]
        .sort((a, b) => b.accessCount - a.accessCount)
        .slice(0, 3);
      setQuickAccessItems(sortedByAccess);
      setIsNewUser(false);
    }
  }, []);

  console.log('QuickAccess component rendering');

  const handleQuickClick = (item) => {
    console.log('快捷入口点击:', item.name, '跳转到:', item.path);
    
    // 记录访问行为（模拟）
    const visitHistory = JSON.parse(localStorage.getItem('userVisitHistory') || '[]');
    visitHistory.push({
      path: item.path,
      name: item.name,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('userVisitHistory', JSON.stringify(visitHistory));
    
    // 更新访问计数（在实际应用中这应该通过API调用后端）
    const updatedOptions = mockData.allQuickAccessOptions.map(option => 
      option.path === item.path 
        ? { ...option, accessCount: option.accessCount + 1 }
        : option
    );
    
    console.log('更新访问频率:', item.name, '新的访问次数:', updatedOptions.find(o => o.path === item.path)?.accessCount);
    
    navigate(item.path);
  };

  return (
    <div className="dashboard-module module-quick-access">
      <div className="module-header">
        <h3 className="module-title">快捷入口</h3>
        <p className="module-subtitle">{isNewUser ? '新用户推荐功能' : '根据使用频率排序'}</p>
      </div>

      <div className="module-content">
        <div className="quick-grid">
          {quickAccessItems.map(item => {
            console.log('QuickAccess模块内容区域已应用固定高度 - 渲染快捷入口:', item.name, '访问次数:', item.accessCount);
            return (
              <div 
                key={item.id} 
                className="quick-item"
                onClick={() => handleQuickClick(item)}
                title={isNewUser ? `推荐功能: ${item.name}` : `访问次数: ${item.accessCount}`}
              >
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>{item.icon}</div>
                <h4>{item.name}</h4>
                {!isNewUser && (
                  <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
                    访问 {item.accessCount} 次
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickAccess; 