import React, { useState, useEffect } from 'react';
import { generateCalendarDays, getEventsForDate, mockData } from '../../data/mockData';

const CalendarTaskModule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  // 获取当前显示月份的日历数据
  const calendarDays = generateCalendarDays(mockData.calendarEvents, currentDate, mockData.enhancedTasks);

  // 月份导航
  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // 日期选择处理
  const handleDateClick = (day) => {
    if (day.isCurrentMonth) {
      const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day.date);
      setSelectedDate(clickedDate);
    }
  };

  // 根据选中日期加载对应的事项
  useEffect(() => {
    const loadTasksForDate = async () => {
      setIsLoadingTasks(true);
      
      // 模拟异步加载过程
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const dateString = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
      
      // 获取日历事件
      const calendarEvents = getEventsForDate(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      
      // 获取任务数据 (基于日期筛选)
      const tasksForDate = mockData.enhancedTasks?.filter(task => task.date === dateString) || [];
      
      // 合并事件和任务
      const allItems = [
        ...calendarEvents.map(event => ({
          ...event,
          itemType: 'event',
          status: 'pending',
          time: event.startTime.split(' ')[1]
        })),
        ...tasksForDate.map(task => ({
          ...task,
          itemType: 'task'
        }))
      ].sort((a, b) => a.time.localeCompare(b.time));
      
      setTasksForSelectedDate(allItems);
      setIsLoadingTasks(false);
    };

    loadTasksForDate();
  }, [selectedDate]);

  // 获取事项类型指示器颜色
  const getEventIndicatorColor = (events) => {
    if (!events || events.length === 0) return null;
    
    // 按优先级返回颜色：红色(面试模拟) > 橙色(求职策略) > 绿色(课程)
    const hasInterviewSimulation = events.some(e => e.type === 'interview' || e.title.includes('面试'));
    const hasJobStrategy = events.some(e => e.type === 'strategy' || e.title.includes('求职策略'));
    const hasCourse = events.some(e => e.type === 'class' || e.type === 'course');
    
    if (hasInterviewSimulation) return '#ef4444'; // 红色
    if (hasJobStrategy) return '#f59e0b'; // 橙色
    if (hasCourse) return '#10b981'; // 绿色
    
    return '#3b82f6'; // 默认蓝色
  };

  // 格式化月份显示
  const formatMonthTitle = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    return `${year}年${month}月`;
  };

  // 判断是否为今天
  const isToday = (day) => {
    const today = new Date();
    return day.isCurrentMonth && 
           day.date === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  // 判断是否为选中日期
  const isSelected = (day) => {
    return day.isCurrentMonth && 
           day.date === selectedDate.getDate() && 
           currentDate.getMonth() === selectedDate.getMonth() && 
           currentDate.getFullYear() === selectedDate.getFullYear();
  };

  return (
    <div className="dashboard-module module-calendar-task">
      <div className="module-header">
        <h3 className="module-title">日历及近期事项</h3>
      </div>

      <div className="module-content calendar-task-content">
        {/* 日历视图部分 */}
        <div className="calendar-section">
          {/* 月份导航 */}
          <div className="calendar-nav-header">
            <button 
              className="nav-button"
              onClick={handlePreviousMonth}
              title="上一月"
            >
              ‹
            </button>
            <h4 className="month-title">{formatMonthTitle()}</h4>
            <button 
              className="nav-button"
              onClick={handleNextMonth}
              title="下一月"
            >
              ›
            </button>
          </div>

          {/* 星期标题 */}
          <div className="calendar-grid" style={{ marginBottom: '8px' }}>
            {['日', '一', '二', '三', '四', '五', '六'].map(day => (
              <div key={day} style={{ 
                textAlign: 'center', 
                fontSize: '12px', 
                color: 'var(--text-muted)', 
                fontWeight: '500',
                padding: '4px 0'
              }}>
                {day}
              </div>
            ))}
          </div>

          {/* 日期网格 */}
          <div className="calendar-grid">
            {calendarDays.map((day, index) => {
              const dayEvents = getEventsForDate(currentDate.getFullYear(), currentDate.getMonth(), day.date);
              const indicatorColor = getEventIndicatorColor(dayEvents);
              const dayIsToday = isToday(day);
              const dayIsSelected = isSelected(day);

              return (
                <div
                  key={index}
                  className={`calendar-day ${dayIsToday ? 'today' : ''} ${
                    dayIsSelected ? 'selected' : ''
                  } ${day.hasEvent ? 'has-event' : ''}`}
                  style={{
                    opacity: day.isCurrentMonth ? 1 : 0.3,
                    position: 'relative',
                    cursor: 'pointer',
                    // 处理今天和选中日期的共存状态
                    background: dayIsSelected ? 'var(--primary-color)' : 
                               dayIsToday ? '#fef3c7' : 
                               day.hasEvent && !dayIsSelected ? '#f8fafc' : 'transparent',
                    color: dayIsSelected ? 'white' : 
                           dayIsToday ? '#d97706' : 'var(--text-primary)'
                  }}
                  onClick={() => handleDateClick(day)}
                >
                  <span style={{
                    // 今天的日期在未选中时显示圆形背景
                    background: dayIsToday && !dayIsSelected ? '#d97706' : 'transparent',
                    color: dayIsToday && !dayIsSelected ? 'white' : 'inherit',
                    borderRadius: dayIsToday && !dayIsSelected ? '50%' : 'none',
                    width: dayIsToday && !dayIsSelected ? '20px' : 'auto',
                    height: dayIsToday && !dayIsSelected ? '20px' : 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: dayIsToday ? '600' : 'normal'
                  }}>
                    {day.date}
                  </span>
                  
                  {/* 事项类型指示器 */}
                  {indicatorColor && (
                    <div style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      width: '6px',
                      height: '6px',
                      background: indicatorColor,
                      borderRadius: '50%',
                      border: dayIsSelected ? '1px solid white' : 'none'
                    }}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 分隔线 */}
        <div className="section-divider"></div>

        {/* 事项列表部分 */}
        <div className="tasks-section">
          <div className="tasks-header">
            <h4 className="tasks-title">
              {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日 事项
            </h4>
            <span className="tasks-count">
              {tasksForSelectedDate.length} 项
            </span>
          </div>

          <div className="tasks-content">
            {isLoadingTasks ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <span>加载中...</span>
              </div>
            ) : tasksForSelectedDate.length > 0 ? (
              <div className="task-list">
                {tasksForSelectedDate.map(item => (
                  <div key={`${item.itemType}-${item.id}`} className="task-item">
                    <div className="task-time">{item.time}</div>
                    <div className="task-content">
                      <div className="task-title">{item.title || item.course}</div>
                      <div className="task-meta">
                        <span className={`task-type ${item.type || item.itemType}`}>
                          {item.itemType === 'event' ? '课程' : item.type}
                        </span>
                        <span className={`task-status ${item.status || 'pending'}`}>
                          {item.status === 'completed' ? '已完成' : 
                           item.status === 'in-progress' ? '进行中' : '待完成'}
                        </span>
                      </div>
                      {item.description && (
                        <div className="task-description">{item.description}</div>
                      )}
                      {item.teacher && (
                        <div className="task-teacher">教师：{item.teacher}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <div className="empty-text">该日期暂无事项</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarTaskModule;