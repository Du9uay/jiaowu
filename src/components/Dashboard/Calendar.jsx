import React, { useState } from 'react';
import { generateCalendarDays, getEventsForDate, mockData } from '../../data/mockData';
import EventTooltip from './EventTooltip';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipEvents, setTooltipEvents] = useState([]);
  
  // 获取日历数据，传入事项数据用于计算hasEvent
  const calendarDays = generateCalendarDays(mockData.calendarEvents, new Date(), mockData.enhancedTasks || []);

  console.log('Calendar 组件渲染:', { 
    tooltipVisible, 
    selectedDate,
    eventsCount: tooltipEvents.length,
    activeStateLogic: selectedDate && tooltipVisible ? 'active' : 'inactive'
  });

  const handleDateClick = (day, event) => {
    console.log('日期点击事件:', day);
    
    if (day.isCurrentMonth) {
      setSelectedDate(day.date);
      
      // 如果这个日期有事项，显示悬浮窗
      if (day.hasEvent) {
        const today = new Date();
        const events = getEventsForDate(today.getFullYear(), today.getMonth(), day.date);
        
        if (events.length > 0) {
          // 获取点击位置
          const rect = event.target.getBoundingClientRect();
          const position = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };
          
          console.log('显示悬浮窗:', { 
            position, 
            eventsCount: events.length,
            events 
          });
          
          setTooltipPosition(position);
          setTooltipEvents(events);
          setTooltipVisible(true);
        }
      } else {
        // 如果没有事项，隐藏悬浮窗
        setTooltipVisible(false);
      }
    }
  };

  const handleTooltipClose = () => {
    console.log('关闭悬浮窗');
    setTooltipVisible(false);
    setTooltipEvents([]);
    setSelectedDate(null);
  };

  return (
    <div className="dashboard-module module-calendar">
      <div className="module-header">
        <h3 className="module-title">日历</h3>
      </div>

      <div className="module-content">
        <div className="calendar">
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
              console.log('Calendar模块内容区域已应用固定高度 - 渲染日期:', day.date, '有事项:', day.hasEvent);
              return (
                <div
                  key={index}
                  className={`calendar-day ${day.isToday ? 'today' : ''} ${
                    selectedDate === day.date && tooltipVisible ? 'active' : ''
                  } ${day.hasEvent ? 'has-event' : ''}`}
                  style={{
                    opacity: day.isCurrentMonth ? 1 : 0.3,
                    position: 'relative',
                    cursor: day.hasEvent ? 'pointer' : 'default'
                  }}
                  onClick={(event) => handleDateClick(day, event)}
                >
                  {day.date}
                  {day.hasEvent && (
                    <div style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      width: '4px',
                      height: '4px',
                      background: 'var(--primary-color)',
                      borderRadius: '50%'
                    }}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 事项悬浮窗 */}
        <EventTooltip
          events={tooltipEvents}
          position={tooltipPosition}
          visible={tooltipVisible}
          onClose={handleTooltipClose}
        />
      </div>
    </div>
  );
};

export default Calendar; 